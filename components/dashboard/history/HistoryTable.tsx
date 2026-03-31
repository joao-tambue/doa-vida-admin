"use client";

import { RECORDS, STATUS_CONFIG } from "@/data/history";
import { useState } from "react";

type FilterTab = "Todos" | "Concluído" | "Expirado";

const FILTER_TABS: FilterTab[] = ["Todos", "Concluído", "Expirado"];

// type HistoryStatus = "Concluído" | "Expirado" | "Cancelled";
type HistoryUrgency = "Emergency" | "Normal" | "Urgent";
// type FilterTab = "Todos" | "Concluído" | "Expirado";

export const URGENCY_CONFIG: Record<HistoryUrgency, string> = {
  Emergency: "bg-[#ffdad6] text-[#93000a]",
  Normal: "bg-gray-100 text-gray-600",
  Urgent: "bg-gray-100 text-gray-600",
};

export default function HistoryTable() {
  const [activeTab, setActiveTab] = useState<FilterTab>("Todos");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filtered = RECORDS.filter((r) => {
    if (activeTab === "Todos") return true;
    if (activeTab === "Concluído") return r.status === "Concluído";
    if (activeTab === "Expirado") return r.status === "Expirado";
    return true;
  });

  return (
    <section className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="px-8 py-6 flex justify-between items-center border-b border-zinc-100">
        <div className="flex gap-6 items-center">
          <h3 className="font-extrabold text-lg text-gray-900">
            Dados Arquivados
          </h3>
          <div className="flex gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors ${
                  activeTab === tab
                    ? "bg-[#b7131a] text-white"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-zinc-400 font-medium italic">
          Mostrando {filtered.length} de 2,410 Casos
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50">
              {[
                "Request ID",
                "Date & Time",
                "Patient",
                "Blood Type",
                "Units",
                "Status",
                "Action",
              ].map((col) => (
                <th
                  key={col}
                  className={`px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider ${
                    col === "Units" ? "text-center" : ""
                  } ${col === "Action" ? "text-right" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {filtered.map((record) => {
              const statusCfg = STATUS_CONFIG[record.status];
              return (
                <tr
                  key={record.id}
                  className="hover:bg-zinc-50 transition-colors group"
                >
                  <td className="px-8 py-5 text-sm font-bold text-gray-900">
                    {record.id}
                  </td>
                  <td className="px-8 py-5 text-sm text-zinc-500">
                    {record.datetime}
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-900">
                    {record.patient}
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 text-xs font-black rounded-lg ${record.bloodBg}`}
                    >
                      {record.bloodType}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center font-bold text-sm">
                    {record.units}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${statusCfg.dot}`}
                      />
                      <span
                        className={`text-xs font-bold uppercase tracking-tight ${statusCfg.text}`}
                      >
                        {statusCfg.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="material-symbols-outlined text-zinc-400 group-hover:text-[#b7131a] transition-colors">
                      more_horiz
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="px-8 py-6 bg-zinc-50 flex justify-between items-center border-t border-zinc-100">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-gray-900 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Anterior
        </button>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                currentPage === page
                  ? "bg-[#b7131a] text-white"
                  : "text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-zinc-400 px-1">...</span>
          <button className="w-8 h-8 rounded-lg text-zinc-500 text-xs font-bold hover:bg-zinc-200">
            241
          </button>
        </div>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-gray-900 transition-colors"
        >
          Próximo
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
}
