"use client";

import { useState } from "react";

export default function UrgentAlert() {
  const [visible, setVisible] = useState<boolean>(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50 pointer-events-none">
      <div className="bg-red-50 text-red-900 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 border-l-8 border-[#b7131a] animate-bounce pointer-events-auto">
        <span
          className="material-symbols-outlined text-2xl text-[#b7131a]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          priority_high
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider">
            Alerta Urgente
          </p>
          <p className="text-sm font-semibold">Stock de O- abaixo de 5%</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-4 hover:scale-110 transition-transform text-red-700"
          aria-label="Fechar alerta"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
}
