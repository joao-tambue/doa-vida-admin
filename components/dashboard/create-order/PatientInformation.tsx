"use client";

import { useBloodRequest, type Diagnosis } from "@/context/Bloodrequestcontext";

const DIAGNOSES: Diagnosis[] = [
  "Cirurgia de Emergência",
  "Anemia Grave",
  "Acidente / Trauma",
  "Procedimento Agendado",
  "Hemorragia Pós-parto",
  "Outro",
];

const inputClass =
  "w-full bg-surface border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none disabled:opacity-60";

export default function PatientInformationSection() {
  const { form, update, isPending } = useBloodRequest();

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
            value={form.patientName}
            onChange={(e) => update("patientName", e.target.value)}
            placeholder="ex: Jonathan Harker"
            disabled={isPending}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Diagnóstico / Motivo
          </label>
          <select
            value={form.diagnosis}
            onChange={(e) => update("diagnosis", e.target.value as Diagnosis)}
            disabled={isPending}
            className={inputClass}
          >
            <option value="">Selecionar Motivo</option>
            {DIAGNOSES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
