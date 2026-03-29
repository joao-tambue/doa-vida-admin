import BloodTypeCards from "@/components/dashboard/inventory/BloodTypeCards";
import InventoryHero from "@/components/dashboard/inventory/InventoryHero";
import InventorySidebar from "@/components/dashboard/inventory/InventorySidebar";
import StockActivityTable from "@/components/dashboard/inventory/StockActivityTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventário de Sangue | DoaVida",
};

export default function InventarioPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <InventoryHero />
      <BloodTypeCards />

      {/* Main Layout: Table + Sidebar */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <StockActivityTable />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <InventorySidebar />
        </div>
      </div>
    </div>
  );
}
