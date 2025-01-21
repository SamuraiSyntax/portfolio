"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { decodeHTMLEntities } from "@/lib/utils";
import { WPService } from "@/types/wordpress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCode,
  FaDatabase,
  FaSearch,
  FaStore,
  FaTools,
  FaWordpress,
} from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

const iconMap: Record<string, React.ElementType> = {
  FaWordpress,
  SiNextdotjs,
  FaCode,
  FaDatabase,
  FaTools,
  FaSearch,
  FaStore,
};

export function ServiceCard({
  service,
  openAccordion,
  setOpenAccordion,
}: {
  service: WPService;
  openAccordion: string | null;
  setOpenAccordion: (id: string | null) => void;
}) {
  const IconComponent = service.service_meta?.icon
    ? iconMap[service.service_meta.icon]
    : FaCode;

  const isOpen = openAccordion === service.id.toString();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-auto md:h-full w-full"
      id={service.slug}
    >
      <Card className="flex flex-col h-auto md:h-full hover:shadow-lg transition-shadow">
        <CardHeader className="flex-none md:p-6 p-4">
          <div className="flex items-center gap-4">
            {IconComponent && (
              <div className="text-primary flex-none">
                <IconComponent className="w-8 h-8" />
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">
              {decodeHTMLEntities(service.title.rendered)}
            </h3>
          </div>
        </CardHeader>
        <CardContent className="h-auto md:h-full flex flex-col justify-start gap-4 md:p-6 p-4 pt-0">
          <div
            className="text-muted-foreground prose-sm prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: isOpen && isMobile ? "" : service.content.rendered,
            }}
          />
          <Accordion type="single" collapsible>
            <AccordionItem value={service.id.toString()}>
              <AccordionTrigger
                className="flex justify-between items-center gap-2"
                onClick={() => {
                  setOpenAccordion(isOpen ? null : service.id.toString());
                }}
              >
                <span>Afficher les fonctionnalités</span>
                <span
                  className="transition-transform duration-300"
                  data-state={isOpen ? "open" : "closed"}
                >
                  {isOpen ? "▲" : "▼"}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {service.service_meta?.features && (
                  <ul className="list-disc list-inside space-y-3 mt-2">
                    {service.service_meta.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex-none pt-6 md:p-6 p-4">
          <Link href="#contact" className="w-full">
            <Button className="w-full">Demander un devis</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
