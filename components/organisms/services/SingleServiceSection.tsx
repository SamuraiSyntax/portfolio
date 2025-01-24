"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { Button } from "@/components/ui/button";
import { getServiceIcon } from "@/lib/icons";
import { decodeHTMLEntities, formatPrice } from "@/lib/utils";
import { WPService } from "@/types/wordpress";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ServiceNavigation } from "./ServiceNavigation";

interface SingleServiceSectionProps {
  service: WPService;
  previous: WPService | null;
  next: WPService | null;
  className?: string;
  color?: string;
  colorReverse?: string;
  utility?: number;
  reverse?: boolean;
  waveType?: "type1" | "type2" | "type3";
  utilityReverse?: number;
  zIndex?: number;
}

export function SingleServiceSection({
  service,
  previous,
  next,
  className = "",
  color = "background",
  colorReverse,
  utility,
  reverse,
  waveType = "type1",
  utilityReverse,
  zIndex = 5,
}: SingleServiceSectionProps) {
  const [decodedContent, setDecodedContent] = useState(
    service.content.rendered
  );
  const IconComponent = getServiceIcon(service.service_meta.icon);

  useEffect(() => {
    setDecodedContent(decodeHTMLEntities(service.content.rendered));
  }, [service]);
  /* 
  const containerClassDesktop = `flex items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  } ${className}`;

  const containerClassMobile = `relative border-none border-0 group bg-${color}${
    utility ? `-${utility}` : ""
  } ${className}`; */

  // Classes spécifiques pour mobile
  const mobileClasses = {
    section: "py-6 px-4",
    grid: "grid-cols-1 gap-4",
    title: "text-2xl",
    icon: "w-8 h-8",
    prose: "prose-sm",
    card: "p-4 space-y-3",
    features: "text-sm space-y-2",
  };

  // Classes spécifiques pour desktop
  const desktopClasses = {
    section: "lg:py-16 lg:px-8",
    grid: "lg:grid-cols-2 lg:gap-8",
    title: "lg:text-4xl",
    icon: "lg:w-12 lg:h-12",
    prose: "lg:prose-lg",
    card: "lg:p-8 lg:space-y-6",
    features: "lg:text-base lg:space-y-4",
  };

  const containerClass = `relative border-none border-0 group md:sticky md:top-0 bg-${color}${
    utility ? `-${utility}` : ""
  } ${className}`;

  return (
    <section id="services" className={containerClass} style={{ zIndex }}>
      <SectionDivider
        color={color}
        colorReverse={colorReverse}
        utility={utilityReverse}
        reverse={reverse}
        waveType={waveType}
        zIndex={zIndex}
      />

      <div
        className={`container mx-auto ${mobileClasses.section} ${desktopClasses.section}`}
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-8 mb-8">
          <div className={`grid ${mobileClasses.grid} ${desktopClasses.grid}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                {IconComponent && (
                  <div className="text-primary">
                    <IconComponent
                      className={`${mobileClasses.icon} ${desktopClasses.icon}`}
                    />
                  </div>
                )}
                <h2
                  className={`font-bold ${mobileClasses.title} ${desktopClasses.title}`}
                >
                  {service.title.rendered}
                </h2>
              </div>

              <div
                className={`prose max-w-none ${mobileClasses.prose} ${desktopClasses.prose}`}
                dangerouslySetInnerHTML={{
                  __html: decodedContent,
                }}
              />

              <div
                className={`bg-muted rounded-lg ${mobileClasses.card} ${desktopClasses.card}`}
              >
                <p
                  className={`font-semibold ${mobileClasses.title} ${desktopClasses.title}`}
                >
                  À partir de {formatPrice(service.service_meta.price)}€
                </p>
                <Link href="/contact" className="block">
                  <Button className="w-full">
                    Demander un devis personnalisé
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className={`bg-card rounded-lg shadow-lg ${mobileClasses.card} ${desktopClasses.card}`}
              >
                <h3
                  className={`font-bold mb-4 ${mobileClasses.title} ${desktopClasses.title}`}
                >
                  Ce service inclut :
                </h3>
                <ul
                  className={
                    mobileClasses.features + " " + desktopClasses.features
                  }
                >
                  {service.service_meta.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <FaCheck className="text-primary flex-shrink-0 mt-1" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <ServiceNavigation previous={previous} next={next} />
          </div>
        </div>
      </div>
    </section>
  );
}
