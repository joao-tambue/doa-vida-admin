interface BloodTypeStock {
  type: string;
  percentage: number;
  critical: boolean;
}

export const STOCK_DATA: BloodTypeStock[] = [
  { type: "A+", percentage: 85, critical: false },
  { type: "A-", percentage: 40, critical: false },
  { type: "O-", percentage: 15, critical: true },
  { type: "B+", percentage: 65, critical: false },
  { type: "AB-", percentage: 8, critical: true },
  { type: "O+", percentage: 90, critical: false },
];