"use client";

import { SectionDivider } from "@/components/not-logged/SectionDivider";
import { SectionTitle } from "@/components/not-logged/SectionTitle";
import { ProjectPreviewCard } from "@/components/not-logged/projects/ProjectPreviewCard";
import { useProjects } from "@/hooks/useWordPress";

export function ProjectsPreviewSection({
  color,
  waveType,
  zIndex,
  showPrimaryButton,
  primaryButtonText,
  primaryButtonLink,
  location,
}: {
  color?: string;
  waveType?: "type1" | "type2" | "type3";
  zIndex?: number;
  showPrimaryButton?: boolean;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  location?: {
    name: string;
    department: string;
    region: string;
  };
}) {
  const { data: projects } = useProjects();

  const localizedTitle = location
    ? `Mes Réalisations à ${location.name}`
    : "Mes Projets";

  const localizedDescription = location
    ? `Découvrez une sélection de mes réalisations en développement web pour des clients de ${location.name} et ${location.department}.`
    : "Découvrez une sélection de mes dernières réalisations en développement web, de WordPress à Next.js.";

  return (
    <div id="projets" className="relative group" style={{ zIndex: zIndex }}>
      <SectionDivider
        color={color || "muted"}
        waveType={waveType}
        zIndex={zIndex}
      />
      {/* Section titre */}
      <div className={`bg-${color} py-16`}>
        <div className="container mx-auto">
          <SectionTitle
            title={localizedTitle}
            subtitle={`Réalisations Récentes${
              location ? ` à ${location.name}` : ""
            }`}
            description={localizedDescription}
            showPrimaryButton={showPrimaryButton}
            primaryButtonText={primaryButtonText}
            primaryButtonLink={primaryButtonLink}
          />
        </div>
      </div>

      {/* Projets Grid */}
      <div className={`bg-${color} pb-16 lg:pb-24`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project) => (
              <ProjectPreviewCard
                key={project.id}
                project={project}
                color={color || "muted"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
