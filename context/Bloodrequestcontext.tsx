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

export const PROVINCES = [
  "Bengo", "Benguela", "Bié", "Cabinda", "Cuando Cubango",
  "Cuanza Norte", "Cuanza Sul", "Cunene", "Huambo", "Huíla",
  "Luanda", "Lunda Norte", "Lunda Sul", "Malanje", "Moxico",
  "Namibe", "Uíge", "Zaire",
] as const;

export type Province = (typeof PROVINCES)[number];

export interface BloodRequestForm {
  patientName: string;
  bloodType: BloodType;
  bagsQuantity: number;
  province: Province | "";
  contactPhone: string;
  description: string;
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
}

const BloodRequestContext = createContext<BloodRequestContextValue | null>(null);

export function useBloodRequest() {
  const ctx = useContext(BloodRequestContext);
  if (!ctx)
    throw new Error("useBloodRequest must be used inside <BloodRequestProvider>");
  return ctx;
}

export function BloodRequestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [form, setForm] = useState<BloodRequestForm>({
    patientName: "",
    bloodType: "A+",
    bagsQuantity: 1,
    province: "",
    contactPhone: "",
    description: "",
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
    if (!form.province) {
      setErrorMsg("Por favor selecione a província.");
      return;
    }

    const formData = new FormData();
    formData.set("patientName", form.patientName);
    formData.set("bloodType", form.bloodType);
    formData.set("bagsQuantity", String(form.bagsQuantity));
    formData.set("province", form.province);
    formData.set("contactPhone", form.contactPhone);
    formData.set("description", form.description);

    startTransition(async () => {
      const result = await createBloodRequestAction(formData);
      if (result?.error) setErrorMsg(result.error);
    });
  }, [form]);

  return (
    <BloodRequestContext.Provider value={{ form, isPending, errorMsg, update, submit }}>
      {children}
    </BloodRequestContext.Provider>
  );
}
