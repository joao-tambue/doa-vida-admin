"use client";

import { useBloodRequest, type BloodType } from "@/context/Bloodrequestcontext";

const BLOOD_TYPES: BloodType[] = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];

export default function RequestLogisticsSection() {
  const { form, update, isPending } = useBloodRequest();

  return (
    <section className="bg-surface-container-lowest p-8 rounded-xl space-y-8">
      <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
        <h3 className="text-xl font-bold">Logística do Pedido</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tipo Sanguíneo */}
        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Tipo Sanguíneo
          </label>
          <div className="grid grid-cols-4 gap-2">
            {BLOOD_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => update("bloodType", type)}
                disabled={isPending}
                className={`py-2 text-xs font-bold border border-outline-variant/30 rounded-lg transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                  form.bloodType === type
                    ? "bg-primary text-on-primary"
                    : "hover:bg-primary hover:text-on-primary"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Unidades Necessárias */}
        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Unidades Necessárias
          </label>
          <div className="flex items-center bg-surface rounded-lg p-2">
            <button
              type="button"
              onClick={() => update("units", Math.max(1, form.units - 1))}
              disabled={isPending}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-60"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
            <input
              type="number"
              min={1}
              value={form.units}
              onChange={(e) =>
                update("units", Math.max(1, Number(e.target.value)))
              }
              disabled={isPending}
              className="w-full bg-transparent border-none text-center font-bold focus:ring-0 text-sm disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => update("units", form.units + 1)}
              disabled={isPending}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-60"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        {/* Nível de Urgência */}
        <div className="space-y-2">
          <label className="text-[0.6875rem] font-bold tracking-[0.05em] uppercase text-secondary block">
            Nível de Urgência
          </label>
          <div className="flex flex-col gap-2">
            <label
              className={`flex items-center gap-3 p-3 bg-surface rounded-lg cursor-pointer hover:bg-surface-container-high transition-all ${
                form.urgency === "normal" ? "ring-2 ring-primary" : ""
              }`}
            >
              <input
                type="radio"
                name="urgency"
                checked={form.urgency === "normal"}
                onChange={() => update("urgency", "normal")}
                disabled={isPending}
                className="text-primary focus:ring-primary accent-primary"
              />
              <span className="text-xs font-bold">Normal</span>
            </label>

            <label
              className={`flex items-center gap-3 p-3 bg-error-container/20 border border-error/10 rounded-lg cursor-pointer hover:bg-error-container/30 transition-all ${
                form.urgency === "critico" ? "ring-2 ring-error" : ""
              }`}
            >
              <input
                type="radio"
                name="urgency"
                checked={form.urgency === "critico"}
                onChange={() => update("urgency", "critico")}
                disabled={isPending}
                className="text-error focus:ring-error accent-error"
              />
              <span className="text-xs font-bold text-on-error-container">
                Crítico (Triagem)
              </span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
