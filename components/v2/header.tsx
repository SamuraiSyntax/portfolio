"use client";

import LogoBR from "@/components/atoms/LogoBR";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ui/theme-switch";
import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCode,
  FaEnvelope,
  FaSignOutAlt,
  FaTools,
  FaUser,
} from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isLightTheme = theme === "light";

  const publicNavItems = [
    /* { href: "/", label: "Accueil" }, */
    { href: "/services", label: "Mes services", icon: <FaTools /> },
    { href: "/projects", label: "Mes projets", icon: <FaCode /> },
    { href: "/about", label: "À propos de moi", icon: <FaUser /> },
    { href: "/contact", label: "Me contacter", icon: <FaEnvelope /> },
  ];

  const adminNavItems = [
    { href: "/admin/dashboard", label: "Tableau de bord" },
    { href: "/admin/contacts", label: "Contacts" },
    { href: "/admin/stats", label: "Statistiques" },
  ];

  const adminNavExternalItems = [
    { href: "https://resend.com/emails", label: "Resend" },
    { href: "https://console.upstash.com/", label: "Upstash Redis" },
    { href: "https://console.neon.tech/", label: "Neon" },
  ];

  const navDropdownItems = session ? adminNavItems : [];

  const navDropdownExternalItems = session ? adminNavExternalItems : [];

  return (
    <header
      className={`fixed w-full transition-all duration-300 ${
        isScrolled
          ? "bg-secondary/90 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      } data-[state=open]:bg-secondary`}
      data-state={isMobileMenuOpen ? "open" : "closed"}
      style={{ zIndex: 1000 }}
    >
      <nav className="w-full max-w-full m-0 px-2 md:px-10 py-4 max-h-16 flex justify-between items-center">
        <Link
          href="/"
          className="h-10 text-xl font-bold hover:text-primary transition-colors flex items-center group"
        >
          <LogoBR
            className={`h-full ${
              isLightTheme ? "fill-black" : "fill-white"
            } group-hover:fill-primary transition-colors duration-300`}
            theme={isLightTheme ? "light" : "dark"}
            aria-label="Logo Bernard Rogier"
          />
          <span className="hidden">Bernard Rogier</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {publicNavItems.map((item) =>
            item.href ? (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-primary whitespace-nowrap transition-all duration-300 flex items-center gap-2"
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <span key={item.label} className="text-muted">
                {item.icon}
                {item.label}
              </span>
            )
          )}
          <ThemeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt="User Avatar"
                      className="rounded-full"
                    />
                    <AvatarFallback className="rounded-full bg-primary text-secondary font-semibold">
                      {session.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 mt-4 mr-0"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {navDropdownExternalItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} target="_blank">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => window.open("https://gmail.com", "_blank")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Gmail</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <FaSignOutAlt className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>

        {/* Bouton Menu Mobile */}
        <Button
          variant="ghost"
          className="md:hidden w-auto h-auto p-1 m-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </Button>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-secondary shadow-lg h-[calc(100vh-64px)] p-4 grid grid-cols-2 gap-4 text-center"
          >
            <div
              className={`${
                session ? "col-span-1" : "col-span-2"
              } flex flex-col gap-4 justify-center items-center h-full`}
            >
              {publicNavItems.map((item) =>
                item.href ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-primary transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ) : (
                  <span key={item.label} className="text-muted">
                    {item.icon}
                    {item.label}
                  </span>
                )
              )}
            </div>
            {session ? (
              <div className="col-span-1 flex flex-col gap-2 justify-center items-center h-full">
                {navDropdownItems.map((item) =>
                  item.href ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span key={item.label} className="text-muted">
                      {item.label}
                    </span>
                  )
                )}

                {navDropdownExternalItems.map((item) =>
                  item.href ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                      target="_blank"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span key={item.label} className="text-muted">
                      {item.label}
                    </span>
                  )
                )}
              </div>
            ) : null}

            <div className="col-span-2 flex flex-col justify-center items-center gap-6 h-auto">
              <hr className="w-full" />
              <ThemeToggle />
              {session ? (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <FaSignOutAlt className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              ) : (
                <Button asChild className="w-full">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Obtenir un devis
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
