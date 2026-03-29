"use client";

import { useState } from "react";
import { ALERT_PREFERENCES } from "@/data/alertPreferences";

export default function AlertPreferences() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(
      ALERT_PREFERENCES.map((p) => [p.key, p.defaultChecked])
    )
  );

  const toggle = (key: string) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <section className="bg-white border-l-4 border-[#b7131a] rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-[#b7131a] animate-pulse">
          campaign
        </span>
        <h3 className="text-lg font-bold text-gray-900">
          Preferências de Alerta
        </h3>
      </div>

      <p className="text-xs text-gray-400 mb-6">
        Configure como recebe alertas críticos de stock de sangue.
      </p>

      <div className="space-y-4">
        {ALERT_PREFERENCES.map((pref) => (
          <label
            key={pref.key}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="text-sm font-medium text-gray-900">
              {pref.label}
            </span>
            <input
              type="checkbox"
              checked={prefs[pref.key]}
              onChange={() => toggle(pref.key)}
              className="w-4 h-4 text-[#b7131a] border-gray-300 rounded focus:ring-[#b7131a]"
            />
          </label>
        ))}
      </div>
    </section>
  );
}