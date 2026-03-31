"use client";

import { useState } from "react";
import type { ApiAlertPreferences } from "@/lib/api/queries";

interface Props {
  preferences: ApiAlertPreferences | null;
}

const PREF_LABELS: { key: keyof ApiAlertPreferences; label: string }[] = [
  { key: "email_notifications", label: "Notificação por E-mail" },
  { key: "sms_notifications", label: "Notificação por SMS" },
  { key: "critical_stock", label: "Alerta de Stock Crítico" },
  { key: "request_updates", label: "Atualizações de Pedidos" },
  { key: "new_requests", label: "Novos Pedidos" },
];

const DEFAULT_PREFS: ApiAlertPreferences = {
  email_notifications: true,
  sms_notifications: false,
  critical_stock: true,
  request_updates: true,
  new_requests: false,
};

export default function AlertPreferences({ preferences }: Props) {
  const [prefs, setPrefs] = useState<ApiAlertPreferences>(preferences ?? DEFAULT_PREFS);

  const toggle = (key: keyof ApiAlertPreferences) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className="bg-white border-l-4 border-[#b7131a] rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-[#b7131a] animate-pulse">campaign</span>
        <h3 className="text-lg font-bold text-gray-900">Preferências de Alerta</h3>
      </div>

      <p className="text-xs text-gray-400 mb-6">
        Configure como recebe alertas críticos de stock de sangue.
      </p>

      <div className="space-y-4">
        {PREF_LABELS.map(({ key, label }) => (
          <label key={key} className="flex items-center justify-between cursor-pointer">
            <span className="text-sm font-medium text-gray-900">{label}</span>
            <input
              type="checkbox"
              checked={prefs[key]}
              onChange={() => toggle(key)}
              className="w-4 h-4 text-[#b7131a] border-gray-300 rounded focus:ring-[#b7131a]"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
