"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

import {
  BloodRequestProvider,
  useBloodRequest,
} from "@/context/Bloodrequestcontext";

import CreateBloodRequestHeader from "@/components/dashboard/create-order/CreateBloodRequestHeader";
import PatientInformationSection from "@/components/dashboard/create-order/PatientInformation";
import RequestLogisticsSection from "@/components/dashboard/create-order/RequestLogistics";
import ClinicalDocumentationSection from "@/components/dashboard/create-order/ClinicalDocumentation";
import RequestSummarySidebar from "@/components/dashboard/create-order/RequestSummarySidebar";

// banner de erro global (lê do contexto)
// function ErrorBanner() {
//   const { errorMsg } = useBloodRequest();
//   if (!errorMsg) return null;
//   return (
//     <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium flex items-center gap-3">
//       <span className="material-symbols-outlined text-red-500 shrink-0">
//         error
//       </span>
//       {errorMsg}
//     </div>
//   );
// }

function BottomActions() {
  const { isPending, submit, saveDraft } = useBloodRequest();
  return (
    <div className="flex items-center justify-end gap-4 py-8">
      <button
        type="button"
        onClick={saveDraft}
        disabled={isPending}
        className="px-8 py-4 text-sm font-bold text-secondary hover:text-on-surface transition-colors disabled:opacity-60"
      >
        Salvar como Rascunho
      </button>
      <button
        type="button"
        onClick={submit}
        disabled={isPending}
        className="bg-[#b7131a] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#db322f] hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>A enviar...</span>
          </>
        ) : (
          <>
            Enviar Pedido
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </>
        )}
      </button>
    </div>
  );
}

function CriarPedidoLayout() {
  const { errorMsg } = useBloodRequest();

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg);
    }
  }, [errorMsg]);

  return (
    <div className="pt-6 px-8 lg:px-16 max-w-6xl mx-auto">
      <CreateBloodRequestHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <PatientInformationSection />
          <RequestLogisticsSection />
          <ClinicalDocumentationSection />
          <BottomActions />
        </div>

        <div className="lg:col-span-1">
          <RequestSummarySidebar />
        </div>
      </div>
    </div>
  );
}

export default function CriarPedidoClient() {
  return (
    <BloodRequestProvider>
      <CriarPedidoLayout />
    </BloodRequestProvider>
  );
}
