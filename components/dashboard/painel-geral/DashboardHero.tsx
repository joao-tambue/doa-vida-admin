export default function DashboardHero() {
  return (
    <header className="mb-10 flex justify-between items-end">
      <div>
        <h2 className="text-4xl font-black tracking-tight text-gray-900">
          Visão Geral do Painel
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Bem-vindo de volta, Dr. Silva. Aqui está o pulso clínico para hoje.
        </p>
      </div>
      <div className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 border border-gray-100 shadow-sm">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
          Sistema Online
        </span>
      </div>
    </header>
  );
}
