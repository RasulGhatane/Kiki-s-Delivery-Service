"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import React from "react";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive = false }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3 text-lg",
        isActive && "bg-black text-white hover:bg-white hover:text-black"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  {
    href: "/",
    children: "Home",
  },
  {
    href: "/about",
    children: "About",
  },
  {
    href: "/features",
    children: "Features",
  },
  {
    href: "/pricing",
    children: "Pricing",
  },
  {
    href: "/contact",
    children: "Contact",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("xl:text-4xl text-2xl font-semibold")}>
          Kiki's Delivery Service
        </span>
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setSidebarOpen}
      />

      <section className="flex xl:gap-4 gap-1">
        <div className="items-center xl:gap-4 gap-1 hidden lg:flex">
          {navbarItems.map((item) => (
            <NavbarItem
              key={item.href}
              href={item.href}
              isActive={pathname === item.href}
            >
              {item.children}
            </NavbarItem>
          ))}
        </div>

        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-b-0 border-r-0 xl:px-12 px-8 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          >
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button
            asChild
            className="border-l border-t-0 border-b-0 border-r-0 xl:px-12 px-8 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link href="/sign-up">Start Selling</Link>
          </Button>
        </div>
        <div className="flex lg:hidden items-center justify-center">
          <Button
            variant="ghost"
            className="size-12 border-transparent bg-white text-3xl"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="w-8 h-8" />
          </Button>
        </div>
      </section>
    </nav>
  );
};
