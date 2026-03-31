import { AlertPreference } from "@/types/settings";

export const ALERT_PREFERENCES: AlertPreference[] = [
  { label: "Notificação por E-mail", key: "email", defaultChecked: true },
  // { label: "Notificações Push", key: "push", defaultChecked: true },
  // { label: "SMS (Apenas Emergência)", key: "sms", defaultChecked: false },
];