"use server";

import { redirect } from "next/navigation";
import { apiPost } from "@/lib/api/client";

export async function registerAction(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const bloodType = formData.get("bloodType") as string;
  const province = formData.get("province") as string;

  if (!fullName || !email || !password || !bloodType || !province) {
    return { error: "Por favor preencha todos os campos obrigatórios." };
  }

  if (password !== confirmPassword) {
    return { error: "As palavras-passe não coincidem." };
  }

  if (password.length < 8) {
    return { error: "A palavra-passe deve ter pelo menos 8 caracteres." };
  }

  try {
    await apiPost("/api/users/register", {
      email,
      password,
      full_name: fullName,
      blood_type: bloodType,
      province,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.toLowerCase().includes("already")) {
      return { error: "Este email já está registado." };
    }
    return { error: msg || "Erro ao criar conta. Tente novamente." };
  }

  redirect("/auth/login?registered=true");
}
