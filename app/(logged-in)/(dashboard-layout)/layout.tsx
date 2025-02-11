import { AdminNavigation } from "@/components/logged-in/navigation/AdminNavigation";
import { BreadcrumbNavigation } from "@/components/logged-in/navigation/BreadcrumbNavigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex flex-col gap-6 max-w-[1600px] mx-auto">
          <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-16 px-4">
            <AdminNavigation />
          </div>
          <BreadcrumbNavigation />
          {children}
        </div>
      </main>
    </div>
  );
}
