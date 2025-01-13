"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { PROFILE_DATA } from "@/lib/constants/profile";

import { Icons } from "@/components/ui/icons";
import { neobrutalismClassPrimary } from "@/lib/styles";

export default function ProfileSection() {
  const isAvailable = PROFILE_DATA.availability === "Disponible";
  return (
    <Card
      className={`col-span-2 md:col-span-1 grid grid-cols-1 relative group ${neobrutalismClassPrimary} profile-card max-w-fit mx-auto h-auto my-auto`}
    >
      <CardContent className="p-6 flex flex-col justify-center gap-2 space-y-2 h-full">
        <Avatar
          className={`max-w-[125px] w-fit h-auto mx-auto bg-primary rounded-full border-2 border-foreground/20 transition-all duration-200 ease-in-out hover:translate-x-[-4px] group-hover:translate-x-[-4px] hover:translate-y-[-4px] group-hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_hsl(var(--primary))] group-hover:shadow-[4px_4px_0px_0px_hsl(var(--primary))] hover:border-primary group-hover:border-primary`}
        >
          <AvatarImage
            src={PROFILE_DATA.avatar}
            alt="Photo de profil"
            className="bg-primary rounded-full object-cover w-full h-full blur-[0.25em] group-hover:blur-none sepia hover:sepia-0 transition-[filter] duration-300 ease-in-out"
          />
          <AvatarFallback>{PROFILE_DATA.initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-center text-foreground">
            {PROFILE_DATA.name}
          </h1>
          <p className="text-center text-muted-foreground">
            {PROFILE_DATA.job}
          </p>
          <div className="flex items-center justify-center gap-2 text-center">
            {isAvailable ? (
              <>
                <Icons.FaCircle className="text-green-800 dark:text-green-400 h-3 w-3" />
                <span className="text-green-800 dark:text-green-400 font-semibold">
                  {PROFILE_DATA.availability}
                </span>
              </>
            ) : (
              <>
                <Icons.FaTimesCircle className="text-red-800 dark:text-red-400 h-3 w-3" />
                <span className="text-red-800 dark:text-red-400 font-semibold">
                  {PROFILE_DATA.availability}
                </span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
