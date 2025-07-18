"use client";

import { useAccount } from "wagmi";

import WalletConnecting from "@/components/wallet/WalletConnecting";
import WalletDisconnected from "@/components/wallet/WalletDisconnected";
import SidebarMenu from "@/components/display/SidebarMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isConnected, status } = useAccount();

  // Handle loading state while checking connection status
  if (status === "connecting" || status === "reconnecting") {
    return <WalletConnecting />;
  }

  // Handle disconnected state
  if (!isConnected) {
    return <WalletDisconnected />;
  }

  return (
    <>
      <div className="flex">
        <SidebarMenu />
        <main className="bg-gray-50 w-full h-screen overflow-auto p-6">
          <section className="container mx-auto">{children}</section>
        </main>
      </div>
    </>
  );
}
