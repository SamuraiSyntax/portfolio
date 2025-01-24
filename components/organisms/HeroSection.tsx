"use client";

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
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const isMobile = window.innerWidth < 768;

      const excludedIds = ["contact"];
      // Ajouter automatiquement le suffixe "-mobile" si on est sur mobile
      const mobileTargetId =
        isMobile && !excludedIds.includes(targetId)
          ? `${targetId}-mobile`
          : targetId;

      const elem = document.getElementById(mobileTargetId);

      elem?.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      className={`min-h-screen relative flex items-center overflow-hidden
        ${mobileClasses.section} ${desktopClasses.section} ${className}`}
      style={{ zIndex: 10 }}
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
                className={`text-primary block animate-pulse animate-thrice animate-duration-1000 animate-delay-0 animate-ease-in-out animate-normal animate-fill-both ${mobileClasses.highlight} ${desktopClasses.highlight}`}
              >
                {highlight}
              </span>
            </h1>
          </motion.div>

          <motion.p
            className={`mb-6 text-muted-foreground flex flex-wrap gap-2 justify-center ${mobileClasses.subtitle} ${desktopClasses.subtitle}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {typeof subtitle === "string" ? subtitle : subtitle}
          </motion.p>

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
      </div>
    </section>
  );
}
