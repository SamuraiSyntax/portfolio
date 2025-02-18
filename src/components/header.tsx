"use client";

import LogoBR from "@/components/not-logged/LogoBR";
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
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/ui/theme-switch";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Mail, Menu, Search, X } from "lucide-react";
import { Session } from "next-auth";
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
import { SidebarTrigger } from "./ui/sidebar";

interface HeaderProps {
  variant?: "public" | "admin";
}

export default function Header({ variant = "public" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  // Gestion du scroll avec throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20);
        timeoutId = null;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Gestion du montage du composant
  useEffect(() => {
    setMounted(true);
  }, []);

  // Désactiver le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  const isLightTheme = theme === "light";

  const publicNavItems = [
    {
      href: "/services",
      label: "Services",
      icon: <FaTools className="w-4 h-4" />,
    },
    {
      href: "/projects",
      label: "Projets",
      icon: <FaCode className="w-4 h-4" />,
    },
    { href: "/about", label: "À propos", icon: <FaUser className="w-4 h-4" /> },
    {
      href: "/contact",
      label: "Contact",
      icon: <FaEnvelope className="w-4 h-4" />,
    },
  ];

  const adminNavItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/stats", label: "Statistiques" },
  ];

  const adminNavExternalItems = [
    { href: "https://resend.com/emails", label: "Resend" },
    { href: "https://console.upstash.com/", label: "Upstash" },
    { href: "https://console.neon.tech/", label: "Neon" },
  ];

  if (variant === "admin") {
    return <AdminHeader session={session} />;
  }

  return (
    <header
      className={cn(
        "fixed w-full transition-all duration-300 z-[100]",
        isScrolled
          ? "bg-secondary/90 backdrop-blur-sm shadow-md"
          : "bg-transparent",
        isMobileMenuOpen && "bg-secondary"
      )}
    >
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 flex items-center gap-2 group"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <LogoBR
            className={cn(
              "h-[50px] transition-colors duration-300",
              isLightTheme ? "fill-black" : "fill-white",
              "group-hover:fill-primary"
            )}
            theme={isLightTheme ? "light" : "dark"}
            aria-label="Logo Bernard Rogier"
          />
        </Link>

        {/* Navigation Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {publicNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <ThemeToggle />

          {session ? (
            <UserMenu
              session={session}
              adminNavItems={adminNavItems}
              adminNavExternalItems={adminNavExternalItems}
            />
          ) : null}
        </div>

        {/* Bouton Menu Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden relative z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              session={session as Session}
              publicNavItems={publicNavItems}
              adminNavItems={adminNavItems}
              adminNavExternalItems={adminNavExternalItems}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function AdminHeader({ session }: { session: Session | null }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
          </div>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8 w-full bg-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              3
            </span>
          </Button>

          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image ?? ""} alt="Avatar" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {session?.user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Mon profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Paramètres</Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  href="https://gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Gmail</span>
                </Link>
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
        </div>
      </div>
    </header>
  );
}

// Composant Menu Utilisateur
function UserMenu({
  session,
  adminNavItems,
  adminNavExternalItems,
}: {
  session: Session;
  adminNavItems: { href: string; label: string }[];
  adminNavExternalItems: { href: string; label: string }[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user?.image ?? ""} alt="Avatar" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {session.user?.name?.[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <UserMenuContent
          session={session}
          adminNavItems={adminNavItems}
          adminNavExternalItems={adminNavExternalItems}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Composant Menu Mobile
function MobileMenu({
  session,
  publicNavItems,
  adminNavItems,
  adminNavExternalItems,
  onClose,
}: {
  session: Session;
  publicNavItems: { href: string; label: string; icon: React.ReactNode }[];
  adminNavItems: { href: string; label: string }[];
  adminNavExternalItems: { href: string; label: string }[];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="h-screen fixed inset-0 top-16 bg-secondary z-40 overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
        <nav className="grid gap-4">
          {publicNavItems.map(
            (item: { href: string; label: string; icon: React.ReactNode }) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 p-3 hover:bg-muted rounded-md transition-colors"
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </Link>
            )
          )}
        </nav>

        {session && (
          <>
            <div className="h-px bg-border" />
            <nav className="grid gap-4">
              {adminNavItems.map((item: { href: string; label: string }) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 p-3 hover:bg-muted rounded-md transition-colors"
                >
                  <span className="text-lg">{item.label}</span>
                </Link>
              ))}
            </nav>
          </>
        )}

        <div className="mt-auto flex flex-col gap-4">
          <div className="flex justify-center">
            <ThemeToggle />
          </div>

          {session ? (
            <Button
              variant="destructive"
              onClick={() => {
                onClose();
                signOut({ callbackUrl: "/" });
              }}
            >
              <FaSignOutAlt className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

// Contenu du menu utilisateur
function UserMenuContent({
  session,
  adminNavItems,
  adminNavExternalItems,
}: {
  session: Session;
  adminNavItems: { href: string; label: string }[];
  adminNavExternalItems: { href: string; label: string }[];
}) {
  return (
    <>
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

      {adminNavItems.map((item: { href: string; label: string }) => (
        <DropdownMenuItem key={item.href} asChild>
          <Link href={item.href}>{item.label}</Link>
        </DropdownMenuItem>
      ))}

      <DropdownMenuSeparator />

      {adminNavExternalItems.map((item: { href: string; label: string }) => (
        <DropdownMenuItem key={item.href} asChild>
          <Link href={item.href} target="_blank" rel="noopener noreferrer">
            {item.label}
          </Link>
        </DropdownMenuItem>
      ))}

      <DropdownMenuSeparator />

      <DropdownMenuItem asChild>
        <Link
          href="https://gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail className="mr-2 h-4 w-4" />
          <span>Gmail</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        className="text-red-500 focus:text-red-500"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <FaSignOutAlt className="mr-2 h-4 w-4" />
        <span>Déconnexion</span>
      </DropdownMenuItem>
    </>
  );
}
