import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { jsonToStringArray } from "@/lib/utils";
import { ProjectWithRelations } from "@/types/project";
import { motion } from "framer-motion";
import {
  FileIcon,
  Github,
  Globe,
  Link2,
  Lock,
  Server,
  Shield,
  Workflow,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

interface TechnicalLinkCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
}

const TechnicalLinkCard = ({
  icon,
  title,
  value,
  subtitle,
}: TechnicalLinkCardProps) => {
  if (!value) return null;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <div>
            <h3 className="font-semibold">{title}</h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline flex items-center gap-2 text-sm"
        >
          <Link2 className="h-4 w-4" />
          {value}
        </a>
      </CardContent>
    </Card>
  );
};

interface TechnicalSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const TechnicalSection = ({ icon, title, children }: TechnicalSectionProps) => (
  <Card className="hover:shadow-md transition-shadow duration-200">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export function InfosTech({ project }: { project: ProjectWithRelations }) {
  const technologies = jsonToStringArray(project.technologies);
  const environments = [
    {
      icon: <Globe className="text-green-500 h-5 w-5" />,
      title: "URL Production",
      value: project.productionUrl,
      subtitle: "Environnement de production",
    },
    {
      icon: <Server className="text-purple-500 h-5 w-5" />,
      title: "URL Staging",
      value: project.stagingUrl,
      subtitle: "Environnement de test",
    },
    {
      icon: <Github className="text-gray-900 h-5 w-5" />,
      title: "Repository",
      value: project.repositoryUrl,
      subtitle: "Code source",
    },
  ];

  return (
    <motion.div className="space-y-6" {...fadeIn}>
      {/* URLs et Repository */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {environments.map(
          (env, index) =>
            env.value && (
              <TechnicalLinkCard
                key={index}
                icon={env.icon}
                title={env.title}
                value={env.value}
                subtitle={env.subtitle}
              />
            )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technologies */}
        <TechnicalSection
          icon={<Workflow className="h-5 w-5 text-blue-500" />}
          title="Technologies et stack technique"
        >
          <div className="flex flex-wrap gap-2">
            {technologies.length > 0 ? (
              technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors duration-200"
                >
                  {tech}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground">
                Aucune technologie spécifiée
              </p>
            )}
          </div>
        </TechnicalSection>

        {/* Sécurité */}
        <TechnicalSection
          icon={<Shield className="h-5 w-5 text-red-500" />}
          title="Mesures de sécurité"
        >
          {project.securityMeasures ? (
            <div className="space-y-3">
              {project.securityMeasures.split("\n").map((measure, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Lock className="h-4 w-4 text-red-500 mt-1 shrink-0" />
                  <p className="text-muted-foreground">{measure}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Aucune mesure de sécurité spécifiée
            </p>
          )}
        </TechnicalSection>

        {/* Détails d'intégration */}
        {project.integrationDetails && (
          <TechnicalSection
            icon={<FileIcon className="h-5 w-5 text-orange-500" />}
            title="Détails d'intégration"
          >
            <p className="text-muted-foreground whitespace-pre-wrap">
              {project.integrationDetails}
            </p>
          </TechnicalSection>
        )}
      </div>
    </motion.div>
  );
}
