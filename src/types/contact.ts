import {
  ContactSource as PrismaContactSource,
  ContactStatus as PrismaContactStatus,
  PreferredContactMethod as PrismaPreferredContactMethod,
  Priority as PrismaPriority,
} from "@prisma/client";
import * as z from "zod";
import { BaseEntity, BusinessInfo, ContactInfo, ProjectInfo } from "./common";

export type ContactStatus = PrismaContactStatus;
export type ContactSource = PrismaContactSource;
export type Priority = PrismaPriority;
export type PreferredContactMethod = PrismaPreferredContactMethod;

export const ContactStatus = PrismaContactStatus;
export const ContactSource = PrismaContactSource;
export const Priority = PrismaPriority;
export const PreferredContactMethod = PrismaPreferredContactMethod;

export interface Contact
  extends BaseEntity,
    BusinessInfo,
    ContactInfo,
    ProjectInfo {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  mobilePhone?: string | null;
  position?: string | null;
  locale?: string | null;
  timezone?: string | null;
  preferredContactMethod?: PreferredContactMethod | null;
  preferredContactMethodLabel?: string;

  company?: string | null;
  website?: string | null;
  industry?: string | null;
  companySize?: string | null;
  annualRevenue?: number | null;

  message: string;
  clientType?: string | null;
  projectType?: string | null;
  projectScope?: string | null;
  budget?: number | null;
  deadline?: Date | null;
  existingSite?: string | null;
  objectives?: string[] | null;
  targetAudience?: string | null;
  competitors?: string[] | null;

  status: ContactStatus;
  statusLabel: string;
  priority: Priority;
  priorityLabel: string;
  source: ContactSource;
  sourceLabel: string;
  leadScore?: number | null;
  potentialValue?: number | null;
  lastContactDate?: Date | null;
  nextFollowUp?: Date | null;
  assignedUserId?: string | null;

  marketingSource?: string | null;
  newsletter: boolean;
  tags?: string[] | null;

  ipAddress?: string | null;
  userAgent?: string | null;

  totalRevenue?: number | null;
  contractValue?: number | null;
  quotationAmount?: number | null;

  metadata?: Record<string, string | number | boolean | null> | null;
}

export const contactFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().nullable().optional(),
  mobilePhone: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  message: z.string(),
  clientType: z.string().nullable().optional(),
  projectType: z.string().nullable().optional(),
  budget: z.number().nullable().optional(),
  deadline: z.date().nullable().optional(),
  existingSite: z.string().nullable().optional(),
  status: z.nativeEnum(ContactStatus),
  priority: z.nativeEnum(Priority),
  source: z.nativeEnum(ContactSource),
  industry: z.string().nullable().optional(),
  companySize: z.string().nullable().optional(),
  annualRevenue: z.number().nullable().optional(),
  preferredContactMethod: z
    .nativeEnum(PreferredContactMethod)
    .nullable()
    .optional(),
  nextFollowUp: z.date().nullable().optional(),
  marketingSource: z.string().nullable().optional(),
  newsletter: z.boolean().default(false),
  locale: z.string().nullable().optional(),
  timezone: z.string().nullable().optional(),
  projectScope: z.string().nullable().optional(),
  targetAudience: z.string().nullable().optional(),
  quotationAmount: z.number().nullable().optional(),
  contractValue: z.number().nullable().optional(),
  assignedUserId: z.string().nullable().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactFilters {
  status?: ContactStatus;
  priority?: Priority;
  source?: ContactSource;
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  assignedTo?: string;
  tags?: string[];
}

export interface ContactSort {
  field: keyof Contact;
  direction: "asc" | "desc";
}

export type ContactView =
  | "all"
  | "recent"
  | "archived"
  | "leads"
  | "opportunities";
