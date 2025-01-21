"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

export function HeroSection({
  title = "Expert en Développement Web",
  highlight = "WordPress & Next.js",
  subtitle = "Je crée des sites web performants et des applications sur mesure qui répondent parfaitement aux besoins de votre entreprise.",
  primaryButtonText = "Discuter de votre projet",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Découvrir mes services",
  secondaryButtonLink = "/services",
  className = "",
}: HeroSectionProps) {
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
    <section
      className={`min-h-screen flex items-center overflow-hidden sticky top-0 z-[10] 
        ${mobileClasses.section} ${desktopClasses.section} ${className}`}
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className={`font-bold mb-4 text-foreground ${mobileClasses.title} ${desktopClasses.title}`}
            >
              {title}
              <span
                className={`text-primary block ${mobileClasses.highlight} ${desktopClasses.highlight}`}
              >
                {highlight}
              </span>
            </h1>
          </motion.div>

          <motion.p
            className={`mb-6 text-muted-foreground ${mobileClasses.subtitle} ${desktopClasses.subtitle}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href={primaryButtonLink}>
              <Button
                size="default"
                className={`w-full sm:w-auto ${mobileClasses.button} ${desktopClasses.button}`}
              >
                {primaryButtonText}
              </Button>
            </Link>
            <Link href={secondaryButtonLink}>
              <Button
                variant="outline"
                size="default"
                className={`w-full sm:w-auto ${mobileClasses.button} ${desktopClasses.button}`}
              >
                {secondaryButtonText}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
