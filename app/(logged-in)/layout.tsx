import { ErrorDisplay } from "@/components/error-display";
import { ErrorWrapper } from "@/components/error-wrapper";
import { requiredAuth } from "@/lib/auth/helper";
import { AuthError } from "@/lib/errors/types";

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
      return (
        <div className="flex items-center justify-center h-screen">
          <ErrorDisplay error={error} showLoginButton={true} />
        </div>
      );
    }

    throw error;
  }
}
