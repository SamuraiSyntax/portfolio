import { ContactStatus, Priority } from "@prisma/client";

export function calculateConversionRates(data: any[]) {
  return data.map((month) => {
    const newToQualified = (month.qualified / month.new) * 100 || 0;
    const qualifiedToOpportunity =
      (month.opportunity / month.qualified) * 100 || 0;
    const opportunityToWon = (month.won / month.opportunity) * 100 || 0;

    return {
      month: month.month,
      newToQualified,
      qualifiedToOpportunity,
      opportunityToWon,
    };
  });
}

export function formatStatusLabel(status: ContactStatus): string {
  const statusMap: Record<ContactStatus, string> = {
    NEW: "Nouveau",
    LEAD: "Lead",
    QUALIFIED: "Qualifié",
    QUALIFIED_LEAD: "Lead Qualifié",
    OPPORTUNITY: "Opportunité",
    IN_PROGRESS: "En cours",
    NEGOTIATION: "Négociation",
    CONVERTED: "Converti",
    WON: "Gagné",
    LOST: "Perdu",
    INACTIVE: "Inactif",
    ARCHIVED: "Archivé",
  };

  return statusMap[status] || status;
}

export function getPriorityColor(priority: Priority): string {
  const colorMap: Record<Priority, string> = {
    LOW: "bg-blue-100 text-blue-800",
    NORMAL: "bg-green-100 text-green-800",
    HIGH: "bg-yellow-100 text-yellow-800",
    URGENT: "bg-red-100 text-red-800",
  };

  return colorMap[priority] || "bg-gray-100 text-gray-800";
}
