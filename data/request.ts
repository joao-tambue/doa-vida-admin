import { DashboardRequest } from "@/types/request";

export const REQUESTS: DashboardRequest[] = [
  {
    caseId: "#DV-9042",
    department: "Depto Cirúrgico - Quarto 302",
    bloodType: "O-",
    urgency: "Urgente",
    filledUnits: 1,
    totalUnits: 4,
    status: "Em curso",
  },
  {
    caseId: "#DV-9045",
    department: "Pediatria - Enfermaria A",
    bloodType: "A+",
    urgency: "Pendente",
    filledUnits: 0,
    totalUnits: 2,
    status: "Em emparelhamento",
  },
  {
    caseId: "#DV-8991",
    department: "Unidade de Emergência",
    bloodType: "B-",
    urgency: "Urgente",
    filledUnits: 3,
    totalUnits: 3,
    status: "Concluído",
  },
];