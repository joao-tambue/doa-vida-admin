import { MEMBERS } from "@/data/members";
import { ROLE_CONFIG } from "@/constants/roleConfig";

export default function UserManagement() {
  return (
    <section className="col-span-12 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#b7131a]">
            group
          </span>
          <h3 className="text-xl font-bold text-gray-900">
            Gestão de Utilizadores
          </h3>
        </div>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-sm">person_add</span>
          Adicionar Membro da Equipa
        </button>
      </div>
 
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50">
              {[
                "Membro da Equipa",
                "Função",
                "Departamento",
                "Última Atividade",
                "Ações",
              ].map((col) => (
                <th
                  key={col}
                  className={`px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest ${
                    col === "Ações" ? "text-right" : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MEMBERS.map((m) => (
              <tr key={m.email} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${m.avatarBg} ${m.avatarText}`}
                    >
                      {m.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {m.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase ${ROLE_CONFIG[m.role]}`}
                  >
                    {m.role}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-sm font-medium text-gray-500">
                    {m.department}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-gray-400">
                  {m.lastActivity}
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-gray-400 hover:text-[#b7131a] transition-colors">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
