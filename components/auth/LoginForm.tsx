'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { loginAction } from '@/actions/auth/login'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember]         = useState(false)
  const [errorMsg, setErrorMsg]         = useState<string | null>(null)
  const [isPending, startTransition]    = useTransition()
  const searchParams = useSearchParams()
  const justRegistered = searchParams.get('registered') === 'true'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await loginAction(formData)
      if (result?.error) setErrorMsg(result.error)
    })
  }

  return (
    <div className="p-8 md:p-16 flex flex-col justify-center">
      <div className="mb-10 lg:hidden">
        <span className="text-2xl font-black tracking-tighter text-[#b7131a]">
          Link Life
        </span>
      </div>

      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
          Bem-vindo ao Link Life
        </h1>
        <p className="text-gray-500">Inicie sessão para gerir pedidos e inventário</p>
      </header>

      {/* Feedback: registo bem-sucedido */}
      {justRegistered && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
          ✓ Registo submetido! Aguarde aprovação do administrador e faça login.
        </div>
      )}

      {/* Feedback: erro */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-[11px] font-bold tracking-widest text-gray-500 uppercase block"
          >
            Endereço de Email Profissional
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 text-lg">mail</span>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nome@hospital.pt"
              required
              disabled={isPending}
              className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-transparent focus:border-[#b7131a] focus:ring-0 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none disabled:opacity-60"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label
              htmlFor="password"
              className="text-[11px] font-bold tracking-widest text-gray-500 uppercase"
            >
              Palavra-passe
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-gray-400 text-lg">lock</span>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              disabled={isPending}
              className="block w-full pl-11 pr-12 py-4 bg-gray-50 border border-transparent focus:border-[#b7131a] focus:ring-0 rounded-lg text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#b7131a] transition-colors"
            >
              <span className="material-symbols-outlined">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
            <Link
              href="/auth/recuperar-password"
              className="text-[11px] font-semibold text-[#b7131a] mt-8 hover:underline uppercase tracking-wider"
            >
              Esqueci a palavra-passe
            </Link>
          </div>
        </div>

        {/* Lembrar */}
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 text-[#b7131a] bg-gray-50 border-transparent rounded focus:ring-0"
          />
          <label htmlFor="remember" className="ml-3 text-sm text-gray-500 font-medium cursor-pointer">
            Lembrar de mim
          </label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#b7131a] hover:bg-[#db322f] text-white font-bold py-4 rounded-lg shadow-lg shadow-red-500/20 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>A entrar...</span>
              </>
            ) : (
              <>
                <span>Entrar no Painel</span>
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </div>
      </form>

      <footer className="mt-12 pt-8 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500 mb-2">Ainda não é um hospital parceiro?</p>
        <Link
          href="/auth/register"
          className="inline-flex items-center gap-2 text-[#b7131a] font-bold hover:text-[#db322f] transition-colors"
        >
          Registar Instituição
          <span className="material-symbols-outlined text-sm">corporate_fare</span>
        </Link>
      </footer>
    </div>
  )
}
