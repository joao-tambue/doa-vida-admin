"use client";

import { useBloodRequest } from "@/context/Bloodrequestcontext";

const WAIT_TIMES: Record<string, string> = {
  critico: "45 minutos",
  normal: "2–4 horas",
};

export default function RequestSummarySidebar() {
  const { form, isPending, submit, saveDraft } = useBloodRequest();

  const isCritical = form.urgency === "critico";
  const waitTime = WAIT_TIMES[form.urgency];
  const unitsLabel = String(form.units).padStart(2, "0");

  return (
    <div className="sticky top-24 space-y-6">
      <div className="bg-white rounded-xl shadow-2xl shadow-black/5 overflow-hidden">
        <div className="bg-primary p-6 text-on-primary">
          <p className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase opacity-80">
            Resumo em Tempo Real
          </p>
          <h4 className="text-xl font-bold mt-1">Revisar Detalhes</h4>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary">
                Paciente
              </p>
              <p className="font-bold text-on-surface">
                {form.patientName.trim() ? (
                  form.patientName
                ) : (
                  <span className="font-normal italic text-secondary">
                    Não preenchido
                  </span>
                )}
              </p>
            </div>
            <div
              className={`px-3 py-1 text-[10px] font-black uppercase rounded-full transition-colors ${
                isCritical
                  ? "bg-error-container text-on-error-container"
                  : "bg-surface-container text-secondary"
              }`}
            >
              {isCritical ? "Crítico" : "Normal"}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-lg">
              <p className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary mb-1">
                Tipo Sanguíneo
              </p>
              <p className="text-2xl font-black text-primary transition-all">
                {form.bloodType}
              </p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg">
              <p className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary mb-1">
                Quantidade
              </p>
              <p className="text-2xl font-black text-on-surface transition-all">
                {unitsLabel}{" "}
                <span className="text-xs font-normal">unidades</span>
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-lg">
                medical_services
              </span>
              <p className="text-sm text-on-surface font-medium">
                {form.diagnosis ? (
                  form.diagnosis
                ) : (
                  <span className="italic text-secondary">
                    Diagnóstico não selecionado
                  </span>
                )}
              </p>
            </div>

            {form.contactPerson.trim() && (
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-lg">
                  person
                </span>
                <p className="text-sm text-on-surface font-medium">
                  {form.contactPerson}
                </p>
              </div>
            )}

            {form.medicalFile && (
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary text-lg">
                  attach_file
                </span>
                <p className="text-sm text-on-surface font-medium truncate max-w-[180px]">
                  {form.medicalFile.name}
                </p>
              </div>
            )}
          </div>

          <div className="p-4 bg-tertiary-container/10 rounded-xl border border-tertiary-container/20 flex gap-3">
            <span className="material-symbols-outlined text-tertiary shrink-0">
              info
            </span>
            <p className="text-xs text-on-tertiary-fixed-variant leading-relaxed">
              Ao enviar, este pedido será imediatamente transmitido para a rede
              central de bancos de sangue.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={submit}
              disabled={isPending}
              className="w-full bg-[#b7131a] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#db322f] hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
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

            <button
              type="button"
              onClick={saveDraft}
              disabled={isPending}
              className="w-full py-3 rounded-xl border border-outline-variant/40 text-sm font-semibold hover:bg-surface-container-high transition-all disabled:opacity-60"
            >
              Salvar como Rascunho
            </button>
          </div>
        </div>
      </div>

      <div
        className={`p-6 rounded-xl border-l-4 transition-all ${
          isCritical
            ? "bg-error-container/10 border-error"
            : "bg-surface-container-lowest border-primary"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              isCritical ? "bg-error" : "bg-primary"
            }`}
          />
          <p
            className={`text-[0.6875rem] font-bold tracking-[0.05em] uppercase ${
              isCritical ? "text-error" : "text-primary"
            }`}
          >
            {isCritical ? "Alerta Crítico" : "Alerta de Prioridade"}
          </p>
        </div>
        <p className="text-sm font-medium text-on-surface leading-snug">
          O tempo médio de atendimento para pedidos{" "}
          <strong>{isCritical ? "Críticos" : "Normais"}</strong> de{" "}
          <strong>{form.bloodType}</strong> é atualmente de{" "}
          <strong>{waitTime}</strong>.
        </p>
      </div>
    </div>
  );
}
