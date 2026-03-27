import { CHART_BARS } from "@/constants/history.constants";


export default function HistoryAnalysis() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
      {/* Chart Card */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="font-extrabold text-gray-900">
              Monthly Fulfillment Trend
            </h4>
            <p className="text-xs text-zinc-400 font-medium">
              Efficiency tracking over current fiscal year
            </p>
          </div>
          <span className="material-symbols-outlined text-zinc-300">
            insights
          </span>
        </div>

        {/* Bar Chart */}
        <div className="h-48 w-full bg-zinc-50 rounded-lg flex items-end justify-between px-6 pb-4">
          {CHART_BARS.map((bar) => (
            <div
              key={bar.month}
              style={{ height: bar.height }}
              className={`w-8 rounded-t-sm transition-all ${
                bar.highlight
                  ? "bg-[#db322f]"
                  : bar.active
                    ? "bg-[#b7131a]"
                    : "bg-zinc-200"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          {CHART_BARS.map((bar) => (
            <span
              key={bar.month}
              className={bar.highlight ? "text-[#b7131a]" : ""}
            >
              {bar.month}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-[#b7131a] text-white p-8 rounded-xl relative overflow-hidden group">
        <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">
          <span
            className="material-symbols-outlined text-[200px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </span>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
              Community Impact
            </span>
            <h4 className="text-3xl font-black mt-6 mb-2">
              Help save even more lives today.
            </h4>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Our data shows that O- Negative inventory is down by 15% this
              week. Consider prioritizing these requests in the next cycle.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <button className="bg-white text-[#b7131a] px-6 py-3 rounded-xl font-bold text-sm active:scale-95 transition-all hover:shadow-lg">
              View Stock Needs
            </button>
            <button className="text-white border border-white/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 active:scale-95 transition-all">
              Share Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
