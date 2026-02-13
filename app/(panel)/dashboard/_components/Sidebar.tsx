"use client";

import { AppSidebar } from "@/components/app-sidebar";
import HeaderMenuMobile from "@/components/headerMenuMobile";
import { MobileSidebar } from "@/components/mobileSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const SidebarDashboard = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <>
      {isMobile && <HeaderMenuMobile onClick={() => setOpen(true)} />}
      <SidebarProvider>
        {isMobile && <MobileSidebar open={open} onOpenChange={setOpen} />}
        {!isMobile && <AppSidebar />}
        <main className="flex-1 py-4 px-2 ">
          <SidebarTrigger className="hidden md:flex" />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};
export default SidebarDashboard;
