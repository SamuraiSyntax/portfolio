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
    section: "py-5 px-4",
    title: "h2",
    highlight: "h3",
    subtitle: "h4",
    button: "px-4 py-2 text-base",
  };

  // Classes spécifiques pour desktop
  const desktopClasses = {
    section: "lg:py-24 lg:px-8",
    title: "h2",
    highlight: "h3",
    subtitle: "h4",
    button: "lg:px-8 lg:py-3 lg:text-lg",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center gap-2"
    >
      <h2
        className={`font-bold text-foreground ${mobileClasses.title} ${desktopClasses.title}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-primary block ${mobileClasses.highlight} ${desktopClasses.highlight}`}
        >
          {subtitle}
        </p>
      )}
      {description && (
        <p
          className={`text-muted-foreground ${mobileClasses.subtitle} ${desktopClasses.subtitle}`}
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
    </motion.div>
  );
}
