import {
  ContactStatus as PrismaContactStatus,
  Priority as PrismaPriority,
} from "@prisma/client";

export type ContactStatus = PrismaContactStatus;
export type Priority = PrismaPriority;

export const ContactStatus = PrismaContactStatus;
export const Priority = PrismaPriority;

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  position: string | null;
  message: string;
  projectType: string | null;
  projectScope: string | null;
  budget: number | null;
  deadline: Date | null;
  existingSite: string | null;
  status: ContactStatus;
  priority: Priority;
  tags: string[];
  targetAudience: string | null;
  competitors: string[];
  objectives: string[];
  clientType: string | null;
  industry: string | null;
  companySize: string | null;
  annualRevenue: number | null;
  preferredContactMethod: string | null;
  marketingSource: string | null;
  newsletter: boolean;
  lastContact: Date | null;
  nextFollowUp: Date | null;
  notes: string | null;
  assignedTo: string | null;
  attachments: string[];
  quotationAmount: number | null;
  contractValue: number | null;
  ipAddress: string | null;
  userAgent: string | null;
  locale: string | null;
  timezone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactFilters {
  status?: ContactStatus;
  priority?: Priority;
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface ContactSort {
  field: keyof Contact;
  direction: "asc" | "desc";
}

export type ContactView = "all" | "recent" | "archived";
