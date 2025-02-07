import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
  showPrimaryButton?: boolean;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  showSecondaryButton?: boolean;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export function SectionTitle({
  title,
  subtitle,
  description,
  showPrimaryButton = true,
  primaryButtonText,
  primaryButtonLink,
  showSecondaryButton = true,
  secondaryButtonText,
  secondaryButtonLink,
}: SectionTitleProps) {
  const mobileClasses = {
    section: "py-8 px-4",
    title: "text-3xl",
    highlight: "text-2xl mt-2",
    subtitle: "text-sm gap-2",
    button: "px-4 py-2 text-base",
  };

  // Classes spécifiques pour desktop
  const desktopClasses = {
    section: "lg:px-8",
    title: "md:text-3xl lg:text-5xl",
    highlight: "md:text-2xl lg:text-4xl lg:mt-3",
    subtitle: "md:text-lg lg:text-xl lg:gap-2",
    button: "md:px-6 lg:px-8 lg:py-3 lg:text-lg",
  };
  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden ${mobileClasses.section} ${desktopClasses.section}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center"
      >
        <h2
          className={`h2 text-center font-bold text-foreground ${mobileClasses.title} ${desktopClasses.title}`}
        >
          {title}
        </h2>
      </motion.div>
      {subtitle && (
        <p
          className={`text-base text-center text-primary mb-4 mt-0 block animate-pulse animate-thrice animate-duration-1000 animate-delay-0 animate-ease-in-out animate-normal animate-fill-both ${mobileClasses.highlight} ${desktopClasses.highlight}`}
        >
          {subtitle}
        </p>
      )}
      {description && (
        <p
          className={`mb-6 text-muted-foreground flex flex-wrap justify-center text-center ${mobileClasses.subtitle} ${desktopClasses.subtitle}`}
        >
          {description}
        </p>
      )}
      {showPrimaryButton && primaryButtonText && primaryButtonLink && (
        <Button asChild>
          <Link href={primaryButtonLink}>{primaryButtonText}</Link>
        </Button>
      )}
      {showSecondaryButton && secondaryButtonText && secondaryButtonLink && (
        <Button asChild>
          <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
        </Button>
      )}
    </div>
  );
}
