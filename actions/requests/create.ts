"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiPost } from "@/lib/api/client";

export async function createBloodRequestAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) redirect("/auth/login");

  const patientName = formData.get("patientName") as string;
  const bloodType = formData.get("bloodType") as string;
  const bagsQuantity = parseInt(formData.get("bagsQuantity") as string, 10);
  const province = formData.get("province") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const description = formData.get("description") as string;

  if (!patientName || !bloodType || !province) {
    return { error: "Por favor preencha todos os campos obrigatórios." };
  }

  if (isNaN(bagsQuantity) || bagsQuantity < 1) {
    return { error: "Número de unidades inválido." };
  }

  try {
    await apiPost(
      "/api/users/requests",
      {
        patient_name: patientName,
        blood_type: bloodType,
        bags_quantity: bagsQuantity,
        province,
        contact_phone: contactPhone || undefined,
        description: description || undefined,
      },
      token,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    return { error: msg || "Erro ao criar pedido." };
  }

  revalidatePath("/dashboard/pedidos-ativos");
  redirect("/dashboard/pedidos-ativos?created=true");
}
