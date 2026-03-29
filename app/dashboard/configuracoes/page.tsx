import InstitutionalProfile from "@/components/dashboard/settings/InstitutionalProfile";
import SettingsFooter from "@/components/dashboard/settings/SettingsFooter";
import SettingsHero from "@/components/dashboard/settings/SettingsHero";
import SettingsSidePanels from "@/components/dashboard/settings/SettingsSidePanels/SettingsSidePanels";
import UserManagement from "@/components/dashboard/settings/UserManagement";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurações | DoaVida",
};

export default function ConfiguracoesPage() {
  return (
    <div className="px-2 max-w-7xl mx-auto">
      <SettingsHero />

      <div className="grid grid-cols-12 gap-8">
        <InstitutionalProfile />
        <SettingsSidePanels />
        <UserManagement />
        <SettingsFooter />
      </div>
    </div>
  );
}
