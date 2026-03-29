import { UNITS } from "@/data/stockUnits";
import { STATUS_CONFIG } from "@/constants/stockStatusConfig";

const TABLE_COLUMNS = [
  "ID da Unidade",
  "Tipo",
  "Estado",
  "Validade",
  "Volume",
];


export default function StockActivityTable() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">
          Atividade Recente de Stock
        </h3>
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
              {["ID da Unidade", "Tipo", "Estado", "Validade", "Volume"].map(
                (col) => (
                  <th
                    key={col}
                    className={`px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest ${
                      col === "Volume" ? "text-right" : ""
                    }`}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {UNITS.map((unit) => {
              const statusCfg = STATUS_CONFIG[unit.status];
              return (
                <tr
                  key={unit.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-8 py-4">
                    <p className="text-sm font-bold text-gray-900">{unit.id}</p>
                    <p className="text-[10px] text-gray-400">
                      {unit.registeredAgo}
                    </p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-black text-gray-700">
                      {unit.bloodType}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-semibold ${statusCfg.text}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`}
                      />
                      {unit.status}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <p
                      className={`text-sm font-medium ${unit.expirySoon ? "text-[#ba1a1a]" : "text-gray-900"}`}
                    >
                      {unit.expiryDate}
                    </p>
                    <p
                      className={`text-[10px] ${unit.expirySoon ? "text-[#ba1a1a] font-bold uppercase" : "text-gray-400"}`}
                    >
                      {unit.expiryNote}
                    </p>
                  </td>
                  <td className="px-8 py-4 text-right font-bold text-sm text-gray-900">
                    {unit.volume}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
