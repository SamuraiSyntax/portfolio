import { AdminNavigation } from "@/components/logged-in/navigation/AdminNavigation";
import { BreadcrumbNavigation } from "@/components/logged-in/navigation/BreadcrumbNavigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full container mx-auto flex flex-col gap-4 py-16">
      <AdminNavigation />

      <BreadcrumbNavigation />
      {children}
    </div>
  );
}
