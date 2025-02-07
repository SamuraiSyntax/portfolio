import {
  ContactStatus as PrismaContactStatus,
  Priority as PrismaPriority,
} from "@prisma/client";
import { BaseEntity, BusinessInfo, ContactInfo, ProjectInfo } from "./common";

export type ContactStatus = PrismaContactStatus;
export type Priority = PrismaPriority;

export const ContactStatus = PrismaContactStatus;
export const Priority = PrismaPriority;

export interface Contact
  extends BaseEntity,
    BusinessInfo,
    ContactInfo,
    ProjectInfo {
  message: string;
  clientType?: string | null;
  projectType?: string | null;
  lastContact?: Date | null;
  nextFollowUp?: Date | null;
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
