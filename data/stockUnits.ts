import { StockUnit } from "@/types/stock";

export const UNITS: StockUnit[] = [
  {
    id: "#BD-9042",
    registeredAgo: "Registo há 2h",
    bloodType: "O-",
    status: "Disponível",
    expiryDate: "12 Out, 2023",
    expiryNote: "24 dias restantes",
    expirySoon: false,
    volume: "450ml",
  },
  {
    id: "#BD-8991",
    registeredAgo: "Registo há 5h",
    bloodType: "A+",
    status: "Disponível",
    expiryDate: "28 Set, 2023",
    expiryNote: "Expira Amanhã",
    expirySoon: true,
    volume: "500ml",
  },
  {
    id: "#BD-8854",
    registeredAgo: "Registo há 1d",
    bloodType: "B-",
    status: "Utilizada",
    expiryDate: "05 Nov, 2023",
    expiryNote: "Arquivado",
    expirySoon: false,
    volume: "450ml",
  },
];