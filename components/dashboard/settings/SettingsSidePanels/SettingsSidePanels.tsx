import SecurityPanel from "./SecurityPanel";
import AlertPreferences from "./AlertPreferences";

export default function SettingsSidePanels() {
  return (
    <div className="col-span-12 lg:col-span-4 space-y-8">
      <SecurityPanel />
      <AlertPreferences />
    </div>
  );
}