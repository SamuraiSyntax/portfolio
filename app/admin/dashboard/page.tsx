import { ContactTable } from "@/components/admin/dashboard/contact/contact-table";
import { ProfileCard } from "@/components/admin/dashboard/profile-card";
import { QuickActions } from "@/components/admin/dashboard/quick-actions";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin");
  }

  const contacts = await prisma.contact.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      name: true,
      email: true,
      phone: true,
      company: true,
      position: true,
      message: true,
      projectType: true,
      projectScope: true,
      budget: true,
      deadline: true,
      existingSite: true,
      targetAudience: true,
      competitors: true,
      objectives: true,
      clientType: true,
      industry: true,
      companySize: true,
      annualRevenue: true,
      preferredContactMethod: true,
      marketingSource: true,
      newsletter: true,
      lastContact: true,
      nextFollowUp: true,
      notes: true,
      assignedTo: true,
      attachments: true,
      status: true,
      priority: true,
      tags: true,
      quotationAmount: true,
      contractValue: true,
      ipAddress: true,
      userAgent: true,
      locale: true,
      timezone: true,
    },
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto w-full h-full">
        <div className="col-span-1 order-1">
          <ProfileCard session={session} />
        </div>
        <div className="col-span-1 order-2">
          <QuickActions />
        </div>
      </div>

      <ContactTable contacts={contacts} defaultView="recent" />
    </div>
  );
}
