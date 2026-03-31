import SecurityPanel from "./SecurityPanel";
import AlertPreferences from "./AlertPreferences";
import type { ApiAlertPreferences } from "@/lib/api/queries";

interface Props {
  alertPreferences: ApiAlertPreferences | null;
}

export default function SettingsSidePanels({ alertPreferences }: Props) {
  return (
    <div className="col-span-12 lg:col-span-4 space-y-8">
      <SecurityPanel />
      <AlertPreferences preferences={alertPreferences} />
    </div>
  );
}
