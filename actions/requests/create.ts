"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createBloodRequestAction(formData: FormData) {
  const supabase = await createClient();

  // Utilizador autenticado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) redirect("/auth/login");

  // Buscar perfil para institution_id
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("institution_id, is_approved")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.institution_id) {
    return { error: "Perfil incompleto. Contacte o administrador." };
  }

  if (!profile.is_approved) {
    return { error: "A sua conta ainda não foi aprovada pelo administrador." };
  }

  // Campos do formulário
  const patientName = formData.get("patientName") as string;
  const diagnosis = formData.get("diagnosis") as string;
  const bloodType = formData.get("bloodType") as string;
  const unitsRequested = parseInt(formData.get("unitsRequested") as string, 10);
  const urgency = formData.get("urgency") as "normal" | "critico";
  const contactPerson = formData.get("contactPerson") as string;
  const contactPhone = formData.get("contactPhone") as string;
  const clinicalNotes = formData.get("clinicalNotes") as string;
  const medicalFile = formData.get("medicalFile") as File | null;

  // Validações
  if (!patientName || !diagnosis || !bloodType || !unitsRequested) {
    return { error: "Por favor preencha todos os campos obrigatórios." };
  }

  if (isNaN(unitsRequested) || unitsRequested < 1) {
    return { error: "Número de unidades inválido." };
  }
  let medicalRecordsUrl: string | null = null;
  if (medicalFile && medicalFile.size > 0) {
    const ext = medicalFile.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("medical-records")
      .upload(path, medicalFile);

    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from("medical-records")
        .getPublicUrl(path);
      medicalRecordsUrl = urlData.publicUrl;
    }
  }

  // Inserir pedido
  const { data: request, error: insertError } = await supabase
    .from("blood_requests")
    .insert({
      institution_id: profile.institution_id,
      requested_by: user.id,
      patient_name: patientName,
      diagnosis,
      blood_type: bloodType,
      units_requested: unitsRequested,
      urgency: urgency ?? "normal",
      contact_person: contactPerson || null,
      contact_phone: contactPhone || null,
      clinical_notes: clinicalNotes || null,
      medical_records_url: medicalRecordsUrl,
      status: "pendente",
    })
    .select("id")
    .single();

  if (insertError) {
    return { error: "Erro ao criar pedido: " + insertError.message };
  }

  // Notificar o próprio utilizador
  await supabase.from("notifications").insert({
    user_id: user.id,
    type: "pedido_novo",
    title: "Pedido criado com sucesso",
    message: `Pedido de ${unitsRequested} unidade(s) de ${bloodType} para ${patientName} submetido.`,
    request_id: request.id,
  });

  revalidatePath("/dashboard/pedidos-ativos");
  redirect("/dashboard/pedidos-ativos?created=true");
}
