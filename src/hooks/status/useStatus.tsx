import { ContactStatus } from "@/types/contact";

export const getStatusColor = (status: ContactStatus | undefined) => {
  const colors = {
    NEW: "bg-blue-100 text-blue-800",

    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    ARCHIVED: "bg-gray-100 text-gray-800",
  };
  return colors[status || "NEW"];
};

export const getStatusLabel = (status: ContactStatus | undefined) => {
  const labels = {
    NEW: "Nouveau",
    IN_PROGRESS: "En cours",
    COMPLETED: "Terminé",
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
