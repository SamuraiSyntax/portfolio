"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getServiceIcon } from "@/lib/icons";
import { decodeHTMLEntities, formatPrice, truncateText } from "@/lib/utils";
import { WPService } from "@/types/wordpress";
import { motion } from "motion/react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";

export function ServiceDetailCard({ service }: { service: WPService }) {
  const IconComponent = getServiceIcon(service.service_meta.icon);

  return (
    <Card className="h-full w-full hover:shadow-lg transition-shadow flex flex-col justify-between gap-4">
      <CardHeader className="space-y-4 pb-0">
        <div className="flex items-start gap-4">
          {IconComponent && (
            <div className="text-primary flex-shrink-0">
              <IconComponent className="w-10 h-10" />
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold">
              {decodeHTMLEntities(service.title.rendered)}
            </h3>
            <p className="text-base font-semibold text-primary">
              À partir de {formatPrice(service.service_meta.price)}€
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 py-0">
        <div
          className="prose prose-sm max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: truncateText(service.content.rendered, 100),
          }}
        />

        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-base">Ce service inclut :</h4>
          <ul className="grid grid-cols-1 gap-2">
            {service.service_meta.features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FaCheck className="text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col md:flex-row gap-4">
        <Link href={`/services/${service.slug}`} className="flex-1">
          <Button variant="outline" className="w-full">
            En savoir plus
          </Button>
        </Link>
        <Link href="/contact" className="flex-1">
          <Button className="w-full">Demander un devis</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
