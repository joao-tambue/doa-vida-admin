import type { Metadata } from "next";

import CreateBloodRequestHeader from '@/components/dashboard/create-order/CreateBloodRequestHeader';
import PatientInformationSection from '@/components/dashboard/create-order/PatientInformation';
import RequestLogisticsSection from '@/components/dashboard/create-order/RequestLogistics';
import ClinicalDocumentationSection from '@/components/dashboard/create-order/ClinicalDocumentation';
import RequestSummarySidebar from '@/components/dashboard/create-order/RequestSummarySidebar';

export const metadata: Metadata = {
  title: "Criar Pedido de Sangue | DoaVida",
};

export default function CriarPedidoPage() {
  return (
    <div className="pt-6 px-8 lg:px-16 max-w-6xl mx-auto">
      <CreateBloodRequestHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Formulário principal */}
        <div className="lg:col-span-2 space-y-12">
          <PatientInformationSection />
          <RequestLogisticsSection />
          <ClinicalDocumentationSection />

          <div className="flex items-center justify-end gap-4 py-8">
            <button className="px-8 py-4 text-sm font-bold text-secondary hover:text-on-surface transition-colors">
              Salvar como Rascunho
            </button>
            <button className="bg-[#b7131a] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all active:scale-[0.98]">
              Enviar Pedido
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Sidebar de resumo */}
        <div className="lg:col-span-1">
          <RequestSummarySidebar />
        </div>
      </div>
    </div>
  );
}