"use client";

import {
  createContext,
  useContext,
  useState,
  useTransition,
  useCallback,
} from "react";
import { createBloodRequestAction } from "@/actions/requests/create";

export type BloodType = "O+" | "O-" | "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-";
export type Urgency = "Normal" | "Crítico" | "Urgente";
export type Diagnosis =
  | ""
  | "Cirurgia de Emergência"
  | "Anemia Grave"
  | "Acidente / Trauma"
  | "Procedimento Agendado"
  | "Hemorragia Pós-parto"
  | "Outro";

export interface BloodRequestForm {
  patientName: string;
  diagnosis: Diagnosis;
  bloodType: BloodType;
  units: number;
  urgency: Urgency;
  contactPerson: string;
  contactPhone: string;
  clinicalNotes: string;
  medicalFile: File | null;
}

interface BloodRequestContextValue {
  form: BloodRequestForm;
  isPending: boolean;
  errorMsg: string | null;
  update: <K extends keyof BloodRequestForm>(
    key: K,
    value: BloodRequestForm[K],
  ) => void;
  submit: () => Promise<void>;
  saveDraft: () => void;
}

const BloodRequestContext = createContext<BloodRequestContextValue | null>(
  null,
);

export function useBloodRequest() {
  const ctx = useContext(BloodRequestContext);
  if (!ctx)
    throw new Error(
      "useBloodRequest must be used inside <BloodRequestProvider>",
    );
  return ctx;
}

export function BloodRequestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [form, setForm] = useState<BloodRequestForm>({
    patientName: "",
    diagnosis: "",
    bloodType: "A+",
    units: 1,
    urgency: "Normal",
    contactPerson: "",
    contactPhone: "",
    clinicalNotes: "",
    medicalFile: null,
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const update = useCallback(
    <K extends keyof BloodRequestForm>(key: K, value: BloodRequestForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const submit = useCallback(async () => {
    setErrorMsg(null);

    if (!form.patientName.trim()) {
      setErrorMsg("Por favor insira o nome do paciente.");
      return;
    }
    if (!form.diagnosis) {
      setErrorMsg("Por favor selecione um diagnóstico.");
      return;
    }

    const formData = new FormData();
    formData.set("patientName", form.patientName);
    formData.set("diagnosis", form.diagnosis);
    formData.set("bloodType", form.bloodType);
    formData.set("unitsRequested", String(form.units));
    formData.set("urgency", form.urgency);
    formData.set("contactPerson", form.contactPerson);
    formData.set("contactPhone", form.contactPhone);
    formData.set("clinicalNotes", form.clinicalNotes);
    if (form.medicalFile) formData.set("medicalFile", form.medicalFile);

    startTransition(async () => {
      const result = await createBloodRequestAction(formData);
      if (result?.error) setErrorMsg(result.error);
    });
  }, [form]);

  const saveDraft = useCallback(() => {
    console.log("Rascunho guardado", form);
  }, [form]);

  return (
    <BloodRequestContext.Provider
      value={{ form, isPending, errorMsg, update, submit, saveDraft }}
    >
      {children}
    </BloodRequestContext.Provider>
  );
}
