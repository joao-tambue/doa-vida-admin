import { STOCK_DATA } from "@/constants/painel.constants";


export default function BloodStockWidget() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-xl font-bold text-gray-900">
          Stock Crítico de Sangue
        </h4>
        <span className="text-xs font-bold uppercase tracking-widest text-[#b7131a] bg-[#ffdad6] px-3 py-1 rounded-full">
          Alerta de Inventário
        </span>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between h-48 gap-4 px-4">
        {STOCK_DATA.map((item) => (
          <div key={item.type} className="flex flex-col items-center flex-1 gap-2">
            <div className="w-full bg-gray-100 h-32 rounded-lg relative overflow-hidden">
              <div
                className={`absolute bottom-0 w-full rounded-lg transition-all duration-500 ${
                  item.critical ? "bg-[#ba1a1a] animate-pulse" : "bg-[#b7131a]"
                }`}
                style={{ height: `${item.percentage}%` }}
              />
            </div>
            <span
              className={`text-xs font-bold ${
                item.critical ? "text-[#ba1a1a]" : "text-gray-700"
              }`}
            >
              {item.type}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center gap-4 border border-gray-100">
        <span className="material-symbols-outlined text-[#b7131a] shrink-0">
          warning
        </span>
        <p className="text-sm text-gray-700">
          <strong>Escassez Crítica:</strong> Os stocks de O- e AB- estão abaixo
          do limiar de segurança de 20%. Considere lançar uma emissão de dadores
          de emergência.
        </p>
      </div>
    </div>
  );
}
