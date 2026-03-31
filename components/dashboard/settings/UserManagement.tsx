import type { ApiUser } from "@/lib/api/queries";

interface Props {
  users: ApiUser[];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const ROLE_STYLE: Record<string, string> = {
  admin: "bg-[#ffdad6] text-[#93000d]",
  medico: "bg-blue-100 text-blue-800",
  enfermeiro: "bg-green-100 text-green-800",
  laboratorista: "bg-purple-100 text-purple-800",
  gestor: "bg-amber-100 text-amber-800",
};

const ROLE_LABEL: Record<string, string> = {
  admin: "Admin",
  medico: "Médico",
  enfermeiro: "Enfermeiro",
  laboratorista: "Laboratorista",
  gestor: "Gestor",
};

const AVATAR_COLORS = [
  "bg-gray-200 text-gray-600",
  "bg-[#afecff] text-[#004e5d]",
  "bg-[#e4beb9] text-[#93000d]",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
];

function relativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 2) return "Agora";
  if (minutes < 60) return `Há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours}h`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Há 1 dia" : `Há ${days} dias`;
}

export default function UserManagement({ users }: Props) {
  return (
    <section className="col-span-12 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#b7131a]">group</span>
          <h3 className="text-xl font-bold text-gray-900">Gestão de Utilizadores</h3>
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
              {["Membro da Equipa", "Função", "Departamento", "Última Atividade", "Ações"].map((col) => (
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
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-400">
                  Sem membros registados.
                </td>
              </tr>
            ) : (
              users.map((u, idx) => {
                const avatarClass = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                const roleStyle = ROLE_STYLE[u.role] ?? "bg-gray-100 text-gray-600";
                const roleLabel = ROLE_LABEL[u.role] ?? u.role;
                return (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${avatarClass}`}>
                          {getInitials(u.full_name)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{u.full_name}</p>
                          <p className="text-[10px] text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase ${roleStyle}`}>
                        {roleLabel}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-medium text-gray-500">{u.department}</span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-400">
                      {relativeTime(u.last_activity_at)}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-gray-400 hover:text-[#b7131a] transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
