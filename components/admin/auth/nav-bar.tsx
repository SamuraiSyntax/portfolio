"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src={session.user?.image || ""}
                alt="User Avatar"
                className="rounded-full"
              />
              <AvatarFallback className="rounded-full bg-primary text-secondary font-semibold object-cover object-center">
                {session.user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground hidden sm:block">
              {session.user?.name}
            </span>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 p-2 text-red-500 border-border hover:bg-red-500 hover:text-white"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <FaSignOutAlt />
          </Button>
        </div>
      </div>
    </nav>
  );
}
