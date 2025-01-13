export enum ContactStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
}

export enum Priority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

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
