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
    label: "Perfil",
    href: "/dashboard/profile",
    icon: Settings,
  },
  {
    label: "Planos",
    href: "/dashboard/plans",
    icon: CreditCard,
  },
];

export default function SidebarMenu() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <>
      {!collapsed && <h3 className="text-gray-500 py-2 text-sm">DASHBOARD</h3>}
      <nav className="flex flex-col gap-2">
        {sidebarMenu.map((item) => {
          const isActive = pathname.endsWith(`${item.href}`);

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                className={isActive ? "bg-blue-500 text-white" : ""}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2 w-full"
                >
                  <item.icon className="w-5 h-5 shrink-0 text-current" />
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

      <nav className="flex flex-col gap-2">
        {sidebarAccountMenu.map((item) => {
          const isActive = pathname.endsWith(`${item.href}`);
          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                className={isActive ? "bg-blue-500 text-white" : ""}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2 w-full"
                >
                  <item.icon className="w-5 h-5 shrink-0 text-current" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </nav>
    </>
  );
}
