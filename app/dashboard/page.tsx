import type { Metadata } from "next";
import DashboardHero from "@/components/dashboard/painel-geral/DashboardHero";
import DashboardMetrics from "@/components/dashboard/painel-geral/DashboardMetrics";
import BloodStockWidget from "@/components/dashboard/painel-geral/BloodStockWidget";
import RecentUpdates from "@/components/dashboard/painel-geral/RecentUpdates";
import FloatingActionButton from "@/components/dashboard/painel-geral/FloatingActionButton";
import RecentRequests from "@/components/dashboard/painel-geral/RecentRequests";

export const metadata: Metadata = {
  title: "Painel Geral | Link Life",
};

export default function Home() {
  return (
    <>
      <DashboardHero />
        <DashboardMetrics />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <BloodStockWidget />
            </div>
            <div className="lg:col-span-5">
              <RecentUpdates />
            </div>
          </div>
      
        <RecentRequests />
      <FloatingActionButton />
    </>
  );
}
