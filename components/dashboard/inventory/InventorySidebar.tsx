"use client";

import { useState } from "react";

type BloodTypeOption = "A+" | "O-" | "B+";
type ActionOption = "Entrada" | "Utilização";

const BLOOD_OPTIONS: BloodTypeOption[] = ["A+", "O-", "B+"];
const ACTION_OPTIONS: ActionOption[] = ["Entrada", "Utilização"];

function MonthlyAnalysis() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Análise Mensal</h3>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Entrada (Doações)
            </span>
            <span className="text-sm font-black text-[#006578]">
              +412 Unid.
            </span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#006578] h-full rounded-full"
              style={{ width: "85%" }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase">
              Consumo (Utilizado)
            </span>
            <span className="text-sm font-black text-[#b7131a]">
              -385 Unid.
            </span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-[#b7131a] h-full rounded-full"
              style={{ width: "78%" }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-gray-400">
            Balanço Líquido de Stock
          </span>
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
            +6.5%
          </span>
        </div>
        <p className="text-2xl font-black text-gray-900">+27 Unidades</p>
      </div>
    </div>
  );
}

function ExpirationAlert() {
  return (
    <div className="bg-zinc-900 text-white p-8 rounded-xl relative overflow-hidden">
      {/* Decor */}
      <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
        <span className="material-symbols-outlined text-9xl">warning</span>
      </div>
      <h3 className="text-lg font-bold mb-2">Alerta de Desperdício</h3>
      <p className="text-zinc-400 text-xs mb-6">
        14 unidades estão a aproximar-se do limite de 35 dias nas próximas 48
        horas.
      </p>
      <button className="w-full py-3 bg-white text-zinc-900 rounded-xl font-bold text-sm hover:bg-zinc-100 transition-colors">
        Priorizar Utilização
      </button>
    </div>
  );
}

function QuickLog() {
  const [bloodType, setBloodType] = useState<BloodTypeOption>("A+");
  const [action, setAction] = useState<ActionOption>("Entrada");

  return (
    <div className="bg-gray-50 p-8 rounded-xl border border-dashed border-gray-300">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-gray-400">
          edit_note
        </span>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
          Registo Rápido
        </h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Blood Type */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 block">
              Tipo de Sangue
            </label>
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value as BloodTypeOption)}
              className="w-full bg-white border-none rounded-lg text-sm font-bold focus:ring-[#b7131a] outline-none shadow-sm"
            >
              {BLOOD_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 block">
              Ação
            </label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value as ActionOption)}
              className="w-full bg-white border-none rounded-lg text-sm font-bold focus:ring-[#b7131a] outline-none shadow-sm"
            >
              {ACTION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className="w-full py-3 bg-white text-gray-600 border border-gray-200 rounded-lg font-bold text-xs hover:border-[#b7131a] hover:text-[#b7131a] transition-all">
          Atualizar Níveis
        </button>
      </div>
    </div>
  );
}

export default function InventorySidebar() {
  return (
    <div className="space-y-8">
      <MonthlyAnalysis />
    </div>
  );
}
