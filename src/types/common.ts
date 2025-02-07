// Types communs partagés entre Contact et Project
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  status?: string;
  priority?: string;
}

export interface BusinessInfo {
  company?: string | null;
  industry?: string | null;
  companySize?: string | null;
  position?: string | null;
  annualRevenue?: number | null;
}

export interface ContactInfo {
  email: string;
  phone?: string | null;
  preferredContactMethod?: string | null;
}

export interface ProjectInfo {
  budget?: number | null;
  deadline?: Date | null;
  existingSite?: string | null;
}
