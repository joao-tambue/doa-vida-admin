"use client";


export default function SecurityPanel() {

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-[#b7131a]">
          shield
        </span>
        <h3 className="text-lg font-bold text-gray-900">Segurança</h3>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors group">
          <span className="text-sm font-semibold text-gray-500">
            Alterar Palavra-passe
          </span>
          <span className="material-symbols-outlined text-gray-400 group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </button>
      </div>
    </section>
  );
}