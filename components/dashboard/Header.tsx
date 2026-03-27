"use client";

import Image from "next/image";

export default function Header() {
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

        <button className="text-gray-600 hover:text-red-600 transition-colors">
          <span className="material-symbols-outlined">help</span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-bold leading-none">Perfil do Hospital</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src="https://github.com/joao-tambue.png"
              alt="Avatar do Administrador"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
