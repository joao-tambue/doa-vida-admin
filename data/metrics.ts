import { MetricCard } from "@/types/metric";

export const METRICS: MetricCard[] = [
  {
    label: "Total de Dadores em Angola",
    value: "12,482",
    trendIcon: "trending_up",
    trendText: "+12% este mês",
    variant: "hover-primary",
  },
  {
    label: "Pedidos Ativos",
    value: "24",
    trendIcon: "priority_high",
    trendText: "6 Críticos (A-)",
    variant: "accent-left",
  },
  {
    label: "Vidas Salvas",
    value: "1,204",
    trendIcon: "favorite",
    trendText: "Total do hospital",
    variant: "hover-tertiary",
  },
];