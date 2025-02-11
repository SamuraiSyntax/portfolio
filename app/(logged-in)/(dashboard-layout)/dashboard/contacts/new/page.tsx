import { EditContactForm } from "@/components/logged-in/contacts/form/EditContactForm";

export default async function NewContactPage() {
  return (
    <div className="w-full h-full container mx-auto flex flex-col gap-4 pt-20">
      <EditContactForm mode="create" />
    </div>
  );
}
