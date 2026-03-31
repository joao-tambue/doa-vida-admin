import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import type { UserRole } from "@/types/database";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("full_name, role, institution_id, institutions(name)")
    .eq("id", user.id)
    .returns<{
      full_name: string;
      role: UserRole;
      institution_id: string | null;
      institutions: { name: string } | null;
    }>()
    .single();

  const fullName = profile?.full_name ?? "Utilizador";
  const role = (profile?.role ?? "enfermeiro") as UserRole;
  const email = user.email ?? "";
  const institutionName = profile?.institutions?.name ?? "Hospital";

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role={role} institutionName={institutionName} />
      <div className="ml-64">
        <Header fullName={fullName} email={email} role={role} />
        <main className="pt-16">{children}</main>
      </div>
    </div>
  );
}
