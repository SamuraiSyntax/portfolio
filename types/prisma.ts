import { Prisma, Contact as PrismaContactModel } from "@prisma/client";

export type PrismaContact = PrismaContactModel & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  message: string;
  phone: string | null;
  company: string | null;
  clientType: string | null;
  projectType: string | null;
  budget: number | null;
  deadline: Date | null;
  existingSite: string | null;
  status: string;
  priority: string;
  annualRevenue: number | null;
  assignedTo: string | null;
  attachments: string[] | null;
  companySize: string | null;
  competitors: string[] | null;
  contractValue: number | null;
  industry: string | null;
  ipAddress: string | null;
  lastContact: Date | null;
  locale: string | null;
  marketingSource: string | null;
  newsletter: boolean | null;
  nextFollowUp: Date | null;
  notes: string | null;
  objectives: string[] | null;
  position: string | null;
  preferredContactMethod: string | null;
  projectScope: string | null;
  quotationAmount: number | null;
  tags: string[] | null;
  targetAudience: string[] | null;
  timezone: string | null;
  userAgent: string | null;
};

export type ContactPayload = Prisma.ContactCreateInput;
