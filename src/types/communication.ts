export interface Communication {
  id: string;
  type: "EMAIL" | "PHONE" | "MEETING";
  subject?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
