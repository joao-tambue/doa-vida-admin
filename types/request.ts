export type RequestUrgency = "Urgente" | "Pendente";
export type RequestStatus =
  | "Em curso"
  | "Em emparelhamento"
  | "Concluído";

export interface DashboardRequest {
  caseId: string;
  department: string;
  bloodType: string;
  urgency: RequestUrgency;
  filledUnits: number;
  totalUnits: number;
  status: RequestStatus;
}