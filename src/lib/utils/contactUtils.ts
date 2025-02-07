import { ContactStatus, Priority } from "@/types/contact";

export const contactUtils = {
  getStatusColor(status: ContactStatus): string {
    const colors = {
      [ContactStatus.NEW]: "bg-blue-100 text-blue-800",
      [ContactStatus.IN_PROGRESS]: "bg-yellow-100 text-yellow-800",
      [ContactStatus.COMPLETED]: "bg-green-100 text-green-800",
      [ContactStatus.ARCHIVED]: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  },

  getPriorityColor(priority: Priority): string {
    const colors = {
      [Priority.LOW]: "bg-gray-100 text-gray-800",
      [Priority.NORMAL]: "bg-blue-100 text-blue-800",
      [Priority.HIGH]: "bg-yellow-100 text-yellow-800",
      [Priority.URGENT]: "bg-red-100 text-red-800",
    };
    return colors[priority];
  },

  formatCurrency(amount: number | null): string {
    if (!amount) return "-";
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  },

  formatDate(date: Date | null): string {
    if (!date) return "-";
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  },
};
