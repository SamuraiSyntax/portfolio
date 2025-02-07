"use client";

import { SectionDivider } from "@/components/not-logged/SectionDivider";
import { handleScroll } from "@/hooks/useScroll";
import { getServiceIcon } from "@/lib/icons";
import { decodeHTMLEntities } from "@/lib/utils";
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

  const containerClass = `relative min-h-screen flex items-center border-none border-0 group md:sticky md:top-0 bg-${color}${
    utility ? `-${utility}` : ""
  } ${className}`;

  // Classes spécifiques pour mobile
  const mobileClasses = {
    section: "py-16 px-4",
    title: "text-3xl",
    highlight: "text-2xl mt-2",
    subtitle: "text-base",
    button: "px-4 py-2 text-base",
  };

  // Classes spécifiques pour desktop
  const desktopClasses = {
    section: "lg:py-24 lg:px-8",
    title: "lg:text-6xl",
    highlight: "lg:text-5xl lg:mt-3",
    subtitle: "lg:text-xl",
    button: "lg:px-8 lg:py-3 lg:text-lg",
  };

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

      <div className="container mx-auto py-16 px-8 lg:px-8">
        <div className="mx-auto flex flex-col gap-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                {IconComponent && (
                  <div className="text-primary">
                    <IconComponent className="w-12 h-12" />
                  </div>
                )}
                <h2 className="font-bold text-3xl">{service.title.rendered}</h2>
              </div>

              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: decodedContent }}
              />

              <div className="flex flex-col gap-2">
                <p className="font-semibold text-xl mt-4">
                  {service.service_meta.price}
                </p>
                <p className="small">{service.service_meta.duration}</p>
              </div>
              <Link
                href="#contact"
                className={`w-full sm:w-auto flex items-center justify-center ${mobileClasses.button} ${desktopClasses.button} bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 px-4 py-2 rounded-md whitespace-nowrap`}
                onClick={(e) => handleScroll(e, "#contact")}
              >
                Contactez-nous pour plus d&apos;informations
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background/70 backdrop-blur-lg hover:bg-background rounded-lg shadow-lg p-6 transition-all duration-300"
            >
              <h3 className="font-bold mb-4 text-xl">Ce service inclut :</h3>
              <ul className="space-y-2">
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
            </motion.div>
          </div>

          <ServiceNavigation previous={previous} next={next} />
        </div>
      </div>
    </section>
  );
}
