import { cookies } from "next/headers";
import { apiGet } from "./client";

async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("access_token")?.value;
}

// ─── Metrics ─────────────────────────────────────────────────────────────────
export interface ApiMetrics {
  total_donors: number;
  active_requests: number;
  fulfillment_rate: number;
  avg_delivery_time_hours: number;
}

export async function fetchMetrics(): Promise<ApiMetrics | null> {
  try {
    return await apiGet<ApiMetrics>("/api/metrics", await getToken());
  } catch {
    return null;
  }
}

// ─── Blood Stock ──────────────────────────────────────────────────────────────
export interface ApiBloodStock {
  blood_type: string;
  units_available: number;
  goal: number;
  level: "normal" | "baixo" | "critico";
}

export async function fetchBloodStock(): Promise<ApiBloodStock[]> {
  try {
    return await apiGet<ApiBloodStock[]>("/api/blood-stock", await getToken());
  } catch {
    return [];
  }
}

// ─── Blood Units ─────────────────────────────────────────────────────────────
export interface ApiBloodUnit {
  id: string;
  blood_type: string;
  status: "available" | "used";
  volume_ml: number;
  expires_at: string;
  registered_at: string;
}

export async function fetchBloodUnits(): Promise<ApiBloodUnit[]> {
  try {
    return await apiGet<ApiBloodUnit[]>("/api/blood-stock/units", await getToken());
  } catch {
    return [];
  }
}

// ─── Notifications ────────────────────────────────────────────────────────────
export interface ApiNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export async function fetchNotifications(): Promise<ApiNotification[]> {
  try {
    return await apiGet<ApiNotification[]>("/api/notifications", await getToken());
  } catch {
    return [];
  }
}

// ─── Requests ─────────────────────────────────────────────────────────────────
export interface ApiRequest {
  id: string;
  case_id: string;
  patient_name: string;
  blood_type: string;
  bags_quantity: number;
  bags_fulfilled: number;
  province: string;
  contact_phone: string;
  description: string;
  urgency: "high" | "normal";
  status:
    | "pending"
    | "approved"
    | "rejected"
    | "in_progress"
    | "completed"
    | "expired"
    | "cancelled";
  is_public: boolean;
  approved: boolean;
  created_at: string;
  updated_at: string;
}

export async function fetchRequests(status?: string): Promise<ApiRequest[]> {
  try {
    const path = status
      ? `/api/admin/requests?status=${status}`
      : "/api/admin/requests";
    return await apiGet<ApiRequest[]>(path, await getToken());
  } catch {
    return [];
  }
}

export async function fetchRequestHistory(): Promise<ApiRequest[]> {
  try {
    return await apiGet<ApiRequest[]>(
      "/api/admin/requests/history",
      await getToken(),
    );
  } catch {
    return [];
  }
}

// ─── Users ────────────────────────────────────────────────────────────────────
export interface ApiUser {
  id: string;
  full_name: string;
  email: string;
  role: string;
  department: string;
  last_activity_at: string;
}

export async function fetchUsers(): Promise<ApiUser[]> {
  try {
    return await apiGet<ApiUser[]>("/api/admin/users", await getToken());
  } catch {
    return [];
  }
}

// ─── Alert Preferences ────────────────────────────────────────────────────────
export interface ApiAlertPreferences {
  email_notifications: boolean;
  sms_notifications: boolean;
  critical_stock: boolean;
  request_updates: boolean;
  new_requests: boolean;
}

export async function fetchAlertPreferences(): Promise<ApiAlertPreferences | null> {
  try {
    return await apiGet<ApiAlertPreferences>(
      "/api/settings/alert-preferences",
      await getToken(),
    );
  } catch {
    return null;
  }
}
