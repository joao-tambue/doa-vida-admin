"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiPost } from "@/lib/api/client";

interface LoginResponse {
  session: { access_token: string; refresh_token: string };
  user: { id: string; email: string };
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let data: LoginResponse;
  try {
    data = await apiPost<LoginResponse>("/api/users/login", { email, password });
  } catch {
    return { error: "Credenciais inválidas. Verifique o email e a palavra-passe." };
  }

  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === "production";

  cookieStore.set("access_token", data.session.access_token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  });

  cookieStore.set("refresh_token", data.session.refresh_token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
    path: "/",
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  redirect("/auth/login");
}
