interface MetricCard {
  label: string;
  value: string;
  unit?: string;
  trend: string;
  trendIcon: string;
  trendColor: string;
  accent?: boolean;
}

export const metrics: MetricCard[] = [
  {
    label: "Total de vidas salvas",
    value: "12,840",
    trend: "+12% vs mês passado",
    trendIcon: "trending_up",
    trendColor: "text-[#006578]",
    accent: true,
  },
  {
    label: "Tempo médio de entrega",
    value: "42",
    unit: "min",
    trend: "Fluxo de trabalho otimizado",
    trendIcon: "speed",
    trendColor: "text-[#006578]",
  },
  {
    label: "Taxa de cumprimento",
    value: "98.4",
    unit: "%",
    trend: "2,410 solicitações processadas",
    trendIcon: "check_circle",
    trendColor: "text-zinc-400",
  },
];

export const STATUS_CONFIG: Record<
  HistoryStatus,
  { dot: string; text: string; label: string }
> = {
  Concluído: {
    dot: "bg-[#006578]",
    text: "text-[#008097]",
    label: "Concluído",
  },
  Expirado: {
    dot: "bg-zinc-400",
    text: "text-zinc-400",
    label: "Expirado",
  },
  Cancelado: {
    dot: "bg-[#ba1a1a]",
    text: "text-[#ba1a1a]",
    label: "Cancelado",
  },
};

type HistoryStatus = "Concluído" | "Expirado" | "Cancelado";

interface HistoryRecord {
  id: string;
  datetime: string;
  patient: string;
  bloodType: string;
  bloodBg: string;
  units: number;
  status: HistoryStatus;
}

export const RECORDS: HistoryRecord[] = [
  {
    id: "REQ-2023-891",
    datetime: "Oct 24, 2023 · 14:20",
    patient: "Mariana Gonçalves",
    bloodType: "O-",
    bloodBg: "bg-red-50 text-red-700",
    units: 4,
    status: "Concluído",
  },
  {
    id: "REQ-2023-889",
    datetime: "Oct 23, 2023 · 09:15",
    patient: "João de Almeida",
    bloodType: "A+",
    bloodBg: "bg-zinc-100 text-zinc-700",
    units: 2,
    status: "Concluído",
  },
  {
    id: "REQ-2023-884",
    datetime: "Oct 22, 2023 · 21:45",
    patient: "Paciente Desconhecido (Trauma)",
    bloodType: "B-",
    bloodBg: "bg-red-50 text-red-700",
    units: 6,
    status: "Expirado",
  },
  {
    id: "REQ-2023-876",
    datetime: "Oct 20, 2023 · 11:30",
    patient: "Cláudia Mendonça",
    bloodType: "AB+",
    bloodBg: "bg-zinc-100 text-zinc-700",
    units: 3,
    status: "Cancelado",
  },
  {
    id: "REQ-2023-870",
    datetime: "Oct 19, 2023 · 16:00",
    patient: "Beatriz Luaces",
    bloodType: "O+",
    bloodBg: "bg-red-50 text-red-700",
    units: 1,
    status: "Concluído",
  },
];