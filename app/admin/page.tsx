import { LoginForm } from "@/components/admin/login-form";
import { auth } from "@/lib/auth/helper";
import { redirect } from "next/navigation";

// Marquer la page comme dynamique
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await auth();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
