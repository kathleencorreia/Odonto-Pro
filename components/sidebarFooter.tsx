import { LogOut } from "lucide-react";

const SidebarLogoutFooter = () => {
  return (
    <footer className="flex flex-row items-center text-sm cursor-pointer hover:bg-gray-200 rounded-md gap-2 p-2">
      <LogOut size={18} />
      <p>Sair</p>
    </footer>
  );
};

export default SidebarLogoutFooter;
