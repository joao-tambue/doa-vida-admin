import { LEVEL_CONFIG } from "@/constants/bloodLevelConfig";
import type { StockLevel } from "@/types/blood";
import type { ApiBloodStock } from "@/lib/api/queries";

interface Props {
  bloodStock: ApiBloodStock[];
}

function apiLevelToStockLevel(level: ApiBloodStock["level"]): StockLevel {
  if (level === "critico") return "Crítico";
  if (level === "baixo") return "Baixo";
  return "Normal";
}

export default function BloodTypeCards({ bloodStock }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {bloodStock.map((item) => {
        const level = apiLevelToStockLevel(item.level);
        const cfg = LEVEL_CONFIG[level];
        const pct = item.goal > 0 ? Math.round((item.units_available / item.goal) * 100) : 0;
        const isCritical = level === "Crítico";

        return (
          <div
            key={item.blood_type}
            className={`bg-white p-6 rounded-xl relative overflow-hidden border border-gray-100 shadow-sm
              ${isCritical ? "border-l-4 border-l-[#b7131a]" : ""}
            `}
            style={isCritical ? { animation: "pulse-bg 2s infinite" } : undefined}
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-3xl font-black text-gray-900 tracking-tighter">
                {item.blood_type}
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.badge}`}>
                {level}
              </span>
            </div>

            <div className="mb-2">
              <div className="flex justify-between items-end mb-1">
                <span className={`text-4xl font-extrabold ${cfg.text || "text-gray-900"}`}>
                  {item.units_available}
                </span>
                <span className={`text-xs font-semibold ${cfg.text || "text-gray-400"}`}>
                  Unidades
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${cfg.bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {isCritical ? (
              <p className="text-[10px] font-bold text-[#ba1a1a] uppercase">
                Necessita Reposição Imediata
              </p>
            ) : (
              <p className="text-[10px] font-medium text-gray-400">
                Objetivo: {item.goal} Unidades
              </p>
            )}
          </div>
        );
      })}

      <style>{`
        @keyframes pulse-bg {
          0%   { background-color: rgba(186, 26, 26, 0.05); }
          50%  { background-color: rgba(186, 26, 26, 0.15); }
          100% { background-color: rgba(186, 26, 26, 0.05); }
        }
      `}</style>
    </div>
  );
}
