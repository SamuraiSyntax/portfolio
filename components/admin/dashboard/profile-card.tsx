"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeToggle from "@/components/ui/theme-switch";
import { Session } from "next-auth";

export function ProfileCard({ session }: { session: Session }) {
  return (
    <Card className="w-full md:w-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profil Admin</CardTitle>
        <ThemeToggle />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Email</p>
            <p className="text-sm text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Nom</p>
            <p className="text-sm text-muted-foreground">
              {session.user?.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
