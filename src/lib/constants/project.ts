export const QUOTE_STATUS = {
  DRAFT: { label: "Brouillon", variant: "secondary" },
  SENT: { label: "Envoyé", variant: "default" },
  ACCEPTED: { label: "Accepté", variant: "success" },
  REJECTED: { label: "Refusé", variant: "destructive" },
  EXPIRED: { label: "Expiré", variant: "warning" },
} as const;

export const PROJECT_STATUS = {
  NOT_STARTED: { label: "Non démarré", variant: "secondary" },
  IN_PROGRESS: { label: "En cours", variant: "default" },
  COMPLETED: { label: "Terminé", variant: "success" },
  ON_HOLD: { label: "En pause", variant: "warning" },
  CANCELLED: { label: "Annulé", variant: "destructive" },
} as const;

export const INVOICE_STATUS = {
  DRAFT: { label: "Brouillon", variant: "secondary" },
  SENT: { label: "Envoyé", variant: "default" },
  PAID: { label: "Payé", variant: "success" },
  OVERDUE: { label: "En retard", variant: "destructive" },
  CANCELLED: { label: "Annulé", variant: "outline" },
} as const;
