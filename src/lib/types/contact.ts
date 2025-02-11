import * as z from "zod";

// Types de clients
export const clientTypes = [
  { value: "pme", label: "Entreprise locale / PME" },
  { value: "startup", label: "Startup" },
  { value: "ecommerce", label: "E-commerçant" },
  { value: "agence", label: "Agence de communication/web" },
  { value: "freelance", label: "Indépendant/Freelance" },
  { value: "association", label: "Association/ONG" },
  { value: "formation", label: "Formation/Coaching" },
  { value: "artiste", label: "Artiste/Créateur/Influenceur" },
  { value: "corporate", label: "Grand compte" },
  { value: "evenementiel", label: "Événementiel" },
  { value: "public", label: "Secteur public" },
  { value: "media", label: "Blogueur/Média" },
  { value: "horeca", label: "Hôtellerie/Restauration" },
] as const;

// Types de projets selon le type de client
export const projectTypes = {
  pme: ["site-vitrine", "e-commerce", "seo"],
  startup: ["application", "mvp", "saas"],
  ecommerce: ["boutique-en-ligne", "woocommerce", "maintenance"],
  agence: ["sous-traitance", "renfort", "wordpress"],
  freelance: ["portfolio", "site-vitrine", "seo"],
  association: ["site-donation", "site-benevoles", "communication"],
  formation: ["lms", "reservation", "coaching"],
  artiste: ["portfolio", "blog", "e-commerce"],
  corporate: ["microsite", "landing-page", "sur-mesure"],
  evenementiel: ["site-evenement", "inscription", "interactif"],
  public: ["institutionnel", "accessibilite", "portail"],
  media: ["blog", "monetisation", "seo"],
  horeca: ["site-vitrine", "reservation", "commande-en-ligne"],
} as const;

export type ClientType = (typeof clientTypes)[number]["value"];

// Schéma de base avec les champs requis
export const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(100),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100),
  email: z.string().email("Email invalide").max(255),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000),
  phone: z.string().max(20).optional(),
  company: z.string().max(255).optional(),
  clientType: z.string().max(50).optional(),
  projectType: z.string().max(50).optional(),
  budget: z.number().optional().nullable(),
  deadline: z.string().optional(),
  existingSite: z.string().max(255).optional(),
  status: z.enum(["NEW", "LEAD", "QUALIFIED"]).optional(),
  source: z.enum(["WEBSITE", "SOCIAL_MEDIA", "REFERRAL"]).optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).optional(),
  newsletter: z.boolean().optional(),
  metadata: z.record(z.any()).optional(),
});

export type FormValues = z.infer<typeof formSchema>;
