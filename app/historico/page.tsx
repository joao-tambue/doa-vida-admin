import type { Metadata } from "next";
import HistoryMetrics from "@/components/dashboard/history/HistoryMetrics";
import HistoryTable from "@/components/dashboard/history/HistoryTable";
import HistoryAnalysis from "@/components/dashboard/history/HistoryAnalysis";

export const metadata: Metadata = {
  title: "Histórico | DoaVida",
};

export default function HistoricoPage() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none mb-2">
            Histórico de Solicitações
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Arquivo de todas as operações clínicas de fornecimento de sangue.
          </p>
          <div className="mt-8 flex gap-3">
            <button className="bg-[#b7131a] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined text-xl">
                ios_share
              </span>
              Exportar dados
            </button>
            <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined text-xl">
                filter_list
              </span>
              Filtros Avançados
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <HistoryMetrics />
        </div>
      </section>

      <HistoryTable />

      <HistoryAnalysis />
    </div>
  );
}
