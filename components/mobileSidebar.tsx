import { Sheet, SheetContent, SheetHeader } from "./ui/sheet";
import { Calendar, CreditCard, FolderOpen, Settings } from "lucide-react";
import Image from "next/image";
import SidebarLogoutFooter from "./sidebarFooter";
import NavLink from "./nav-link";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const sidebarMenu = [
  {
    label: "Agendamentos",
    href: "schedule",
    icon: Calendar,
  },
  {
    label: "Serviços",
    href: "services",
    icon: FolderOpen,
  },
];

export const sidebarAccountMenu = [
  {
    label: "Configurações",
    href: "settings",
    icon: Settings,
  },
  {
    label: "Planos",
    href: "plans",
    icon: CreditCard,
  },
];

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <header>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="p-2">
          <SheetHeader className="flex justify-center items-center">
            <Image
              src="/logo-odonto.png"
              alt="Logo da clinica"
              width={140}
              height={240}
            />
          </SheetHeader>
          <h3 className="text-gray-500 py-2 text-sm">DASHBOARD</h3>
          <nav>
            {sidebarMenu.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                onClick={() => onOpenChange(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <h3 className="text-gray-500 py-2 text-sm">MINHA CONTA</h3>
          <nav className="mb-50">
            {sidebarAccountMenu.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                onClick={() => onOpenChange(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <SidebarLogoutFooter />
        </SheetContent>
      </Sheet>
    </header>
  );
}
