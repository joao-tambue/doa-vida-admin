export type UnitStatus = "Disponível" | "Utilizada";

export interface StockUnit {
  id: string;
  registeredAgo: string;
  bloodType: string;
  status: UnitStatus;
  expiryDate: string;
  expiryNote: string;
  expirySoon: boolean;
  volume: string;
}