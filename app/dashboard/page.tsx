import type { Metadata } from "next";
import DashboardHero from "@/components/dashboard/painel-geral/DashboardHero";
import DashboardMetrics from "@/components/dashboard/painel-geral/DashboardMetrics";
import BloodStockWidget from "@/components/dashboard/painel-geral/BloodStockWidget";
import RecentUpdates from "@/components/dashboard/painel-geral/RecentUpdates";
import FloatingActionButton from "@/components/dashboard/painel-geral/FloatingActionButton";
import RecentRequests from "@/components/dashboard/painel-geral/RecentRequests";
import {
  fetchMetrics,
  fetchBloodStock,
  fetchNotifications,
  fetchRequests,
} from "@/lib/api/queries";

export const metadata: Metadata = {
  title: "Painel Geral | DoaVida",
};

export default async function Home() {
  const [metrics, bloodStock, notifications, requests] = await Promise.all([
    fetchMetrics(),
    fetchBloodStock(),
    fetchNotifications(),
    fetchRequests(),
  ]);

  return (
    <>
      <DashboardHero />
      <DashboardMetrics metrics={metrics} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <BloodStockWidget bloodStock={bloodStock} />
        </div>
        <div className="lg:col-span-5">
          <RecentUpdates notifications={notifications} />
        </div>
      </div>
      <RecentRequests requests={requests} />
      <FloatingActionButton />
    </>
  );
}
