import { Calendar, CreditCard, FolderOpen, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export const sidebarMenu = [
  {
    label: "Agendamentos",
    href: "/dashboard/schedule",
    icon: Calendar,
  },
  {
    label: "Serviços",
    href: "/dashboard/services",
    icon: FolderOpen,
  },
];

export const sidebarAccountMenu = [
  {
    label: "Configurações",
    href: "dashboard/settings",
    icon: Settings,
  },
  {
    label: "Planos",
    href: "dashboard/plans",
    icon: CreditCard,
  },
];

export default function SidebarMenu() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  console.log("Current pathname:", pathname);
  return (
    <>
      {!collapsed && <h3 className="text-gray-500 py-2 text-sm">DASHBOARD</h3>}
      <nav>
        {sidebarMenu.map((item) => {
          const isActive = pathname.endsWith(`/${item.href}`);

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton tooltip={item.label} >
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2  hover:bg-gray-200 text-black rounded-md ${isActive ? "bg-blue-500 text-white hover:text-black" : ""}`}
                >
                  <item.icon className="w-5 h-5" />

                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </nav>
      {!collapsed && (
        <h3 className="text-gray-500 py-2 text-sm">MINHA CONTA</h3>
      )}

      <nav>
        {sidebarAccountMenu.map((item) => {
          const isActive = pathname.endsWith(`/${item.href}`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 p-2 hover:bg-gray-200 text-black rounded-md ${isActive ? "bg-blue-500 text-white hover:text-black" : ""}`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
