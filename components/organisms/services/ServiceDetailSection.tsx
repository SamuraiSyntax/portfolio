"use client";

import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ServiceDetailCard } from "@/components/molecules/services/ServiceDetailCard";
import { useServices } from "@/hooks/useWordPress";
import { motion } from "motion/react";

export function ServiceDetailSection({
  color,
  waveType,
  zIndex,
}: {
  color?: string;
  waveType?: "type1" | "type2" | "type3";
  zIndex?: number;
}) {
  const { data: services, isLoading } = useServices();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className={`min-h-screen relative bg-${color}`} style={{ zIndex }}>
      <SectionDivider color={color || "muted"} waveType={waveType} />
      <div className="container mx-auto py-5 flex flex-col gap-6">
        <SectionTitle
          title="Mes Services"
          subtitle="Solutions Complètes"
          description="Découvrez l'ensemble de mes services, de la création de sites WordPress aux solutions web modernes."
        />

        <div className="px-5 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="sticky top-0"
            >
              <ServiceDetailCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
