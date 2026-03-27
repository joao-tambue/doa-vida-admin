export default function RequestSummarySidebar() {
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
              <p className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary">Paciente</p>
              <p className="font-bold text-on-surface">Jonathan Harker</p>
            </div>
            <div className="px-3 py-1 bg-error-container text-on-error-container text-[10px] font-black uppercase rounded-full">
              Crítico
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-lg">
              <p className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary mb-1">Tipo Sanguíneo</p>
              <p className="text-2xl font-black text-primary">A+</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg">
              <p className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary mb-1">Quantidade</p>
              <p className="text-2xl font-black text-on-surface">
                02 <span className="text-xs font-normal">unidades</span>
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-lg">medical_services</span>
              <p className="text-sm text-on-surface font-medium">Cirurgia de Emergência</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary text-lg">person</span>
              <p className="text-sm text-on-surface font-medium">Dr. Abraham Van Helsing</p>
            </div>
          </div>

          <div className="p-4 bg-tertiary-container/10 rounded-xl border border-tertiary-container/20 flex gap-3">
            <span className="material-symbols-outlined text-tertiary">info</span>
            <p className="text-xs text-on-tertiary-fixed-variant leading-relaxed">
              Ao enviar, este pedido será imediatamente transmitido para a rede central de bancos de sangue.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <p className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-primary">
            Alerta de Prioridade
          </p>
        </div>
        <p className="text-sm font-medium text-on-surface leading-snug">
          O tempo médio de atendimento para pedidos Críticos de A+ é atualmente de 45 minutos.
        </p>
      </div>
    </div>
  );
}