'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { registerAction } from '@/actions/auth/register'

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const

const PROVINCES = [
  'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango',
  'Cuanza Norte', 'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla',
  'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico',
  'Namibe', 'Uíge', 'Zaire',
]

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
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [errorMsg, setErrorMsg]       = useState<string | null>(null)
  const [isPending, startTransition]  = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg(null)

    if (!acceptTerms) {
      setErrorMsg('Deve aceitar os termos de serviço para continuar.')
      return
    }

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await registerAction(formData)
      if (result?.error) setErrorMsg(result.error)
    })
  }

  return (
    <div className="flex-1 p-8 md:p-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          Registo de Utilizador
        </h1>
        <p className="text-gray-500 font-medium text-sm">Crie a sua conta DoaVida</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados Pessoais */}
        <section>
          <SectionLabel label="Dados Pessoais" />
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
            <Field label="Tipo de Sangue">
              <select
                name="bloodType"
                required
                disabled={isPending}
                className={inputClass}
                defaultValue=""
              >
                <option value="" disabled>Selecionar tipo</option>
                {BLOOD_TYPES.map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </Field>
            <Field label="Província">
              <select
                name="province"
                required
                disabled={isPending}
                className={inputClass}
                defaultValue=""
              >
                <option value="" disabled>Selecionar província</option>
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        {/* Contactos */}
        <section>
          <SectionLabel label="Contactos" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Email" fullWidth>
              <input
                name="email"
                type="email"
                required
                disabled={isPending}
                placeholder="nome@email.com"
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        {/* Segurança */}
        <section>
          <SectionLabel label="Segurança" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Palavra-passe">
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
              Aceito os termos de serviço e protocolos de segurança da rede DoaVida.
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
