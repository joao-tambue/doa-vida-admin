import { Notification } from "@/types/notification";

export const NOTIFICATIONS: Notification[] = [
  {
    icon: "info",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Manutenção do Sistema Concluída",
    description:
      "Sincronização da base de dados para a região de Luanda terminada às 04:00.",
    time: "Há 2 horas",
  },
  {
    icon: "campaign",
    iconBg: "bg-[#ffdad6]",
    iconColor: "text-[#ba1a1a]",
    title: "Campanha de Sangue Agendada",
    description:
      "Unidade móvel atribuída ao Talatona Shopping este fim de semana.",
    time: "Há 5 horas",
  },
  {
    icon: "check_circle",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "Sucesso no Recrutamento de Dadores",
    description:
      "50 novos dadores O+ registados através da aplicação DoaVida Mobile.",
    time: "Ontem",
  },
];