import { ContactForm } from "@/components/logged-in/dashboard/contact/contact-form";

export default async function NewContactPage() {
  return (
    <div className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
      <ContactForm />
    </div>
  );
}
