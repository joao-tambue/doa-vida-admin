import Link from "next/link";
import type { ApiRequest } from "@/lib/api/queries";

interface Props {
  requests: ApiRequest[];
}

function urgencyLabel(urgency: string): string {
  return urgency === "high" ? "Urgente" : "Pendente";
}

function urgencyClass(urgency: string): string {
  return urgency === "high"
    ? "bg-[#ffdad6] text-[#93000a]"
    : "bg-gray-100 text-gray-600";
}

function statusLabel(status: string): string {
  if (status === "completed") return "Concluído";
  if (status === "pending" || status === "approved") return "Em curso";
  if (status === "in_progress") return "Em preparação";
  return "Em curso";
}

function statusClass(status: string): { dot: string; text: string } {
  if (status === "completed") return { dot: "bg-[#006578]", text: "text-[#006578]" };
  if (status === "expired" || status === "cancelled" || status === "rejected")
    return { dot: "bg-gray-400", text: "text-gray-500" };
  return { dot: "bg-[#b7131a]", text: "text-gray-500" };
}

function ProgressBar({ filled, total }: { filled: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((filled / total) * 100);
  const isComplete = filled >= total;
  return (
    <div>
      <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isComplete ? "bg-[#006578]" : filled === 0 ? "bg-gray-400" : "bg-[#b7131a]"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-gray-400 mt-1 block">
        {isComplete
          ? "Todas as unidades preenchidas"
          : `${filled} de ${total} unidades preenchidas`}
      </span>
    </div>
  );
}

export default function RecentRequests({ requests }: Props) {
  const recent = requests.slice(0, 5);

  return (
    <section className="mt-10">
      <div className="flex justify-between items-end mb-6">
        <h4 className="text-2xl font-black tracking-tight text-gray-900">
          Pedidos Ativos Recentes
        </h4>
        <Link
          href="/dashboard/pedidos-ativos"
          className="text-sm font-bold text-[#b7131a] flex items-center gap-1 hover:gap-2 transition-all"
        >
          Ver Toda a Atividade
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        {recent.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">Sem pedidos ativos.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                {["Paciente/ID do Caso", "Tipo de Sangue", "Urgência", "Progresso", "Estado", "Acções"].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400"
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recent.map((req) => {
                const sc = statusClass(req.status);
                return (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="font-bold text-sm text-gray-900">
                        Caso #{req.case_id}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{req.province}</div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-full bg-gray-100 font-black text-xs text-gray-700">
                        {req.blood_type}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${urgencyClass(req.urgency)}`}>
                        {urgencyLabel(req.urgency)}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <ProgressBar filled={req.bags_fulfilled} total={req.bags_quantity} />
                    </td>
                    <td className="px-8 py-5">
                      <span className={`flex items-center gap-2 text-xs font-bold ${sc.text}`}>
                        <span className={`w-2 h-2 rounded-full ${sc.dot}`} />
                        {statusLabel(req.status)}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <button className="text-[#b7131a] hover:text-[#db322f] transition-colors">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
