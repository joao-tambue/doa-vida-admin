import { metrics } from "@/data/history";


export default function HistoryMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div
          key={m.label}
          className={`bg-white p-6 rounded-xl ${m.accent ? "border-l-4 border-[#b7131a]" : "border border-gray-100"}`}
        >
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 block">
            {m.label}
          </span>
          <p className={`text-3xl font-black ${m.accent ? "text-[#b7131a]" : "text-gray-900"}`}>
            {m.value}
            {m.unit && (
              <span className="text-sm font-medium text-zinc-400 ml-1">
                {m.unit}
              </span>
            )}
          </p>
          <div className={`mt-2 flex items-center gap-1 text-xs font-bold ${m.trendColor}`}>
            <span className="material-symbols-outlined text-sm">{m.trendIcon}</span>
            <span>{m.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
