import BloodTypeCards from "@/components/dashboard/inventory/BloodTypeCards";
import InventoryHero from "@/components/dashboard/inventory/InventoryHero";
import InventorySidebar from "@/components/dashboard/inventory/InventorySidebar";
import StockActivityTable from "@/components/dashboard/inventory/StockActivityTable";
import type { Metadata } from "next";
import { fetchBloodStock, fetchBloodUnits } from "@/lib/api/queries";

export const metadata: Metadata = {
  title: "Inventário de Sangue | DoaVida",
};

export default async function InventarioPage() {
  const [bloodStock, bloodUnits] = await Promise.all([
    fetchBloodStock(),
    fetchBloodUnits(),
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <InventoryHero />
      <BloodTypeCards bloodStock={bloodStock} />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8">
          <StockActivityTable units={bloodUnits} />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <InventorySidebar />
        </div>
      </div>
    </div>
  );
}
