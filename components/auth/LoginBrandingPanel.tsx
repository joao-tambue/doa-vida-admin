export default function LoginBrandingPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#b7131a]/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b7131a]/5 rounded-full -ml-48 -mb-48 pointer-events-none" />

      <div className="relative z-10">
        <span className="text-3xl font-black tracking-tighter text-[#b7131a]">
          DoaVida Health
        </span>

        <div className="mt-24">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
            Logística de Vida,
            <br />
            <span className="text-[#b7131a]">Pulso Clínico.</span>
          </h2>
          <p className="mt-6 text-gray-500 max-w-md text-lg leading-relaxed">
            Gestão inteligente de inventário e rede de doação hospitalar em
            tempo real. A sua eficiência salva vidas.
          </p>
        </div>
      </div>

      <div className="mt-auto relative z-10 bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#b7131a]">
        <div className="flex items-center gap-4 mb-4">
          <span className="material-symbols-outlined text-[#b7131a]">
            clinical_notes
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
            Protocolo de Segurança Ativo
          </span>
        </div>
        <div className="space-y-3">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#b7131a] w-3/4 rounded-full" />
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#b7131a] w-1/2 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
