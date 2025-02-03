import { Priority } from "@/types/contact";

export const getPriorityColor = (priority: Priority | undefined) => {
  const colors = {
    LOW: "bg-gray-100 text-gray-800",
    NORMAL: "bg-blue-100 text-blue-800",
    HIGH: "bg-yellow-100 text-yellow-800",
    URGENT: "bg-red-100 text-red-800",
  };
  return colors[priority || "LOW"];
};

export const getPriorityLabel = (priority: Priority | undefined) => {
  const labels = {
    LOW: "Faible",

    NORMAL: "Normal",
    HIGH: "Élevé",
    URGENT: "Urgent",
  };
  return labels[priority || "LOW"];
};
