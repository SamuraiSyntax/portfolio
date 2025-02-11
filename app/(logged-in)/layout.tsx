import { ErrorWrapper } from "@/components/error-wrapper";
import { requiredAuth } from "@/lib/auth/helper";
import { AuthError } from "@/lib/errors/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requiredAuth();
    return <ErrorWrapper>{children}</ErrorWrapper>;
  } catch (error) {
    if (error instanceof AuthError) {
      const headersList = await headers();
      const host = headersList.get("host") ?? "localhost";
      const protocol = headersList.get("x-forwarded-proto") ?? "http";
      const currentPath = new URL(
        headersList.get("x-url") ?? "",
        `${protocol}://${host}`
      ).pathname;
      redirect(`/admin?redirect=${encodeURIComponent(currentPath)}`);
    }
    throw error;
  }
}
