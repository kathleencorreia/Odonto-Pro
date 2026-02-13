import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import SidebarMenu from "./sidebarMenu";
import SidebarLogoutFooter from "./sidebarFooter";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon" className="transition-all duration-300">
      <SidebarHeader>
        {!collapsed && (
          <Image src="/logo-odonto.png" alt="Logo" width={220} height={80} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarLogoutFooter />
      </SidebarFooter>
    </Sidebar>
  );
}
