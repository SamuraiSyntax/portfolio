"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getServiceIcon } from "@/lib/icons";
import { stripHtml, truncateText } from "@/lib/utils";
import { WPService } from "@/types/wordpress";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ServicePreviewCard({
  service,
  color = "muted",
}: {
  service: WPService;
  color: string;
}) {
  const router = useRouter();
  const colorClass = color === "muted" ? "bg-background/50" : "bg-muted/50";
  const hoverColorClass = color === "muted" ? "bg-background" : "bg-muted";

  const btnColorClass = color === "muted" ? "bg-muted" : "bg-background";
  const btnHoverColorClass = color === "muted" ? "bg-primary" : "bg-primary";

  const IconComponent = getServiceIcon(service.service_meta.icon);

  const title = stripHtml(service.title.rendered);
  const content = truncateText(service.content.rendered, 120);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full w-full"
      id={service.slug}
    >
      <Link href={`/services/${service.slug}`}>
        <Card
          className={`h-full hover:shadow-lg transition-shadow ${colorClass} hover:${hoverColorClass} group/card`}
        >
          <CardHeader className="flex flex-row items-center gap-4">
            {IconComponent && (
              <div className="text-primary">
                <IconComponent className="w-8 h-8" />
              </div>
            )}
            <h3 className="text-lg font-semibold">{title}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{content}</p>
          </CardContent>
          <CardFooter className="p-4 mt-auto">
            <Button
              variant="ghost"
              className={`w-full ${btnColorClass} hover:${btnHoverColorClass} text-primary hover:text-white`}
              onClick={() => {
                router.push(`/services/${service.slug}`);
              }}
            >
              En savoir plus
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
