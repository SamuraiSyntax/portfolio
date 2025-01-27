"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ServicePreviewCard } from "@/components/molecules/services/ServicePreviewCard";
import { useServices } from "@/hooks/useWordPress";
import { motion } from "motion/react";

export function ServicesPreviewSection({
  color,
  waveType,
  zIndex,
  showPrice = true,
  showFeatures = true,
  showDuration = true,
  showPrimaryButton = true,
  showSecondaryButton = true,
}: {
  color?: string;
  waveType?: "type1" | "type2" | "type3";
  zIndex?: number;
  showPrice?: boolean;
  showFeatures?: boolean;
  showDuration?: boolean;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
}) {
  const { data: services } = useServices();

  return (
    <div id="services" className="relative">
      <SectionDivider
        color={color || "muted"}
        waveType={waveType}
        zIndex={zIndex}
      />

      {/* Section titre */}
      <div className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto">
          <SectionTitle
            title="Mes Services"
            subtitle="Solutions WordPress & Web"
            description="Spécialisé en WordPress, je propose des services adaptés à vos besoins, de la création de site à la maintenance, en passant par l'e-commerce."
            showPrimaryButton={showPrimaryButton}
            primaryButtonText="Voir mes services"
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
