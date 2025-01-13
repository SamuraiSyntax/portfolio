"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIcon, Icons } from "@/components/ui/icons";
import { NETWORKS } from "@/lib/constants/profile";
import { neobrutalismClassPrimary } from "@/lib/styles";
import Link from "next/link";

export default function FreelanceSection() {
  const getIconComponent = (iconName: string) => {
    const Icon = getIcon(iconName);
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  return (
    <Card
      className={`relative group ${neobrutalismClassPrimary} freelance-card w-full max-w-fit mx-auto h-auto my-auto card-freelance`}
    >
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3">
          <Icons.FaUserTie className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-medium text-center">
            Plateformes Freelance
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {NETWORKS.map((network) => (
            <Button
              key={network.name}
              variant="outline"
              asChild
              className={`${neobrutalismClassPrimary} w-full`}
            >
              <Link
                href={network.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 hover:bg-secondary"
              >
                {getIconComponent(network.icon)}
                <span className="hidden sm:inline">{network.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
