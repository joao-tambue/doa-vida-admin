import { StockLevel } from "@/types/blood";

export const LEVEL_CONFIG: Record<
  StockLevel,
  { badge: string; bar: string; text: string; pulse: boolean }
> = {
  Normal: {
    badge: "bg-[#008097]/10 text-[#008097]",
    bar: "bg-[#b7131a]",
    text: "",
    pulse: false,
  },
  Crítico: {
    badge: "bg-[#ffdad6] text-[#93000a]",
    bar: "bg-[#ba1a1a]",
    text: "text-[#ba1a1a]",
    pulse: true,
  },
  Baixo: {
    badge: "bg-gray-100 text-gray-600",
    bar: "bg-[#b7131a] opacity-60",
    text: "",
    pulse: false,
  },
};