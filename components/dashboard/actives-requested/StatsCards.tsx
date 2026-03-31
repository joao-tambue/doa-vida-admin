interface StatCard {
  label: string;
  value: string;
  valueColor: string;
  iconBg: string;
  iconColor: string;
  icon: string;
  borderAccent?: string;
  pulse?: boolean;
}

const stats: StatCard[] = [
  {
    label: "Stock Crítico",
    value: "O Negativo",
    valueColor: "text-[#b7131a]",
    iconBg: "bg-red-100",
    iconColor: "text-red-800",
    icon: "warning",
    borderAccent: "border-l-4 border-[#b7131a]",
    pulse: true,
  },
  {
    label: "Total Ativos",
    value: "24 Pedidos",
    valueColor: "text-gray-900",
    iconBg: "bg-gray-200",
    iconColor: "text-gray-600",
    icon: "pending",
  },
  // {
  //   label: "Concluídos Hoje",
  //   value: "12 Unidades",
  //   valueColor: "text-[#006578]",
  //   iconBg: "bg-[#008097]",
  //   iconColor: "text-white",
  //   icon: "check_circle",
  // },
];

export default function StatsCards() {
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
            <h3 className={`text-2xl font-black ${stat.valueColor}`}>
              {stat.value}
            </h3>
          </div>
          <div
            className={`p-3 rounded-full ${stat.iconBg} ${stat.pulse ? "animate-pulse" : ""}`}
          >
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
