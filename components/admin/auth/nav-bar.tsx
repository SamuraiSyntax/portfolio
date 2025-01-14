"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { Button } from "../../ui/button";

export function NavBar() {
  const { data: session } = useSession();

  // Si pas de session, ne rien afficher
  if (!session) return null;

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-sm font-medium">
            Accueil
          </Link>
          <Link href="/admin/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/admin/contacts" className="text-sm font-medium">
            Contacts
          </Link>
          <Link href="/admin/stats" className="text-sm font-medium">
            Statistiques
          </Link>
          <Link href="/admin/settings" className="text-sm font-medium">
            Paramètres
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
            <DropdownMenuContent className="w-56" align="end" forceMount>
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
        </div>
      </div>
    </nav>
  );
}
