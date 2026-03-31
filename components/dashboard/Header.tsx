"use client";

import { logoutAction } from "@/actions/auth/login";
import { useRef, useState, useEffect, useTransition } from "react";

interface HeaderProps {
  fullName: string;
  email: string;
  role: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

const ROLE_LABELS: Record<string, string> = {
  admin: "Administrador",
  medico: "Médico",
  enfermeiro: "Enfermeiro",
  laboratorista: "Laboratorista",
  gestor: "Gestor",
};

export default function Header({ fullName, email, role }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, startLogout] = useTransition();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const initials = getInitials(fullName);
  const roleLabel = ROLE_LABELS[role] ?? role;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    startLogout(async () => {
      await logoutAction();
    });
  }

  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#b7131a] rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-600">
            A terminar sessão...
          </p>
        </div>
      )}

      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-white flex justify-between items-center px-8 z-40 border-b border-gray-100">
        {/* Search */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-1.5 w-96 focus-within:ring-2 focus-within:ring-red-500 transition-all">
          <span className="material-symbols-outlined text-gray-400 text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Pesquisar pedidos, doadores ou IDs..."
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-gray-400 outline-none ml-2"
          />
        </div>

        <div className="flex items-center gap-6">
          {/* Notificações */}
          <button className="text-gray-600 hover:text-red-600 transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-[#b7131a] rounded-full border-2 border-white" />
          </button>

          {/* Avatar + Dropdown */}
          <div
            ref={dropdownRef}
            className="relative flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="text-right">
              <p className="text-sm font-bold leading-none">{fullName}</p>
              <p className="text-xs text-gray-500">{roleLabel}</p>
            </div>

            {/* Avatar com iniciais */}
            <div className="w-10 h-10 rounded-full bg-[#b7131a] flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-black tracking-wide">
                {initials}
              </span>
            </div>

            <span
              className={`material-symbols-outlined text-gray-400 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>

            {open && (
              <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in zoom-in-95">
                {/* Info do user */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {fullName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{email}</p>
                </div>

                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition">
                  Meu Perfil
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition">
                  Configurações
                </button>

                <div className="border-t my-2" />

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoggingOut ? (
                    <>
                      <span className="w-3 h-3 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                      A terminar...
                    </>
                  ) : (
                    "Terminar Sessão"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
