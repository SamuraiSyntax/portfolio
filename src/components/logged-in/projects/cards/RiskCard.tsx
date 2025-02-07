import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Risk, RiskImpact, RiskProbability } from "@prisma/client";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

const impactColors = {
  FAIBLE: "text-green-500",
  MOYEN: "text-orange-500",
  ELEVE: "text-red-500",
};

const probabilityColors = {
  FAIBLE: "text-green-500",
  MOYENNE: "text-orange-500",
  ELEVEE: "text-red-500",
};

const impactLabels = {
  FAIBLE: "Faible",
  MOYEN: "Moyen",
  ELEVE: "Élevé",
};

const probabilityLabels = {
  FAIBLE: "Faible",
  MOYENNE: "Moyenne",
  ELEVEE: "Élevée",
};

interface RiskSelectProps {
  value: RiskImpact | RiskProbability;
  onValueChange: (value: RiskImpact | RiskProbability) => void;
  options: Record<string, string>;
  colors: Record<string, string>;
  placeholder: string;
  isDisabled?: boolean;
}

const RiskSelect = ({
  value,
  onValueChange,
  options,
  colors,
  placeholder,
  isDisabled,
}: RiskSelectProps) => (
  <Select value={value} onValueChange={onValueChange} disabled={isDisabled}>
    <SelectTrigger
      className={`w-[140px] ${colors[value as keyof typeof colors]}`}
    >
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(options).map(([key, label]) => (
        <SelectItem
          key={key}
          value={key}
          className={colors[key as keyof typeof colors]}
        >
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export function RiskCard({ risk }: { risk: Risk }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleRiskUpdate = async (
    field: "impact" | "probability",
    value: RiskImpact | RiskProbability
  ) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/projects/${risk.projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "risk",
          riskId: risk.id,
          [field]: value,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la mise à jour du ${field}`);
      }

      toast.success(
        `${field === "impact" ? "Impact" : "Probabilité"} mis à jour`
      );
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error(
        `Erreur lors de la mise à jour ${
          field === "impact" ? "de l'impact" : "de la probabilité"
        }`
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const getRiskSeverity = () => {
    const impactScore = { FAIBLE: 1, MOYEN: 2, ELEVE: 3 }[risk.impact];
    const probScore = { FAIBLE: 1, MOYENNE: 2, ELEVEE: 3 }[risk.probability];
    return impactScore * probScore;
  };

  const severityColor = () => {
    const score = getRiskSeverity();
    if (score <= 2) return "border-l-4 border-l-green-500";
    if (score <= 6) return "border-l-4 border-l-orange-500";
    return "border-l-4 border-l-red-500";
  };

  return (
    <motion.div {...fadeIn}>
      <Card className={`hover:shadow-md transition-all ${severityColor()}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Risque identifié
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{risk.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">Impact</span>
              </div>
              <RiskSelect
                value={risk.impact}
                onValueChange={(value) =>
                  handleRiskUpdate("impact", value as RiskImpact)
                }
                options={impactLabels}
                colors={impactColors}
                placeholder="Impact"
                isDisabled={isUpdating}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Probabilité</span>
              </div>
              <RiskSelect
                value={risk.probability}
                onValueChange={(value) =>
                  handleRiskUpdate("probability", value as RiskProbability)
                }
                options={probabilityLabels}
                colors={probabilityColors}
                placeholder="Probabilité"
                isDisabled={isUpdating}
              />
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Solution proposée
            </h4>
            <p className="text-sm text-muted-foreground">{risk.solution}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
