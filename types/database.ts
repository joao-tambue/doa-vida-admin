export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export type UserRole =
  | "admin"
  | "medico"
  | "enfermeiro"
  | "laboratorista"
  | "gestor";

export type RequestStatus =
  | "pendente"
  | "aprovado"
  | "em_preparacao"
  | "em_transporte"
  | "concluido"
  | "cancelado"
  | "rejeitado";

export type UrgencyLevel = "normal" | "critico";

export type NotificationType =
  | "pedido_novo"
  | "pedido_atualizado"
  | "stock_critico"
  | "stock_atualizado"
  | "sistema";

export type StockReason =
  | "receção"
  | "pedido_atendido"
  | "descarte"
  | "ajuste"
  | "doação";

export interface Database {
  public: {
    Tables: {
      institutions: {
        Row: {
          id: string;
          name: string;
          short_name: string | null;
          address: string | null;
          province: string | null;
          email: string | null;
          phone: string | null;
          logo_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["institutions"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<Database["public"]["Tables"]["institutions"]["Insert"]>;
      };

      admin_profiles: {
        Row: {
          id: string;
          institution_id: string | null;
          full_name: string;
          professional_id: string | null;
          phone: string | null;
          role: UserRole;
          cert_file_url: string | null;
          is_approved: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["admin_profiles"]["Row"],
          "created_at" | "updated_at"
        >;
        Update: Partial<
          Database["public"]["Tables"]["admin_profiles"]["Insert"]
        >;
      };

      blood_inventory: {
        Row: {
          id: string;
          institution_id: string;
          blood_type: BloodType;
          units_available: number;
          min_threshold: number;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["blood_inventory"]["Row"],
          "id" | "updated_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["blood_inventory"]["Insert"]
        >;
      };

      stock_activity: {
        Row: {
          id: string;
          institution_id: string;
          blood_type: BloodType;
          change_amount: number;
          reason: StockReason;
          request_id: string | null;
          performed_by: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["stock_activity"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["stock_activity"]["Insert"]
        >;
      };

      admin_blood_requests: {
        Row: {
          id: string;
          institution_id: string;
          requested_by: string;
          patient_name: string;
          diagnosis: string;
          blood_type: BloodType;
          units_requested: number;
          urgency: UrgencyLevel;
          contact_person: string | null;
          contact_phone: string | null;
          clinical_notes: string | null;
          medical_records_url: string | null;
          status: RequestStatus;
          approved_by: string | null;
          approved_at: string | null;
          completed_at: string | null;
          rejection_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["admin_blood_requests"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["admin_blood_requests"]["Insert"]
        >;
      };

      admin_notifications: {
        Row: {
          id: string;
          user_id: string;
          type: NotificationType;
          title: string;
          message: string;
          request_id: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["admin_notifications"]["Row"],
          "id" | "created_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["admin_notifications"]["Insert"]
        >;
      };

      admin_alert_preferences: {
        Row: {
          id: string;
          user_id: string;
          critical_stock: boolean;
          request_updates: boolean;
          new_requests: boolean;
          email_notifications: boolean;
          sms_notifications: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["admin_alert_preferences"]["Row"],
          "id" | "created_at" | "updated_at"
        > & { id?: string };
        Update: Partial<
          Database["public"]["Tables"]["admin_alert_preferences"]["Insert"]
        >;
      };
    };

    Functions: {
      // ⚠️ essas funções continuam apontando para "profiles" original
      my_institution_id: { Returns: string };
      my_role: { Returns: UserRole };
    };
  };
}
