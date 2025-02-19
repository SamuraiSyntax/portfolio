"use client";

import { SectionDivider } from "@/components/not-logged/SectionDivider";
import { SectionTitle } from "@/components/not-logged/SectionTitle";
import { ServicePreviewCard } from "@/components/not-logged/services/ServicePreviewCard";
import { useServices } from "@/hooks/useWordPress";
import { motion } from "motion/react";

export function ServicesPreviewSection({
  color,
  waveType,
  zIndex,
  showPrice = false,
  showFeatures = true,
  showDuration = true,
  showPrimaryButton = true,
  showSecondaryButton = true,
  location,
}: {
  color?: string;
  waveType?: "type1" | "type2" | "type3";
  zIndex?: number;
  showPrice?: boolean;
  showFeatures?: boolean;
  showDuration?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  location?: {
    name: string;
    department: string;
    region: string;
  };
}) {
  const { data: services } = useServices();

  const localizedTitle = location
    ? `Solutions Web à ${location.name}`
    : "Solutions Web Professionnelles";

  const localizedDescription = location
    ? `Expert WordPress à ${location.name}, je crée des solutions web performantes et évolutives pour votre entreprise. Du site vitrine à l'e-commerce, chaque projet est conçu pour maximiser votre impact en ligne dans ${location.department}.`
    : "Expert WordPress, je crée des solutions web performantes et évolutives pour votre entreprise. Du site vitrine à l'e-commerce, chaque projet est conçu pour maximiser votre impact en ligne.";

  return (
    <div id="services" className="relative group">
      <SectionDivider
        color={color || "muted"}
        waveType={waveType}
        zIndex={zIndex}
      />

      {/* Section titre */}
      <div className="bg-muted py-16">
        <div className="container mx-auto">
          <SectionTitle
            title={localizedTitle}
            subtitle={`WordPress & Développement Sur Mesure${
              location ? ` à ${location.name}` : ""
            }`}
            description={localizedDescription}
            showPrimaryButton={showPrimaryButton}
            primaryButtonText="Découvrir mes services"
            primaryButtonLink="/services"
            showSecondaryButton={showSecondaryButton}
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="bg-muted pb-16 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServicePreviewCard
                  color={color || "muted"}
                  service={service}
                  showPrice={showPrice}
                  showFeatures={showFeatures}
                  showDuration={showDuration}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
