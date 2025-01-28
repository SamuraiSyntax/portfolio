"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getServiceIcon } from "@/lib/icons";
import { stripHtml, truncateText } from "@/lib/utils";
import { WPService } from "@/types/wordpress";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function ServicePreviewCard({
  service,
  color = "muted",
  showPrice = true,
  showFeatures = true,
  showDuration = true,
}: {
  service: WPService;
  color: string;
  showPrice?: boolean;
  showFeatures?: boolean;
  showDuration?: boolean;
}) {
  const colorClass = color === "muted" ? "bg-background" : "bg-muted";
  const IconComponent = getServiceIcon(service.service_meta.icon);
  const title = stripHtml(service.title.rendered);
  const content = stripHtml(service.content.rendered);

  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.02, translateY: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full w-full group"
      >
        <Card
          className={`h-full ${colorClass} hover:shadow-2xl transition-all duration-300 border-2 border-primary/10 hover:border-primary relative overflow-hidden cursor-pointer flex flex-col`}
        >
          <CardHeader className="space-y-4">
            <div className="relative flex items-center justify-between gap-4">
              <div className="text-primary p-4 bg-primary/10 rounded-2xl transform group-hover:scale-110 transition-transform duration-300">
                <IconComponent
                  className="stroke-[1.5]"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className="h3 font-bold leading-tight group-hover:text-primary transition-colors duration-300 grow">
                {title}
              </h3>
            </div>
            {showPrice ? (
              <Badge
                variant="outline"
                className="text-primary border-primary/20 whitespace-break-spaces w-fit"
              >
                {service.service_meta.price}
              </Badge>
            ) : null}
            {showDuration ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 stroke-[1.5]" />
                <span className="text-sm">{service.service_meta.duration}</span>
              </div>
            ) : null}
          </CardHeader>
          <CardContent className="space-y-6 mb-auto flex-grow flex flex-col justify-between border-t border-primary/10 pt-6">
            <p className="text-muted-foreground text-base leading-relaxed">
              {content}
            </p>

            {showFeatures ? (
              <div className="flex flex-wrap gap-2 flex-row justify-start items-center">
                {service.service_meta.features.map((feature, index) => (
                  <TooltipProvider delayDuration={100} key={index}>
                    <Tooltip>
                      <TooltipTrigger className="cursor-help">
                        <Badge
                          variant="secondary"
                          className="text-xs font-normal hover:bg-secondary/80 transition-colors"
                        >
                          {truncateText(feature, 10)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="top" sideOffset={10}>
                        <p className="text-sm">{feature}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            ) : null}
          </CardContent>
          <CardFooter className="mt-auto flex-shrink-0">
            <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform duration-300">
              <span className="text-sm font-medium">Découvrir ce service</span>
              <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
