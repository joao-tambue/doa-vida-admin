import { BLOOD_STOCK } from "@/data/bloodStock";
import { LEVEL_CONFIG } from "@/constants/bloodLevelConfig";

export default function BloodTypeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {BLOOD_STOCK.map((item) => {
        const cfg = LEVEL_CONFIG[item.level];
        const pct = Math.round((item.units / item.goal) * 100);
        const isCritical = item.level === "Crítico";

        return (
          <div
            key={item.type}
            className={`bg-white p-6 rounded-xl relative overflow-hidden border border-gray-100 shadow-sm
              ${isCritical ? "border-l-4 border-l-[#b7131a]" : ""}
            `}
            style={
              isCritical
                ? { animation: "pulse-bg 2s infinite" }
                : undefined
            }
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-3xl font-black text-gray-900 tracking-tighter">
                {item.type}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${cfg.badge}`}
              >
                {item.level}
              </span>
            </div>

            <div className="mb-2">
              <div className="flex justify-between items-end mb-1">
                <span
                  className={`text-4xl font-extrabold ${cfg.text || "text-gray-900"}`}
                >
                  {item.units}
                </span>
                <span
                  className={`text-xs font-semibold ${cfg.text || "text-gray-400"}`}
                >
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
