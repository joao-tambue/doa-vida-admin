import type { ApiMetrics, ApiBloodStock } from "@/lib/api/queries";

interface Props {
  metrics: ApiMetrics | null;
  bloodStock: ApiBloodStock[];
}

export default function StatsCards({ metrics, bloodStock }: Props) {
  const criticalType = bloodStock.find((s) => s.level === "critico");
  const activeCount = metrics ? metrics.active_requests : 0;

  const stats = [
    {
      label: "Stock Crítico",
      value: criticalType ? criticalType.blood_type : "—",
      valueColor: criticalType ? "text-[#b7131a]" : "text-gray-400",
      iconBg: "bg-red-100",
      iconColor: "text-red-800",
      icon: "warning",
      borderAccent: "border-l-4 border-[#b7131a]",
      pulse: !!criticalType,
    },
    {
      label: "Total Ativos",
      value: `${activeCount} Pedidos`,
      valueColor: "text-gray-900",
      iconBg: "bg-gray-200",
      iconColor: "text-gray-600",
      icon: "pending",
      borderAccent: undefined,
      pulse: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 ${stat.borderAccent ?? ""}`}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
              {stat.label}
            </p>
            <h3 className={`text-2xl font-black ${stat.valueColor}`}>{stat.value}</h3>
          </div>
          <div className={`p-3 rounded-full ${stat.iconBg} ${stat.pulse ? "animate-pulse" : ""}`}>
            <span
              className={`material-symbols-outlined ${stat.iconColor}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {stat.icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
