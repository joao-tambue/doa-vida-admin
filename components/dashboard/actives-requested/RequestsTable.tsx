"use client";

import { useState } from "react";
import type { ApiRequest } from "@/lib/api/queries";

interface Props {
  initialRequests: ApiRequest[];
}

type Status = "Ativo" | "Concluído" | "Expirado";
type Urgency = "Emergência" | "Normal";

const STATUS_CONFIG: Record<Status, { dot: string; text: string; label: string }> = {
  Ativo: { dot: "bg-[#b7131a] animate-pulse", text: "text-[#b7131a]", label: "Ativo" },
  Concluído: { dot: "bg-[#006578]", text: "text-[#006578]", label: "Concluído" },
  Expirado: { dot: "bg-gray-400", text: "text-gray-500", label: "Expirado" },
};

const URGENCY_CONFIG: Record<Urgency, string> = {
  Emergência: "bg-red-100 text-red-800",
  Normal: "bg-gray-200 text-gray-700",
};

function mapStatus(status: ApiRequest["status"]): Status {
  if (status === "completed") return "Concluído";
  if (status === "expired" || status === "cancelled" || status === "rejected") return "Expirado";
  return "Ativo";
}

function mapUrgency(urgency: ApiRequest["urgency"]): Urgency {
  return urgency === "high" ? "Emergência" : "Normal";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function formatCreatedAt(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Agora";
  if (hours < 24) return `${new Date(isoDate).toLocaleTimeString("pt-AO", { hour: "2-digit", minute: "2-digit" })}, Hoje`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Ontem";
  return `Há ${days} dias`;
}

const TABLE_COLUMNS = ["ID", "Paciente", "Tipo", "Urgência", "Unidades", "Estado", "Criado", "Ações"] as const;

function StatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status];
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className={`text-xs font-semibold ${config.text}`}>{config.label}</span>
    </div>
  );
}

function RowActions({ status }: { status: Status }) {
  if (status === "Concluído") {
    return (
      <div className="flex justify-end gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <span className="material-symbols-outlined text-lg">visibility</span>
        </button>
        <button className="p-2 opacity-30 cursor-not-allowed" disabled>
          <span className="material-symbols-outlined text-lg">edit</span>
        </button>
        <button className="p-2 opacity-30 cursor-not-allowed" disabled>
          <span className="material-symbols-outlined text-lg">cancel</span>
        </button>
      </div>
    );
  }
  if (status === "Expirado") {
    return (
      <div className="flex justify-end gap-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <span className="material-symbols-outlined text-lg">visibility</span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <span className="material-symbols-outlined text-lg">refresh</span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>
    );
  }
  return (
    <div className="flex justify-end gap-2">
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
        <span className="material-symbols-outlined text-lg">visibility</span>
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
        <span className="material-symbols-outlined text-lg">edit</span>
      </button>
      <button className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600">
        <span className="material-symbols-outlined text-lg">cancel</span>
      </button>
    </div>
  );
}

export default function RequestsTable({ initialRequests }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos os Estados");
  const [urgencyFilter, setUrgencyFilter] = useState("Toda a Urgência");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = initialRequests.filter((r) => {
    const status = mapStatus(r.status);
    const urgency = mapUrgency(r.urgency);

    const matchSearch =
      search === "" ||
      r.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      r.case_id.toLowerCase().includes(search.toLowerCase());

    const matchStatus = statusFilter === "Todos os Estados" || status === statusFilter;
    const matchUrgency = urgencyFilter === "Toda a Urgência" || urgency === urgencyFilter;

    return matchSearch && matchStatus && matchUrgency;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-full p-2 mb-6 flex items-center gap-4 border border-gray-100 shadow-sm">
        <div className="flex-1 px-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input
            type="text"
            placeholder="Encontrar pedido rapidamente..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full bg-transparent border-none focus:ring-0 text-sm outline-none"
          />
        </div>
        <div className="flex items-center gap-2 pr-2">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="bg-gray-50 text-xs font-bold py-2 px-4 rounded-full border-none focus:ring-2 focus:ring-red-500 transition-all outline-none"
          >
            <option>Todos os Estados</option>
            <option>Ativo</option>
            <option>Concluído</option>
            <option>Expirado</option>
          </select>
          <select
            value={urgencyFilter}
            onChange={(e) => { setUrgencyFilter(e.target.value); setCurrentPage(1); }}
            className="bg-gray-50 text-xs font-bold py-2 px-4 rounded-full border-none focus:ring-2 focus:ring-red-500 transition-all outline-none"
          >
            <option>Toda a Urgência</option>
            <option>Emergência</option>
            <option>Normal</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        {paginated.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-gray-300">assignment_late</span>
            </div>
            <h4 className="text-xl font-black text-gray-800 mb-2">Sem resultados</h4>
            <p className="text-gray-500 text-sm max-w-xs">
              Nenhum pedido corresponde aos filtros aplicados.
            </p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                {TABLE_COLUMNS.map((col) => (
                  <th
                    key={col}
                    className={`py-4 px-6 text-xs font-bold uppercase tracking-widest text-gray-400 ${
                      col === "Urgência" || col === "Unidades" ? "text-center" : ""
                    } ${col === "Ações" ? "text-right" : ""}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((req) => {
                const status = mapStatus(req.status);
                const urgency = mapUrgency(req.urgency);
                const initials = getInitials(req.patient_name);
                return (
                  <tr
                    key={req.id}
                    className={`hover:bg-gray-50 transition-colors ${status === "Expirado" ? "grayscale opacity-60" : ""}`}
                  >
                    <td className="py-5 px-6 text-sm font-bold text-gray-400">
                      #{req.case_id}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-red-100 text-red-700">
                          {initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{req.patient_name}</p>
                          <p className="text-[10px] text-gray-400">{req.province}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-gray-200 text-gray-700">
                        {req.blood_type}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${URGENCY_CONFIG[urgency]}`}>
                        {urgency}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-center text-sm font-bold">
                      {String(req.bags_quantity).padStart(2, "0")}
                    </td>
                    <td className="py-5 px-6">
                      <StatusBadge status={status} />
                    </td>
                    <td className="py-5 px-6 text-sm text-gray-400">
                      {formatCreatedAt(req.created_at)}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <RowActions status={status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <div className="bg-gray-50 px-8 py-4 flex justify-between items-center border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400">
            Mostrando {paginated.length} de {filtered.length} pedidos
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors text-gray-400"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                  currentPage === page ? "bg-[#b7131a] text-white" : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors text-gray-400"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
