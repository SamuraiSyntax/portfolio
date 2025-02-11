import {
  ActivityLog,
  Comment,
  Document,
  Phase,
  PhaseStatus,
  Project as PrismaProject,
  ProjectPriority,
  ProjectStatus,
  Risk,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { JsonValue } from "type-fest";
import { Contact } from "./contact";

// Types de base pour les utilisateurs du projet
export interface ProjectUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string;
}

// Type pour le gestionnaire de projet
export interface ProjectManagerUser extends ProjectUser {
  lastLogin: Date | null;
  preferences?: JsonValue;
  emailVerified: Date | null;
}

// Type pour les phases du projet
export interface ProjectPhase extends Omit<Phase, "responsibleUser"> {
  responsibleUser: ProjectUser;
  status: PhaseStatus;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  startDate: Date;
  estimatedDeliveryDate: Date;
  completionDate: Date | null;
  nextFollowUp: Date | null;

  description: string;
  team?: string;
  objectives?: string[];
}

// Type pour les risques du projet
export type ProjectRisk = Risk;

// Type pour les activités récentes
export interface ProjectActivity extends ActivityLog {
  user: {
    name: string | null;
    image: string | null;
  } | null;
}

// Type principal du projet avec toutes les relations
export interface ProjectWithRelations extends Project {
  documents?: Document[];
  comments?: Comment[];
  client: Contact & {
    annualRevenue: number | null;
    companySize: string | null;
    industry: string | null;
    position: string | null;
    preferredContactMethod: string | null;

    lastContact: Date | null;
    nextFollowUp: Date | null;
    status: string;
    priority: string;
  };
  projectManagerUser?: ProjectManagerUser | null;
  phases?: ProjectPhase[];
  risks?: ProjectRisk[];
  recentActivities?: ProjectActivity[];
  objectives: string[];
  assumptions: string[];
  scopeIncluded: string[];
  scopeExcluded: string[];
  technicalConstraints: string;
  budgetConstraints: string;
  legalConstraints: string;
  integrationDetails: string;

  nextSteps: string[];
  deliverables: string[];
  validationSteps: string[];
  securityMeasures: string;
  contingencyPlan: string;
}

// Type de base du projet
export interface Project extends PrismaProject {
  id: string;
  name: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: Date;
  estimatedDeliveryDate: Date;
  client: Contact;
  projectManagerUser?: ProjectUser | null;
  phases?: ProjectPhase[];

  risks?: ProjectRisk[];
  technologies: string[];
  budget: Decimal;
  context: string;
  objectives: string[];
  scopeIncluded: string[];
  scopeExcluded: string[];
  technicalConstraints: string;

  budgetConstraints: string;
  legalConstraints: string;
  integrationDetails: string;
  nextSteps: string[];
  deliverables: string[];
  validationSteps: string[];
  securityMeasures: string;
  contingencyPlan: string;
  assumptions: string[];
  repositoryUrl?: string;
  stagingUrl?: string;
}

// Types pour les opérations CRUD
export type ProjectCreateInput = Omit<
  Project,
  "id" | "createdAt" | "updatedAt"
>;

export type ProjectUpdateInput = Partial<ProjectCreateInput>;

// Type de base pour les champs PDF
type PDFFields = {
  technicalConstraints?: string;
  budgetConstraints?: string;
  context?: string;
  legalConstraints?: string;
  integrationDetails?: string;
  nextSteps?: string[];
  deliverables?: string[];
  validationSteps?: string[];
  securityMeasures?: string;
  contingencyPlan?: string;
};

// Type pour le projet étendu (utilisé dans le PDF)
export type ExtendedProject = Omit<Project, keyof PDFFields> &
  PDFFields & {
    phases?: ProjectPhase[];
    risks?: ProjectRisk[];
    clientName?: string;
  };

// Types pour les filtres et le tri
export interface ProjectFilters {
  status?: string;
  clientId?: string;
  projectManagerId?: string;
  startDate?: Date;
  endDate?: Date;
  search?: string;
}

export interface ProjectSort {
  field: keyof Project;
  direction: "asc" | "desc";
}

// Types pour les vues
export type ProjectView = "all" | "active" | "completed" | "archived";
