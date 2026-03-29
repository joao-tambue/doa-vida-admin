import type { Metadata } from "next";
import StatsCards from "@/components/dashboard/actives-requested/StatsCards";
import RequestsTable from "@/components/dashboard/actives-requested/RequestsTable";

export const metadata: Metadata = {
  title: "Pedidos Ativos | DoaVida",
};

export default function PedidosAtivosPage() {
  return (
    <>
      <div className="mb-10 flex justify-between items-end">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            <span>Painel</span>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-red-700">Pedidos Ativos</span>
          </nav>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Gestão de Pedidos Ativos
          </h2>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm">
            <span className="material-symbols-outlined text-lg">
              filter_list
            </span>
            Filtrar
          </button>
          <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm">
            <span className="material-symbols-outlined text-lg">download</span>
            Exportar PDF
          </button>
        </div>
      </div>

      <StatsCards />
      <RequestsTable />
    </>
  );
}
