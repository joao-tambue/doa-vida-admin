'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { registerAction } from '@/actions/auth/register'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 border-l-4 border-[#b7131a] pl-3">
      <span className="text-[11px] font-bold uppercase tracking-widest text-[#b7131a]">
        {label}
      </span>
    </div>
  )
}

function Field({
  label,
  children,
  fullWidth = false,
}: {
  label: string
  children: React.ReactNode
  fullWidth?: boolean
}) {
  return (
    <div className={`space-y-1 ${fullWidth ? 'md:col-span-2' : ''}`}>
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider ml-1 block">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full bg-gray-50 border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-[#b7131a]/20 transition-all outline-none disabled:opacity-60'

export default function RegisterForm() {
  const [certFile, setCertFile]          = useState<File | null>(null)
  const [acceptTerms, setAcceptTerms]    = useState(false)
  const [errorMsg, setErrorMsg]          = useState<string | null>(null)
  const [isPending, startTransition]     = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg(null)

    if (!acceptTerms) {
      setErrorMsg('Deve aceitar os termos de serviço para continuar.')
      return
    }

    const formData = new FormData(e.currentTarget)
    if (certFile) formData.set('certFile', certFile)

    startTransition(async () => {
      const result = await registerAction(formData)
      if (result?.error) setErrorMsg(result.error)
    })
  }

  return (
    <div className="flex-1 p-8 md:p-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Registo de Profissional
        </h1>
        <p className="text-gray-500 font-medium text-sm">Maternidade Augusto Ngangula</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados do Profissional */}
        <section>
          <SectionLabel label="Dados do Profissional" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Nome Completo" fullWidth>
              <input
                name="fullName"
                type="text"
                required
                disabled={isPending}
                placeholder="Introduza o seu nome completo"
                className={inputClass}
              />
            </Field>
            <Field label="Nº de Ordem / Identificação Profissional" fullWidth>
              <input
                name="professionalId"
                type="text"
                disabled={isPending}
                placeholder="Ex: CRM-12345"
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        {/* Contactos */}
        <section>
          <SectionLabel label="Contactos" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Email Profissional">
              <input
                name="email"
                type="email"
                required
                disabled={isPending}
                placeholder="nome.apelido@hospital.gov.ao"
                className={inputClass}
              />
            </Field>
            <Field label="Telefone de Contacto">
              <input
                name="phone"
                type="tel"
                disabled={isPending}
                placeholder="+244 000 000 000"
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        {/* Certificações */}
        <section>
          <SectionLabel label="Certificações" />
          <label className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-[#b7131a]/40 mb-2">
              upload_file
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {certFile ? certFile.name : 'Anexar Certificação Médica/Alvará'}
            </span>
            <span className="text-[10px] text-gray-500 mt-1">PDF, JPG ou PNG (Máx. 5MB)</span>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setCertFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
        </section>

        {/* Segurança */}
        <section>
          <SectionLabel label="Segurança" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Definir Palavra-passe">
              <input
                name="password"
                type="password"
                required
                disabled={isPending}
                placeholder="••••••••"
                className={inputClass}
              />
            </Field>
            <Field label="Confirmar Palavra-passe">
              <input
                name="confirmPassword"
                type="password"
                required
                disabled={isPending}
                placeholder="••••••••"
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-6 space-y-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-[#b7131a] focus:ring-[#b7131a] bg-gray-50 border-none"
            />
            <span className="text-xs text-gray-500 leading-relaxed font-medium group-hover:text-gray-900 transition-colors">
              Aceito os termos de serviço e protocolos de segurança institucional da rede DoaVida.
            </span>
          </label>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto px-10 py-4 bg-[#b7131a] text-white font-bold rounded-lg hover:bg-[#db322f] transition-all shadow-lg shadow-red-500/20 active:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>A registar...</span>
                </>
              ) : (
                'Finalizar Registo'
              )}
            </button>
            <Link
              href="/auth/login"
              className="text-sm font-bold text-[#b7131a] hover:text-[#db322f] transition-colors"
            >
              Já tem conta? Entrar
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
