import { METRICS } from "@/data/metrics";

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {METRICS.map((m) => {
        const isHoverPrimary = m.variant === "hover-primary";
        const isAccentLeft = m.variant === "accent-left";
        const isHoverTertiary = m.variant === "hover-tertiary";

        return (
          <div
            key={m.label}
            className={`bg-white p-8 rounded-2xl flex flex-col justify-between shadow-sm border border-gray-100 transition-all duration-300 group
              ${isHoverPrimary ? "hover:bg-[#b7131a]" : ""}
              ${isAccentLeft ? "border-l-4 border-[#b7131a]" : ""}
              ${isHoverTertiary ? "hover:bg-[#006578]" : ""}
            `}
          >
            <div>
              <span
                className={`text-xs font-bold uppercase tracking-widest block mb-2 transition-colors
                  ${isAccentLeft ? "text-gray-500" : "text-gray-500 group-hover:text-white/70"}
                `}
              >
                {m.label}
              </span>
              <h3
                className={`text-5xl font-black transition-colors
                  ${isAccentLeft ? "text-gray-900" : "text-gray-900 group-hover:text-white"}
                `}
              >
                {m.value}
              </h3>
            </div>
            <div
              className={`flex items-center gap-2 mt-4 text-xs font-bold transition-colors
                ${isAccentLeft ? "text-[#b7131a]" : ""}
                ${isHoverPrimary ? "text-green-600 group-hover:text-white" : ""}
                ${isHoverTertiary ? "text-[#006578] group-hover:text-white" : ""}
              `}
            >
              <span className="material-symbols-outlined text-sm">
                {m.trendIcon}
              </span>
              <span>{m.trendText}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
