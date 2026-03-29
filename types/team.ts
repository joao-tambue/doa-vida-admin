export type UserRole = "Admin. Hospitalar" | "Equipa Médica";

export interface TeamMember {
  initials: string;
  avatarBg: string;
  avatarText: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  lastActivity: string;
}