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
        <div className="relative min-h-screen bg-background flex flex-1 flex-col gap-4 overflow-hidden">
          <Header variant="admin" />
          <main className="flex-1 overflow-y-auto px-4 md:px-6">
            <div className="max-w-[1600px] mx-auto">{children}</div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
