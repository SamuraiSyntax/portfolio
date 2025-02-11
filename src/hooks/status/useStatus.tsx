import { ContactStatus } from "@/types/contact";

export const getStatusColor = (status: ContactStatus | undefined) => {
  const colors = {
    NEW: "bg-blue-100 text-blue-800",
    LEAD: "bg-purple-100 text-purple-800",
    QUALIFIED: "bg-blue-100 text-blue-800",
    QUALIFIED_LEAD: "bg-green-100 text-green-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    OPPORTUNITY: "bg-orange-100 text-orange-800",
    NEGOTIATION: "bg-red-100 text-red-800",
    CONVERTED: "bg-green-100 text-green-800",
    WON: "bg-green-100 text-green-800",
    LOST: "bg-red-100 text-red-800",
    INACTIVE: "bg-gray-100 text-gray-800",
    ARCHIVED: "bg-gray-100 text-gray-800",
  };
  return colors[status || "NEW"];
};

export const getStatusLabel = (status: ContactStatus | undefined) => {
  const labels = {
    NEW: "Nouveau",
    LEAD: "Lead",
    QUALIFIED: "Qualifié",
    QUALIFIED_LEAD: "Qualifié Lead",
    IN_PROGRESS: "En cours",
    OPPORTUNITY: "Opportunité",
    NEGOTIATION: "Négociation",
    CONVERTED: "Converti",
    WON: "Gagné",
    LOST: "Perdu",
    INACTIVE: "Inactif",
    ARCHIVED: "Archivé",
  };
  return labels[status || "NEW"];
};

export const STATUS_OPTIONS = [
  { value: "NEW", label: "Nouveau" },
  { value: "IN_PROGRESS", label: "En cours" },
  { value: "COMPLETED", label: "Terminé" },
  { value: "ARCHIVED", label: "Archivé" },
];
