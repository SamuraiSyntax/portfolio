import { ContactForm } from "@/components/admin/dashboard/contact/contact-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewContactPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin");
  }

  return (
    <div className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
      <ContactForm />
    </div>
  );
}
