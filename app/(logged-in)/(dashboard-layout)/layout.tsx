import Header from "@/components/header";
import { AdminSidebar } from "@/components/logged-in/navigation/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset>
        <main className="relative min-h-screen bg-background flex flex-1 flex-col gap-4 p-4 pt-0 overflow-y-auto">
          <Header variant="admin" />
          <div className="p-4 md:p-6 space-y-6">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
