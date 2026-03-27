export default function PatientInformationSection() {
  return (
    <section className="bg-surface-container-lowest p-8 rounded-xl space-y-8">
      <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
        <h3 className="text-xl font-bold">Informações do Paciente</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Nome Completo do Paciente
          </label>
          <input
            type="text"
            placeholder="ex: Jonathan Harker"
            className="w-full bg-surface border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Diagnóstico / Motivo
          </label>
          <select className="w-full bg-surface border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm">
            <option>Selecionar Motivo</option>
            <option>Cirurgia de Emergência</option>
            <option>Anemia Grave</option>
            <option>Acidente / Trauma</option>
            <option>Procedimento Agendado</option>
            <option>Hemorragia Pós-parto</option>
          </select>
        </div>
      </div>
    </section>
  );
}