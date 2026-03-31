"use client";

import { useState } from "react";
import type { ApiRequest } from "@/lib/api/queries";

interface Props {
  records: ApiRequest[];
}

type HistoryStatus = "Concluído" | "Expirado" | "Cancelado";
type FilterTab = "Todos" | "Concluído" | "Expirado";

const FILTER_TABS: FilterTab[] = ["Todos", "Concluído", "Expirado"];

const STATUS_CONFIG: Record<HistoryStatus, { dot: string; text: string; label: string }> = {
  Concluído: { dot: "bg-[#006578]", text: "text-[#008097]", label: "Concluído" },
  Expirado: { dot: "bg-zinc-400", text: "text-zinc-400", label: "Expirado" },
  Cancelado: { dot: "bg-[#ba1a1a]", text: "text-[#ba1a1a]", label: "Cancelado" },
};

function mapStatus(status: ApiRequest["status"]): HistoryStatus {
  if (status === "completed") return "Concluído";
  if (status === "expired") return "Expirado";
  return "Cancelado";
}

function bloodBg(bloodType: string): string {
  const critical = ["O-", "B-", "AB-"];
  return critical.includes(bloodType)
    ? "bg-red-50 text-red-700"
    : "bg-zinc-100 text-zinc-700";
}

function formatDatetime(isoDate: string): string {
  return new Date(isoDate).toLocaleString("pt-AO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ITEMS_PER_PAGE = 10;

export default function HistoryTable({ records }: Props) {
  const [activeTab, setActiveTab] = useState<FilterTab>("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = records.filter((r) => {
    const status = mapStatus(r.status);
    if (activeTab === "Todos") return true;
    if (activeTab === "Concluído") return status === "Concluído";
    if (activeTab === "Expirado") return status === "Expirado";
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="px-8 py-6 flex justify-between items-center border-b border-zinc-100">
        <div className="flex gap-6 items-center">
          <h3 className="font-extrabold text-lg text-gray-900">Dados Arquivados</h3>
          <div className="flex gap-2">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
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
          Mostrando {paginated.length} de {filtered.length} casos
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50">
              {["Request ID", "Data", "Paciente", "Tipo de Sangue", "Unidades", "Estado", "Ação"].map((col) => (
                <th
                  key={col}
                  className={`px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider ${
                    col === "Unidades" ? "text-center" : ""
                  } ${col === "Ação" ? "text-right" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-8 py-10 text-center text-sm text-zinc-400">
                  Sem registos encontrados.
                </td>
              </tr>
            ) : (
              paginated.map((record) => {
                const status = mapStatus(record.status);
                const statusCfg = STATUS_CONFIG[status];
                return (
                  <tr key={record.id} className="hover:bg-zinc-50 transition-colors group">
                    <td className="px-8 py-5 text-sm font-bold text-gray-900">
                      {record.case_id}
                    </td>
                    <td className="px-8 py-5 text-sm text-zinc-500">
                      {formatDatetime(record.created_at)}
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-gray-900">
                      {record.patient_name}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 text-xs font-black rounded-lg ${bloodBg(record.blood_type)}`}>
                        {record.blood_type}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center font-bold text-sm">
                      {record.bags_quantity}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                        <span className={`text-xs font-bold uppercase tracking-tight ${statusCfg.text}`}>
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
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="px-8 py-6 bg-zinc-50 flex justify-between items-center border-t border-zinc-100">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-gray-900 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Anterior
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                currentPage === page ? "bg-[#b7131a] text-white" : "text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-gray-900 transition-colors"
        >
          Próximo
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}
