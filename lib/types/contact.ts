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
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
  phone: z.string().optional(),
  company: z.string().optional(),
  clientType: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  existingSite: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
