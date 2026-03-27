import { RequestStatus, RequestUrgency } from "@/types/request";

export const URGENCY_CONFIG: Record<RequestUrgency, string> = {
  Urgente: "bg-[#ffdad6] text-[#93000a]",
  Pendente: "bg-gray-100 text-gray-600",
};

export const STATUS_CONFIG: Record<
  RequestStatus,
  { dot: string; text: string }
> = {
  "Em curso": { dot: "bg-[#b7131a]", text: "text-gray-500" },
  "Em emparelhamento": { dot: "bg-gray-400", text: "text-gray-500" },
  Concluído: { dot: "bg-[#006578]", text: "text-[#006578]" },
};