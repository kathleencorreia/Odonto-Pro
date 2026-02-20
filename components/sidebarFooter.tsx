import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const SidebarLogoutFooter = () => {
  const router = useRouter();
  const { update } = useSession();

async function handleLogout() {
  await signOut({ callbackUrl: "/" });
}

  return (
    <footer className="flex flex-row items-center text-sm cursor-pointer hover:bg-gray-200 rounded-md gap-2 p-2">
      <Button  variant="ghost" onClick={handleLogout}>
        <LogOut size={18} />
        <p>Sair</p>
      </Button>
    </footer>
  );
};

export default SidebarLogoutFooter;
