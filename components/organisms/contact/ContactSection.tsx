"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ContactForm } from "@/components/contact/ContactForm";
import { motion } from "framer-motion";

interface ContactSectionProps {
  color?: string;
  colorReverse?: string;
  utility?: number;
  reverse?: boolean;
  waveType?: "type1" | "type2" | "type3";
  utilityReverse?: number;
  zIndex?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function ContactSection({
  color = "background",
  colorReverse,
  utility,
  reverse = false,
  waveType = "type1",
  utilityReverse,
  zIndex = 10,
  title = "Me Contacter",
  subtitle = "Discutons de votre projet",
  description = "Expert en développement WordPress, je vous aide à créer votre site web avec des solutions adaptées.",
  className = "",
}: ContactSectionProps) {
  // Classes spécifiques pour mobile
  const mobileClasses = {
    section: "py-12 px-4",
    container: "py-8 gap-4",
    title: "text-center px-2",
    form: "px-0",
  };

  // Classes spécifiques pour desktop
  const desktopClasses = {
    section: "lg:py-20 lg:px-8",
    container: "lg:py-16 lg:gap-8",
    title: "lg:px-4",
    form: "lg:px-4 lg:max-w-2xl lg:mx-auto",
  };

  const containerClass = `min-h-screen relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  } ${mobileClasses.section} ${desktopClasses.section} ${className}`;

  return (
    <section className={containerClass} style={{ zIndex }}>
      <SectionDivider
        color={color}
        colorReverse={colorReverse}
        utility={utilityReverse}
        reverse={reverse}
        waveType={waveType}
      />

      <div
        className={`container mx-auto flex flex-col ${mobileClasses.container} ${desktopClasses.container}`}
      >
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
        />

        <motion.div
          className={`w-full group ${mobileClasses.form} ${desktopClasses.form}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContactForm onClose={() => {}} />
        </motion.div>
      </div>
    </section>
  );
}
