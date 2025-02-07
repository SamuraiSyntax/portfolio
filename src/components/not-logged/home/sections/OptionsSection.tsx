"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconKeys, Icons } from "@/components/ui/icons";
import ThemeToggle from "@/components/ui/theme-switch";
import { OPTIONS_CARDS } from "@/lib/constants/cards";
import { neobrutalismClassPrimary } from "@/lib/styles";

export default function OptionsSection() {
  const card = OPTIONS_CARDS[0];
  const Icon = card.icon ? Icons[card.icon as IconKeys] : null;

  return (
    <Card
      className={`col-span-2 md:col-span-1 relative group ${neobrutalismClassPrimary} options-card w-full max-w-fit mx-auto h-auto my-auto`}
    >
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center">
          <ThemeToggle />
        </div>
      </CardContent>
    </Card>
  );
}
