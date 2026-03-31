import { UnitStatus } from "@/types/stock";

export const STATUS_CONFIG: Record<UnitStatus, { dot: string; text: string }> =
  {
    Disponível: {
      dot: "bg-[#006578]",
      text: "text-[#006578]",
    },
    Utilizada: {
      dot: "bg-gray-400",
      text: "text-gray-400",
    },
  };

import type { UserRole } from "@/types/database";

export interface NavItem {
  icon: string;
  label: string;
  href: string;
  roles: UserRole[]; // quem pode ver esta rota
}

// Hierarquia: gestor > admin > medico / enfermeiro / laboratorista
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  gestor: 5,
  admin: 4,
  medico: 3,
  enfermeiro: 2,
  laboratorista: 1,
};

export const ROLE_LABELS: Record<UserRole, string> = {
  gestor: "Gestor",
  admin: "Administrador",
  medico: "Médico",
  enfermeiro: "Enfermeiro",
  laboratorista: "Laboratorista",
};

export const NAV_ITEMS: NavItem[] = [
  {
    icon: "dashboard",
    label: "Painel Geral",
    href: "/dashboard",
    roles: ["gestor", "admin", "medico", "enfermeiro", "laboratorista"],
  },
  {
    icon: "emergency_home",
    label: "Pedidos Ativos",
    href: "/dashboard/pedidos-ativos",
    roles: ["gestor", "admin", "medico", "enfermeiro"],
  },
  {
    icon: "add_circle",
    label: "Criar Pedido",
    href: "/dashboard/criar-pedido",
    roles: ["gestor", "admin", "medico", "enfermeiro"],
  },
  {
    icon: "bloodtype",
    label: "Inventário de Sangue",
    href: "/dashboard/inventario",
    roles: ["gestor", "admin", "laboratorista"],
  },
  {
    icon: "history",
    label: "Histórico",
    href: "/dashboard/historico",
    roles: ["gestor", "admin", "medico", "laboratorista"],
  },
  {
    icon: "settings",
    label: "Definições",
    href: "/dashboard/configuracoes",
    roles: ["gestor", "admin"],
  },
];

export const PROTECTED_ROUTES: Record<string, UserRole> = {
  "/dashboard": "laboratorista",
  "/dashboard/pedidos-ativos": "enfermeiro",
  "/dashboard/criar-pedido": "enfermeiro",
  "/dashboard/inventario": "laboratorista",
  "/dashboard/historico": "medico",
  "/dashboard/configuracoes": "admin",
};

export function canAccess(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
