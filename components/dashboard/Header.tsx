"use client";

import { logoutAction } from "@/actions/auth/login";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fecha ao clicar fora
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

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-white flex justify-between items-center px-8 z-40 border-b border-gray-100">
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
        <button className="text-gray-600 hover:text-red-600 transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#b7131a] rounded-full border-2 border-white" />
        </button>
        <div
          ref={dropdownRef}
          className="relative flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="text-right">
            <p className="text-sm font-bold leading-none">Perfil do Hospital</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>

          <div
            className={`w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center ${open}`}
          >
            <span className="material-symbols-outlined text-gray-400">person</span>
          </div>

          <span
            className={`material-symbols-outlined text-gray-400 transition-transform ${open ? "rotate-180" : ""
              }`}
          >
            expand_more
          </span>

          {open && (
            <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in zoom-in-95">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition">
                Meu Perfil
              </button>

              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition">
                Configurações
              </button>

              <div className="border-t my-2" />

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  Terminar Sessão
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
