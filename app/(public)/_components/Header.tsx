"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { handleRegister } from "../_actions/login";

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  console.log(session);
  console.log(status);

  const navItems = [{ href: "#profissionais", label: "Profissionais" }];

  async function handleLogin() {
    await handleRegister("github")
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          onClick={() => setIsOpen(false)}
          key={item.href}
          href={item.href}
          className="font-semibold hover:underline hover:decoration-solid"
        >
          {item.label}
        </Link>
      ))}

      {status === "loading" ? (
        <></>
      ) : session ? (
        <Link
          href="/dashboard"
          className="font-semibold border-2 p-2 rounded-md bg-black text-white hover:bg-gray-800"
        >
          Acessar o dashboard
        </Link>
      ) : (
        <Button
          onClick={handleLogin}
          variant={"outline"}
          className="bg-black text-white cursor-pointer"
        >
          Portal da Clínica
        </Button>
      )}
    </>
  );

  return (
    <header className="w-full fixed top-0 right-0 left-0 z-10 py-4 px-6 shadow-md bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-odonto.png"
            width={170}
            height={100}
            alt="Logo OdontoPro"
          ></Image>
        </Link>
        <nav className="md:flex items-center gap-2 hidden ">
          <NavLinks />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Menu size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-60 sm:w-75 z-100">
            <SheetHeader></SheetHeader>
            <nav className="flex flex-col items-center px-4 gap-2">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
