"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database";

export async function registerAction(formData: FormData) {
  const supabase = await createClient();

  const fullName = formData.get("fullName") as string;
  const professionalId = formData.get("professionalId") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as UserRole;
  const institutionId = (formData.get("institutionId") as string) || null;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const certFile = formData.get("certFile") as File | null;

  if (!fullName || !email || !password || !role) {
    return { error: "Por favor preencha todos os campos obrigatórios." };
  }
  if (password !== confirmPassword) {
    return { error: "As palavras-passe não coincidem." };
  }
  if (password.length < 8) {
    return { error: "A palavra-passe deve ter pelo menos 8 caracteres." };
  }

  const validRoles: UserRole[] = [
    "admin",
    "medico",
    "enfermeiro",
    "laboratorista",
    "gestor",
  ];
  if (!validRoles.includes(role)) {
    return { error: "Função profissional inválida." };
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (authError) {
    if (authError.message.includes("already registered")) {
      return { error: "Este email já está registado." };
    }
    return { error: authError.message };
  }

  const userId = authData.user?.id;
  if (!userId) return { error: "Erro ao criar conta. Tente novamente." };

  // Upload do certificado (opcional)
  let certFileUrl: string | null = null;
  if (certFile && certFile.size > 0) {
    const ext = certFile.name.split(".").pop();
    const path = `${userId}/cert.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("certifications")
      .upload(path, certFile, { upsert: true });

    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from("certifications")
        .getPublicUrl(path);
      certFileUrl = urlData.publicUrl;
    }
  }

  // Criar perfil em admin_profiles
  const { error: profileError } = await supabase.from("admin_profiles").insert({
    id: userId,
    full_name: fullName,
    professional_id: professionalId || null,
    phone: phone || null,
    role,
    institution_id: institutionId,
    cert_file_url: certFileUrl,
    is_approved: false,
  });

  if (profileError) {
    return {
      error:
        "Conta criada, mas erro ao guardar perfil: " + profileError.message,
    };
  }

  redirect("/auth/login?registered=true");
}

// Buscar instituições para o select do formulário
export async function getInstitutionsAction() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("institutions")
    .select("id, name")
    .eq("is_active", true)
    .order("name");

  if (error) return [];
  return data ?? [];
}
