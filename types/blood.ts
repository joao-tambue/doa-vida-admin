export type StockLevel = "Normal" | "Crítico" | "Baixo";

export interface BloodTypeCard {
  type: string;
  units: number;
  goal: number;
  level: StockLevel;
}