"use client";

import { useBloodRequest } from "@/context/Bloodrequestcontext";

const inputClass =
  "w-full bg-surface border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none disabled:opacity-60";

export default function ClinicalDocumentationSection() {
  const { form, update, isPending } = useBloodRequest();

  return (
    <section className="bg-surface-container-lowest p-8 rounded-xl space-y-8">
      <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
        <h3 className="text-xl font-bold">Documentação Clínica</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Pessoa de Contacto
          </label>
          <input
            type="text"
            value={form.contactPerson}
            onChange={(e) => update("contactPerson", e.target.value)}
            placeholder="Enfermeiro Chefe / Médico Assistente"
            disabled={isPending}
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Número de Telefone
          </label>
          <input
            type="tel"
            value={form.contactPhone}
            onChange={(e) => update("contactPhone", e.target.value)}
            placeholder="+244 900 000 000"
            disabled={isPending}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
          Notas Clínicas Adicionais
        </label>
        <textarea
          value={form.clinicalNotes}
          onChange={(e) => update("clinicalNotes", e.target.value)}
          placeholder="Requisitos específicos de prova cruzada ou histórico do paciente..."
          rows={4}
          disabled={isPending}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="space-y-2">
        <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
          Enviar Registos Médicos (PDF/JPG)
        </label>
        <label className="border-2 border-dashed border-outline-variant/50 rounded-xl p-10 flex flex-col items-center justify-center bg-surface/50 hover:bg-surface transition-all cursor-pointer group">
          <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-primary transition-colors mb-4">
            cloud_upload
          </span>
          <p className="text-sm font-semibold text-on-surface">
            {form.medicalFile
              ? form.medicalFile.name
              : "Clique para enviar ou arraste e solte"}
          </p>
          <p className="text-[0.6875rem] text-secondary mt-1">
            Tamanho máximo do arquivo: 10MB
          </p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => update("medicalFile", e.target.files?.[0] ?? null)}
            className="hidden"
          />
        </label>
      </div>
    </section>
  );
}
