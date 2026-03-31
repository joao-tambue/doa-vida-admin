import type { ApiBloodUnit } from "@/lib/api/queries";

interface Props {
  units: ApiBloodUnit[];
}

const STATUS_STYLE = {
  available: { dot: "bg-[#006578]", text: "text-[#006578]", label: "Disponível" },
  used: { dot: "bg-gray-400", text: "text-gray-400", label: "Utilizada" },
};

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("pt-AO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function expiryNote(isoDate: string): { note: string; soon: boolean } {
  const diff = new Date(isoDate).getTime() - Date.now();
  const days = Math.floor(diff / 86_400_000);
  if (days < 0) return { note: "Arquivado", soon: false };
  if (days === 0) return { note: "Expira Hoje", soon: true };
  if (days === 1) return { note: "Expira Amanhã", soon: true };
  if (days <= 7) return { note: `${days} dias restantes`, soon: true };
  return { note: `${days} dias restantes`, soon: false };
}

function registeredAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Registo há poucos min";
  if (hours < 24) return `Registo há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Registo há ${days}d`;
}

export default function StockActivityTable({ units }: Props) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Atividade Recente de Stock</h3>
        <div className="flex gap-2">
          <button className="text-xs font-bold text-[#b7131a] px-3 py-1 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
            Filtrar
          </button>
          <button className="text-xs font-bold text-gray-500 px-3 py-1 hover:bg-gray-50 rounded-lg transition-colors">
            Ver Tudo
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50">
            <tr>
              {["ID da Unidade", "Tipo", "Estado", "Validade", "Volume"].map((col) => (
                <th
                  key={col}
                  className={`px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest ${
                    col === "Volume" ? "text-right" : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {units.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-10 text-center text-sm text-gray-400">
                  Sem unidades registadas.
                </td>
              </tr>
            ) : (
              units.map((unit) => {
                const statusCfg = STATUS_STYLE[unit.status];
                const expiry = expiryNote(unit.expires_at);
                return (
                  <tr key={unit.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold text-gray-900">#{unit.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-[10px] text-gray-400">{registeredAgo(unit.registered_at)}</p>
                    </td>
                    <td className="px-8 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-black text-gray-700">
                        {unit.blood_type}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-semibold ${statusCfg.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <p className={`text-sm font-medium ${expiry.soon ? "text-[#ba1a1a]" : "text-gray-900"}`}>
                        {formatDate(unit.expires_at)}
                      </p>
                      <p className={`text-[10px] ${expiry.soon ? "text-[#ba1a1a] font-bold uppercase" : "text-gray-400"}`}>
                        {expiry.note}
                      </p>
                    </td>
                    <td className="px-8 py-4 text-right font-bold text-sm text-gray-900">
                      {unit.volume_ml}ml
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
