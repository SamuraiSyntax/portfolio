export const APP_CONFIG = {
  contactsPerPage: 10,
  maxAttachmentSize: 5 * 1024 * 1024, // 5MB
  supportedFileTypes: ["image/jpeg", "image/png", "application/pdf"],
  dateFormat: "dd/MM/yyyy",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  maxRetries: 3,
  requestTimeout: 5000, // 5 secondes
};

export const CONTACT_STATUS_LABELS: Record<
  string,
  { label: string; variant: string }
> = {
  NEW: { label: "Nouveau", variant: "secondary" },
  LEAD: { label: "Lead", variant: "default" },
  QUALIFIED: { label: "Qualifié", variant: "success" },
  QUALIFIED_LEAD: { label: "Lead qualifié", variant: "default" },
  IN_PROGRESS: { label: "En cours", variant: "default" },
  OPPORTUNITY: { label: "Opportunité", variant: "default" },
  NEGOTIATION: { label: "En négociation", variant: "default" },
  CONVERTED: { label: "Converti", variant: "success" },
  WON: { label: "Gagné", variant: "success" },
  LOST: { label: "Perdu", variant: "destructive" },
  INACTIVE: { label: "Inactif", variant: "outline" },
  ARCHIVED: { label: "Archivé", variant: "outline" },
} as const;

export const CONTACT_SOURCE_LABELS: Record<
  string,
  { label: string; variant: string }
> = {
  WEBSITE: { label: "Site web", variant: "default" },
  SOCIAL_MEDIA: { label: "Réseaux sociaux", variant: "default" },
  REFERRAL: { label: "Recommandation", variant: "default" },
  EVENT: { label: "Événement", variant: "default" },

  COLD_CALL: { label: "Appel à froid", variant: "default" },
  COLD_OUTREACH: { label: "Prospection à froid", variant: "default" },
  PARTNERSHIP: { label: "Partenariat", variant: "default" },
  ADVERTISING: { label: "Publicité", variant: "default" },

  OTHER: { label: "Autre", variant: "default" },
} as const;

export const PRIORITY_LABELS: Record<
  string,
  { label: string; variant: string }
> = {
  LOW: { label: "Basse", variant: "default" },
  NORMAL: { label: "Normale", variant: "default" },
  HIGH: { label: "Haute", variant: "default" },
  URGENT: { label: "Urgente", variant: "default" },
} as const;

export const PREFERRED_CONTACT_METHOD_LABELS: Record<
  string,
  { label: string; variant: string }
> = {
  EMAIL: { label: "Email", variant: "default" },
  PHONE: { label: "Téléphone", variant: "default" },
  VIDEO_CALL: { label: "Visioconférence", variant: "default" },
  IN_PERSON: { label: "En personne", variant: "default" },
} as const;

export const ERROR_MESSAGES = {
  FETCH_ERROR: {
    label: "Erreur lors de la récupération des données",
    variant: "destructive",
  },
  UPDATE_ERROR: {
    label: "Erreur lors de la mise à jour",
    variant: "destructive",
  },
  NETWORK_ERROR: {
    label: "Erreur de connexion réseau",
    variant: "destructive",
  },
  VALIDATION_ERROR: {
    label: "Erreur de validation des données",
    variant: "destructive",
  },
} as const;
