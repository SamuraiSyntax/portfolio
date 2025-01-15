import {
  Contact as PrismaContact,
  ContactStatus as PrismaContactStatus,
  Priority as PrismaPriority,
} from "@prisma/client";

export type ContactStatus = PrismaContactStatus;
export type Priority = PrismaPriority;

export const ContactStatus = PrismaContactStatus;
export const Priority = PrismaPriority;

export type Contact = Omit<
  PrismaContact,
  | "budget"
  | "annualRevenue"
  | "contractValue"
  | "quotationAmount"
  | "tags"
  | "competitors"
  | "objectives"
  | "attachments"
> & {
  budget: number | null;
  annualRevenue: number | null;
  contractValue: number | null;
  quotationAmount: number | null;
  tags: string[];
  competitors: string[];
  objectives: string[];
  attachments: string[];
};

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
