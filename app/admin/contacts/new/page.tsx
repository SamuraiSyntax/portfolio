import { ContactForm } from "@/components/admin/dashboard/contact/contact-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewContactPage() {
  const session = await auth();

  if (!session) {
    redirect("/admin");
  }

  return (
    <div className="p-4">
      <ContactForm />
    </div>
  );
}
