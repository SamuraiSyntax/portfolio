export const APP_CONFIG = {
  contactsPerPage: 10,
  maxAttachmentSize: 5 * 1024 * 1024, // 5MB
  supportedFileTypes: ["image/jpeg", "image/png", "application/pdf"],
  dateFormat: "dd/MM/yyyy",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  maxRetries: 3,
  requestTimeout: 5000, // 5 secondes
};

export const CONTACT_STATUS_LABELS: Record<string, string> = {
  NEW: "Nouveau",
  IN_PROGRESS: "En cours",
  COMPLETED: "Terminé",
  ARCHIVED: "Archivé",
} as const;

export const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Basse",
  NORMAL: "Normale",
  HIGH: "Haute",
  URGENT: "Urgente",
} as const;

export const ERROR_MESSAGES = {
  FETCH_ERROR: "Erreur lors de la récupération des données",
  UPDATE_ERROR: "Erreur lors de la mise à jour",
  NETWORK_ERROR: "Erreur de connexion réseau",
  VALIDATION_ERROR: "Erreur de validation des données",
} as const;
