"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const INSTITUTION_ID = "a1b2c3d4-0000-0000-0000-000000000001"; // Maternidade Augusto Ngangula

export async function registerAction(formData: FormData) {
  const supabase = await createClient();

  const fullName = formData.get("fullName") as string;
  const professionalId = formData.get("professionalId") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const certFile = formData.get("certFile") as File | null;

  if (!fullName || !email || !password) {
    return { error: "Por favor preencha todos os campos obrigatórios." };
  }

  if (password !== confirmPassword) {
    return { error: "As palavras-passe não coincidem." };
  }

  if (password.length < 8) {
    return { error: "A palavra-passe deve ter pelo menos 8 caracteres." };
  }

  // Criar conta no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (authError) {
    if (authError.message.includes("already registered")) {
      return { error: "Este email já está registado." };
    }
    return { error: authError.message };
  }

  const userId = authData.user?.id;
  if (!userId) return { error: "Erro ao criar conta. Tente novamente." };

  // Upload do certificado (caso for fornecido)
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

  // Completar o perfil do utilizador
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      professional_id: professionalId || null,
      phone: phone || null,
      institution_id: INSTITUTION_ID,
      cert_file_url: certFileUrl,
    })
    .eq("id", userId);

  if (profileError) {
    return {
      error:
        "Conta criada, mas erro ao guardar perfil: " + profileError.message,
    };
  }

  redirect("/auth/login?registered=true");
}
