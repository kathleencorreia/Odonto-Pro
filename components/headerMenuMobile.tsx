import { Menu } from "lucide-react";
import Image from "next/image";

export default function HeaderMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <header
      className="md:hidden sticky top-0 flex items-center p-4 bg-white shadow-md "
      onClick={onClick}
    >
      <Menu className="w-5 h-5" />
      <Image
        src="/logo-odonto.png"
        alt="Logo da clinica"
        width={140}
        height={240}
      />
    </header>
  );
}
