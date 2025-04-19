import { Sidebar } from "@/components/layout/sidebar";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      {/* Main content */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-2 md:px-8 py-4 md:py-8 mt-14 md:mt-0">
        {children}
      </main>
    </div>
  );
}
