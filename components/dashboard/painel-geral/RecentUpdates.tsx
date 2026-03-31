import type { ApiNotification } from "@/lib/api/queries";

interface Props {
  notifications: ApiNotification[];
}

const TYPE_STYLE: Record<string, { icon: string; iconBg: string; iconColor: string }> = {
  stock_critico: { icon: "warning", iconBg: "bg-[#ffdad6]", iconColor: "text-[#ba1a1a]" },
  pedido_novo: { icon: "campaign", iconBg: "bg-[#ffdad6]", iconColor: "text-[#ba1a1a]" },
  pedido_atualizado: { icon: "update", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  sistema: { icon: "info", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  stock_atualizado: { icon: "check_circle", iconBg: "bg-green-100", iconColor: "text-green-600" },
};

const DEFAULT_STYLE = { icon: "notifications", iconBg: "bg-gray-100", iconColor: "text-gray-500" };

function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `Há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours}h`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Ontem" : `Há ${days} dias`;
}

export default function RecentUpdates({ notifications }: Props) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-xl font-bold text-gray-900">Actualizações Recentes</h4>
        <button className="text-xs font-bold text-[#b7131a] hover:underline uppercase tracking-widest">
          Marcar Todas como Lidas
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">Sem notificações.</p>
      ) : (
        <div className="space-y-6">
          {notifications.map((n) => {
            const style = TYPE_STYLE[n.type] ?? DEFAULT_STYLE;
            return (
              <div key={n.id} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${style.iconBg}`}>
                  <span className={`material-symbols-outlined text-sm ${style.iconColor}`}>
                    {style.icon}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{n.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {relativeTime(n.created_at)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
