"use client";

import { Button } from "@/components/ui/button";
import { handleScroll } from "@/hooks/useScroll";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode, memo } from "react";

// Types
interface HeroSectionProps {
  priority?: boolean;
  title?: string;
  highlight?: string;
  subtitle?: string | ReactNode;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
}

// Constantes pour les styles
const STYLES = {
  mobile: {
    section: "py-16 px-4",
    title: "text-3xl",
    highlight: "text-2xl mt-2",
    subtitle: "text-sm gap-2",
    button: "px-4 py-2 text-base",
  },
  desktop: {
    section: "lg:py-24 lg:px-8",
    title: "md:text-4xl lg:text-6xl",
    highlight: "md:text-3xl lg:text-5xl lg:mt-3",
    subtitle: "md:text-xl lg:text-2xl lg:gap-2",
    button: "md:px-6 lg:px-8 lg:py-3 lg:text-lg",
  },
} as const;

// Animations
const fadeInUpVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

// Composant Button optimisé
const HeroButton = memo(function HeroButton({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
}) {
  return (
    <Button
      asChild
      variant={variant === "primary" ? "default" : "secondary"}
      className={`w-full sm:w-auto ${STYLES.mobile.button} ${STYLES.desktop.button}`}
    >
      <Link href={href} onClick={(e) => handleScroll(e, href)}>
        {children}
      </Link>
    </Button>
  );
});

// Composant principal
export const HeroSection = memo(function HeroSection({
  title = "Expert en Développement Web",
  highlight = "WordPress & Next.js",
  subtitle = "Je crée des sites web performants et des applications sur mesure qui répondent parfaitement aux besoins de votre entreprise.",
  primaryButtonText = "Discuter de votre projet",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Découvrir mes services",
  secondaryButtonLink = "/services",
  className = "",
  priority = false,
}: HeroSectionProps) {
  const renderSubtitle = () => {
    if (typeof subtitle === "string") {
      return (
        <motion.p
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className={`mb-6 text-muted-foreground flex flex-col gap-1 ${STYLES.mobile.subtitle} ${STYLES.desktop.subtitle} hero-text`}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      );
    }
    return subtitle;
  };

  return (
    <section
      className={`min-h-screen relative flex items-center ${STYLES.mobile.section} ${STYLES.desktop.section} ${className}`}
      style={{
        contain: "layout paint style",
        contentVisibility: "auto",
      }}
    >
      <div className="container mx-auto text-center flex flex-col items-center justify-center gap-2">
        <motion.h1
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          className={`font-bold text-foreground ${STYLES.mobile.title} ${STYLES.desktop.title} hero-text`}
          style={{
            willChange: "transform",
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {title}
        </motion.h1>

        <motion.p
          className={`text-primary mb-4 mt-0 ${STYLES.mobile.highlight} ${STYLES.desktop.highlight}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            willChange: "opacity",
            contain: "content",
            textRendering: "optimizeLegibility",
          }}
        >
          {highlight}
        </motion.p>

        {renderSubtitle()}

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.2 }}
        >
          <HeroButton href={primaryButtonLink} variant="primary">
            {primaryButtonText}
          </HeroButton>
          <HeroButton href={secondaryButtonLink} variant="secondary">
            {secondaryButtonText}
          </HeroButton>
        </motion.div>
      </div>
    </section>
  );
});

// Optimisation pour la production
if (process.env.NODE_ENV === "development") {
  HeroSection.displayName = "HeroSection";
}

export default HeroSection;
