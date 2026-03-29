"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: "dashboard", label: "Painel Geral", href: "/dashboard" },
  { icon: "emergency_home", label: "Pedidos Ativos", href: "/dashboard/pedidos-ativos" },
  { icon: "add_circle", label: "Criar Pedido", href: "/dashboard/criar-pedido" },
  { icon: "bloodtype", label: "Inventário de Sangue", href: "/dashboard/inventario" },
  { icon: "history", label: "Histórico", href: "/dashboard/historico" },
  { icon: "settings", label: "Definições", href: "/dashboard/configuracoes" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-gray-100 flex flex-col py-8 px-4 z-50">
      {/* Logo */}
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-black text-red-700">
          DoaVida
        </h1>
        <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mt-1">
          Hospital Central
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                isActive
                  ? "text-red-700 font-bold border-l-4 border-red-700 bg-gray-200"
                  : "text-gray-500  hover:bg-gray-200"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* CTA Button */}
      <div className="mt-auto px-2">
        <Link
          href="/criar-pedido"
          className="w-full bg-[#b7131a] text-white py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#db322f] transition-all active:scale-95 duration-150"
        >
          <span className="material-symbols-outlined">add</span>
          Novo Pedido
        </Link>
      </div>
    </aside>
  );
}
