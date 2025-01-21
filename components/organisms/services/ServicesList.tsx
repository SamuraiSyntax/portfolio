"use client";

import { ServiceCard } from "@/components/molecules/services/ServiceCard";
import { WPService } from "@/types/wordpress";

interface ServicesListProps {
  services: WPService[];
}

export function ServicesList({ services }: ServicesListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          openAccordion={null}
          setOpenAccordion={() => {}}
        />
      ))}
    </div>
  );
}
