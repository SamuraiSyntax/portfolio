"use client";

import { handleScroll } from "@/hooks/useScroll";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface HeroSectionProps {
  title?: string;
  highlight?: string;
  subtitle?: string | ReactNode;
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
    subtitle: "text-sm gap-2",
    button: "px-4 py-2 text-base",
  };

  // Classes spécifiques pour desktop
  const desktopClasses = {
    section: "lg:py-24 lg:px-8",
    title: "md:text-4xl lg:text-6xl",
    highlight: "md:text-3xl lg:text-5xl lg:mt-3",
    subtitle: "md:text-xl lg:text-2xl lg:gap-2",
    button: "md:px-6 lg:px-8 lg:py-3 lg:text-lg",
  };

  return (
    <section
      className={`min-h-screen relative flex items-center overflow-hidden ${mobileClasses.section} ${desktopClasses.section} ${className}`}
      style={{ zIndex: 10 }}
    >
      <div className="container mx-auto text-center flex flex-col items-center justify-center gap-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          <h1
            className={`h1 font-bold text-foreground ${mobileClasses.title} ${desktopClasses.title}`}
          >
            {title}
          </h1>
        </motion.div>
        <motion.p
          className={`text-primary mb-4 mt-0 block animate-pulse animate-thrice animate-duration-1000 animate-delay-0 animate-ease-in-out animate-normal animate-fill-both ${mobileClasses.highlight} ${desktopClasses.highlight}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {highlight}
        </motion.p>

        {typeof subtitle === "string" ? (
          <span
            className={`mb-6 text-muted-foreground flex flex-wrap justify-center ${mobileClasses.subtitle} ${desktopClasses.subtitle}`}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        ) : (
          <div
            className={`mb-6 text-muted-foreground flex flex-wrap justify-center ${mobileClasses.subtitle} ${desktopClasses.subtitle}`}
          >
            subtitle
          </div>
        )}

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href={primaryButtonLink}
            onClick={(e) => handleScroll(e, primaryButtonLink)}
            className={`w-full sm:w-auto flex items-center justify-center ${mobileClasses.button} ${desktopClasses.button} bg-primary text-primary-foreground hover:bg-primary/90 shadow h-9 px-4 py-2 rounded-md`}
          >
            {primaryButtonText}
          </Link>
          <Link
            href={secondaryButtonLink}
            onClick={(e) => handleScroll(e, secondaryButtonLink)}
            className={`w-full sm:w-auto flex items-center justify-center ${mobileClasses.button} ${desktopClasses.button} bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow h-9 px-4 py-2 rounded-md`}
          >
            {secondaryButtonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
