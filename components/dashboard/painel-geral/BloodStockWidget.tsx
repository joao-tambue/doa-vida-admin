import type { ApiBloodStock } from "@/lib/api/queries";

interface Props {
  bloodStock: ApiBloodStock[];
}

export default function BloodStockWidget({ bloodStock }: Props) {
  const stockData = bloodStock.map((item) => ({
    type: item.blood_type,
    percentage: item.goal > 0 ? Math.round((item.units_available / item.goal) * 100) : 0,
    critical: item.level === "critico",
  }));

  const criticalTypes = bloodStock
    .filter((s) => s.level === "critico")
    .map((s) => s.blood_type);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-10">
        <h4 className="text-xl font-bold text-gray-900">Stock Crítico de Sangue</h4>
        <span className="text-xs font-bold uppercase tracking-widest text-[#b7131a] bg-[#ffdad6] px-3 py-1 rounded-full">
          Alerta de Inventário
        </span>
      </div>

      {stockData.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-10">Sem dados de stock.</p>
      ) : (
        <div className="flex items-end justify-between h-48 gap-4 px-4">
          {stockData.map((item) => (
            <div key={item.type} className="flex flex-col items-center flex-1 gap-2">
              <div className="w-full bg-gray-100 h-32 rounded-lg relative overflow-hidden">
                <div
                  className={`absolute bottom-0 w-full rounded-lg transition-all duration-500 ${
                    item.critical ? "bg-[#ba1a1a] animate-pulse" : "bg-[#b7131a]"
                  }`}
                  style={{ height: `${item.percentage}%` }}
                />
              </div>
              <span className={`text-xs font-bold ${item.critical ? "text-[#ba1a1a]" : "text-gray-700"}`}>
                {item.type}
              </span>
            </div>
          ))}
        </div>
      )}

      {criticalTypes.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center gap-4 border border-gray-100">
          <span className="material-symbols-outlined text-[#b7131a] shrink-0">warning</span>
          <p className="text-sm text-gray-700">
            <strong>Escassez Crítica:</strong> Os stocks de{" "}
            {criticalTypes.join(", ")} estão abaixo do limiar de segurança.
            Considere lançar uma emissão de dadores de emergência.
          </p>
        </div>
      )}
    </div>
  );
}
