import Image from "next/image";

interface Schedule {
  label: string;
  value: string;
}

const SCHEDULES: Schedule[] = [
  { label: "Banco de Sangue",   value: "24/7 (Urgência)" },
  { label: "Centro de Doação",  value: "08:00 - 18:00"   },
  { label: "Administração",     value: "09:00 - 17:00"   },
];

export default function InstitutionalProfile() {
  return (
    <section className="col-span-12 lg:col-span-8 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#b7131a]">
            local_hospital
          </span>
          <h3 className="text-xl font-bold text-gray-900">
            Perfil Institucional
          </h3>
        </div>
        <button className="text-sm font-bold text-[#b7131a] hover:underline">
          Editar Info
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Nome do Hospital
            </label>
            <p className="text-gray-900 font-semibold text-lg">
              Hospital Materno Augusto Ngangula
            </p>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Localização
            </label>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-gray-400 text-sm">
                location_on
              </span>
              <p className="text-gray-500 text-sm leading-relaxed">
                Rua Ndunduma, nº 37, Município de Luanda, Luanda, Angola
              </p>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Detalhes de Contacto
            </label>
            <div className="space-y-1">
              <p className="text-gray-900 font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">call</span>
                +244 923 000 000
              </p>
              <p className="text-gray-900 font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-xs">mail</span>
                hemoterapia@hmaugustongangula.ao
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Horário de Funcionamento
            </label>
            <div className="space-y-2">
              {SCHEDULES.map((s) => (
                <div key={s.label} className="flex justify-between text-sm">
                  <span className="text-gray-400">{s.label}</span>
                  <span className="font-bold text-gray-900">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-32 w-full rounded-xl overflow-hidden relative grayscale hover:grayscale-0 transition-all cursor-pointer">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVW_xFE2b4EbQ40VfmYDSF1jy_S_4vOQLaFiLQxXCB1i8jWq8ihzeD_wvTBq8oq42qtLVnlKQQuDRGFgrMbNKoiTAGqAUUYh8EU-j4IuPz-BiKMyEnM50R1cSaLPsKpSKbNUWQV5k-y2l9FVmQw3_nyRalqG-5db_2GBSv4cH6jvhJ2ZkfUonDwArJmnpEQOEwTcExaSLV8cZz6-WMZRHiQlBhYZ4tfhuzigtSam3BvvNQQM4_XJt1Q6YnGgrwMLn044p7MAP9uwbM"
              alt="Mapa de Localização do Hospital"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Ver no Mapa
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
