'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createBloodRequestAction } from '@/actions/requests/create'

// ─── tipos locais ────────────────────────────────────────────────────────────
type BloodType  = 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-'
type Urgency    = 'normal' | 'critico'
type Diagnosis  =
  | ''
  | 'Cirurgia de Emergência'
  | 'Anemia Grave'
  | 'Acidente / Trauma'
  | 'Procedimento Agendado'
  | 'Hemorragia Pós-parto'
  | 'Outro'

interface FormState {
  patientName:    string
  diagnosis:      Diagnosis
  bloodType:      BloodType
  units:          number
  urgency:        Urgency
  contactPerson:  string
  contactPhone:   string
  clinicalNotes:  string
  medicalFile:    File | null
}

const BLOOD_TYPES: BloodType[] = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']

// ─── sub-componentes ──────────────────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 border-l-4 border-primary pl-4 mb-8">
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  )
}

const inputClass =
  'w-full bg-surface border-none rounded-lg p-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none disabled:opacity-60'

const labelClass =
  'text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block mb-2'

// ─── página principal ─────────────────────────────────────────────────────────
export default function CriarPedidoPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [errorMsg, setErrorMsg]      = useState<string | null>(null)

  const [form, setForm] = useState<FormState>({
    patientName:   '',
    diagnosis:     '',
    bloodType:     'A+',
    units:         1,
    urgency:       'normal',
    contactPerson: '',
    contactPhone:  '',
    clinicalNotes: '',
    medicalFile:   null,
  })

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg(null)

    if (!form.diagnosis) {
      setErrorMsg('Por favor selecione um diagnóstico.')
      return
    }

    const formData = new FormData()
    formData.set('patientName',    form.patientName)
    formData.set('diagnosis',      form.diagnosis)
    formData.set('bloodType',      form.bloodType)
    formData.set('unitsRequested', String(form.units))
    formData.set('urgency',        form.urgency)
    formData.set('contactPerson',  form.contactPerson)
    formData.set('contactPhone',   form.contactPhone)
    formData.set('clinicalNotes',  form.clinicalNotes)
    if (form.medicalFile) formData.set('medicalFile', form.medicalFile)

    startTransition(async () => {
      const result = await createBloodRequestAction(formData)
      if (result?.error) setErrorMsg(result.error)
    })
  }

  // Resumo lateral
  const totalCritical = form.urgency === 'critico'

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-8 items-start">

          {/* ── COLUNA PRINCIPAL ── */}
          <div className="flex-1 space-y-6">

            {/* Erro global */}
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
                {errorMsg}
              </div>
            )}

            {/* 1 — Informações do Paciente */}
            <section className="bg-surface-container-lowest p-8 rounded-xl">
              <SectionHeader title="Informações do Paciente" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Nome Completo do Paciente</label>
                  <input
                    type="text"
                    value={form.patientName}
                    onChange={(e) => update('patientName', e.target.value)}
                    placeholder="ex: Jonathan Harker"
                    required
                    disabled={isPending}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Diagnóstico / Motivo</label>
                  <select
                    value={form.diagnosis}
                    onChange={(e) => update('diagnosis', e.target.value as Diagnosis)}
                    required
                    disabled={isPending}
                    className={inputClass}
                  >
                    <option value="">Selecionar Motivo</option>
                    <option>Cirurgia de Emergência</option>
                    <option>Anemia Grave</option>
                    <option>Acidente / Trauma</option>
                    <option>Procedimento Agendado</option>
                    <option>Hemorragia Pós-parto</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 2 — Logística do Pedido */}
            <section className="bg-surface-container-lowest p-8 rounded-xl">
              <SectionHeader title="Logística do Pedido" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Tipo Sanguíneo */}
                <div>
                  <label className={labelClass}>Tipo Sanguíneo</label>
                  <div className="grid grid-cols-4 gap-2">
                    {BLOOD_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => update('bloodType', type)}
                        disabled={isPending}
                        className={`py-2 text-xs font-bold border border-outline-variant/30 rounded-lg transition-all ${
                          form.bloodType === type
                            ? 'bg-primary text-on-primary'
                            : 'hover:bg-primary hover:text-on-primary'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Unidades */}
                <div>
                  <label className={labelClass}>Unidades Necessárias</label>
                  <div className="flex items-center bg-surface rounded-lg p-2">
                    <button
                      type="button"
                      onClick={() => update('units', Math.max(1, form.units - 1))}
                      disabled={isPending}
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      type="number"
                      value={form.units}
                      min={1}
                      onChange={(e) => update('units', Math.max(1, Number(e.target.value)))}
                      disabled={isPending}
                      className="w-full bg-transparent border-none text-center font-bold focus:ring-0 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => update('units', form.units + 1)}
                      disabled={isPending}
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>

                {/* Urgência */}
                <div>
                  <label className={labelClass}>Nível de Urgência</label>
                  <div className="flex flex-col gap-2">
                    <label
                      className={`flex items-center gap-3 p-3 bg-surface rounded-lg cursor-pointer hover:bg-surface-container-high transition-all ${
                        form.urgency === 'normal' ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        checked={form.urgency === 'normal'}
                        onChange={() => update('urgency', 'normal')}
                        disabled={isPending}
                        className="text-primary focus:ring-primary accent-primary"
                      />
                      <span className="text-xs font-bold">Normal</span>
                    </label>
                    <label
                      className={`flex items-center gap-3 p-3 bg-error-container/20 border border-error/10 rounded-lg cursor-pointer hover:bg-error-container/30 transition-all ${
                        form.urgency === 'critico' ? 'ring-2 ring-error' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        checked={form.urgency === 'critico'}
                        onChange={() => update('urgency', 'critico')}
                        disabled={isPending}
                        className="text-error focus:ring-error accent-error"
                      />
                      <span className="text-xs font-bold text-on-error-container">
                        Crítico (Triagem)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* 3 — Documentação Clínica */}
            <section className="bg-surface-container-lowest p-8 rounded-xl space-y-6">
              <SectionHeader title="Documentação Clínica" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Pessoa de Contacto</label>
                  <input
                    type="text"
                    value={form.contactPerson}
                    onChange={(e) => update('contactPerson', e.target.value)}
                    placeholder="Enfermeiro Chefe / Médico Assistente"
                    disabled={isPending}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Número de Telefone</label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => update('contactPhone', e.target.value)}
                    placeholder="+244 900 000 000"
                    disabled={isPending}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Notas Clínicas Adicionais</label>
                <textarea
                  value={form.clinicalNotes}
                  onChange={(e) => update('clinicalNotes', e.target.value)}
                  placeholder="Requisitos específicos de prova cruzada ou histórico do paciente..."
                  rows={4}
                  disabled={isPending}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>Enviar Registos Médicos (PDF/JPG)</label>
                <label className="border-2 border-dashed border-outline-variant/50 rounded-xl p-10 flex flex-col items-center justify-center bg-surface/50 hover:bg-surface transition-all cursor-pointer group">
                  <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-primary transition-colors mb-4">
                    cloud_upload
                  </span>
                  <p className="text-sm font-semibold text-on-surface">
                    {form.medicalFile
                      ? form.medicalFile.name
                      : 'Clique para enviar ou arraste e solte'}
                  </p>
                  <p className="text-[0.6875rem] text-secondary mt-1">Tamanho máximo: 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => update('medicalFile', e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </label>
              </div>
            </section>
          </div>

          {/* ── SIDEBAR RESUMO ── */}
          <aside className="hidden lg:block w-80 sticky top-8 space-y-4">
            <div className="bg-surface-container-lowest rounded-xl p-6 space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-secondary">
                Resumo do Pedido
              </h4>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Paciente</span>
                  <span className="font-semibold truncate max-w-[140px]">
                    {form.patientName || '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Tipo</span>
                  <span className="font-bold text-primary">{form.bloodType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Unidades</span>
                  <span className="font-bold">{form.units}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Urgência</span>
                  <span
                    className={`font-bold capitalize ${
                      totalCritical ? 'text-error' : 'text-green-600'
                    }`}
                  >
                    {form.urgency === 'critico' ? 'Crítico' : 'Normal'}
                  </span>
                </div>
                {form.diagnosis && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Diagnóstico</span>
                    <span className="font-semibold text-right max-w-[140px] text-xs leading-tight">
                      {form.diagnosis}
                    </span>
                  </div>
                )}
              </div>

              <hr className="border-outline-variant/30" />

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-on-primary font-bold py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>A enviar...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">send</span>
                    <span>Submeter Pedido</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                disabled={isPending}
                className="w-full py-3 rounded-lg border border-outline-variant/40 text-sm font-semibold hover:bg-surface-container-high transition-all"
              >
                Cancelar
              </button>
            </div>
          </aside>
        </div>

        {/* Submit mobile */}
        <div className="lg:hidden mt-6">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isPending ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>A enviar...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">send</span>
                <span>Submeter Pedido</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
