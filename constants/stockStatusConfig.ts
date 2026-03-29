import { UnitStatus } from "@/types/stock";

export const STATUS_CONFIG: Record<
  UnitStatus,
  { dot: string; text: string }
> = {
  Disponível: {
    dot: "bg-[#006578]",
    text: "text-[#006578]",
  },
  Utilizada: {
    dot: "bg-gray-400",
    text: "text-gray-400",
  },
};