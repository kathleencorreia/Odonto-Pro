import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface navLinkProps {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function NavLink({
  href,
  icon: Icon,
  children,
  onClick,
}: navLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.endsWith("{href}");
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 p-2 hover:bg-gray-200 rounded-md",
        isActive && "bg-blue-500 text-white",
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
}
