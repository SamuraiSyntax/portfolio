"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getServiceIcon } from "@/lib/icons";
import { stripHtml, truncateText } from "@/lib/utils";
import { WPService } from "@/types/wordpress";
import { motion } from "motion/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export function ServicePreviewCard({ service }: { service: WPService }) {
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
        <Card className="h-full hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center gap-4">
            {IconComponent && (
              <div className="text-primary">
                <IconComponent className="w-8 h-8" />
              </div>
            )}
            <h3 className="text-lg font-semibold">{title}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm mb-4">{content}</p>
            <div className="flex items-center text-primary">
              <span className="text-sm">En savoir plus</span>
              <FaArrowRight className="ml-2 w-4 h-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
