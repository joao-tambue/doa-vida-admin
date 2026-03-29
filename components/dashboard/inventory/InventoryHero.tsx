export default function InventoryHero() {
  return (
    <div className="flex justify-between items-end mb-10">
      <div>
        <span className="text-[10px] font-bold text-[#b7131a] uppercase tracking-widest mb-1 block">
          Monitor de Inventário em Tempo Real
        </span>
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Inventário de Sangue
        </h2>
      </div>
      <div className="flex gap-3">
        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors">
          <span className="material-symbols-outlined text-lg">upload_file</span>
          Exportar Relatório
        </button>
        <button className="px-6 py-3 bg-[#b7131a] text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#db322f] transition-all">
          <span className="material-symbols-outlined text-lg">add</span>
          Registar Novas Unidades
        </button>
      </div>
    </div>
  );
}
