"use client";

import { useState } from "react";

export default function SecurityPanel() {
  const [twoFactor, setTwoFactor] = useState<boolean>(true);

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-[#b7131a]">
          shield
        </span>
        <h3 className="text-lg font-bold text-gray-900">Segurança</h3>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group">
          <span className="text-sm font-semibold text-gray-500">
            Alterar Palavra-passe
          </span>
          <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </button>

        <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-500">
              Autenticação de Dois Fatores
            </p>
            <p className="text-[10px] text-gray-400">
              Camada extra de segurança
            </p>
          </div>

          <button
            onClick={() => setTwoFactor((v) => !v)}
            aria-label="Toggle autenticação de dois fatores"
            className={`w-10 h-5 rounded-full relative transition-colors ${
              twoFactor ? "bg-[#008097]" : "bg-gray-200"
            }`}
          >
            <div
              className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${
                twoFactor ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}