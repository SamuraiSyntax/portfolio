"use client";

import Template from "@/components/template";
import { BlendCursor } from "@/components/ui/blend-cursor";
import { Toaster } from "sonner";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen relative">
      <Template>{children}</Template>
      <BlendCursor />
      <Toaster richColors position="top-right" />
    </main>
  );
}
