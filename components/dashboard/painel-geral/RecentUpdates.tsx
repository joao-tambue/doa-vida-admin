import { NOTIFICATIONS } from "@/data/notifications";


export default function RecentUpdates() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-gray-900">
          Actualizações Recentes
        </h4>
        <button className="text-xs font-bold text-[#b7131a] hover:underline uppercase tracking-widest">
          Marcar Todas como Lidas
        </button>
      </div>

      {/* Lista de notificações */}
      <div className="space-y-6">
        {NOTIFICATIONS.map((n) => (
          <div key={n.title} className="flex gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.iconBg}`}
            >
              <span
                className={`material-symbols-outlined text-sm ${n.iconColor}`}
              >
                {n.icon}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{n.title}</p>
              <p className="text-xs text-gray-500 mt-1">{n.description}</p>
              <span className="text-[10px] text-gray-400 mt-1 block">
                {n.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
