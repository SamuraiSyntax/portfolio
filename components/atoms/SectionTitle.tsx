import { motion } from "motion/react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function SectionTitle({
  title,
  subtitle,
  description,
}: SectionTitleProps) {
  const mobileClasses = {
    section: "py-5 px-4",
    title: "text-2xl",
    highlight: "text-xl",
    subtitle: "text-sm",
    button: "px-4 py-2 text-base",
  };

  // Classes spécifiques pour desktop
  const desktopClasses = {
    section: "lg:py-24 lg:px-8",
    title: "lg:text-4xl",
    highlight: "lg:text-3xl",
    subtitle: "lg:text-xl",
    button: "lg:px-8 lg:py-3 lg:text-lg",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 flex flex-col items-center text-center gap-2"
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
    </motion.div>
  );
}
