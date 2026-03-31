import InstitutionalProfile from "@/components/dashboard/settings/InstitutionalProfile";
import SettingsFooter from "@/components/dashboard/settings/SettingsFooter";
import SettingsHero from "@/components/dashboard/settings/SettingsHero";
import SettingsSidePanels from "@/components/dashboard/settings/SettingsSidePanels/SettingsSidePanels";
import UserManagement from "@/components/dashboard/settings/UserManagement";
import type { Metadata } from "next";
import { fetchUsers, fetchAlertPreferences } from "@/lib/api/queries";

export const metadata: Metadata = {
  title: "Configurações | DoaVida",
};

export default async function ConfiguracoesPage() {
  const [users, alertPreferences] = await Promise.all([
    fetchUsers(),
    fetchAlertPreferences(),
  ]);

  return (
    <div className="px-2 max-w-7xl mx-auto">
      <SettingsHero />

      <div className="grid grid-cols-12 gap-8">
        <InstitutionalProfile />
        <SettingsSidePanels alertPreferences={alertPreferences} />
        <UserManagement users={users} />
      </div>
      <SettingsFooter />
    </div>
  );
}
