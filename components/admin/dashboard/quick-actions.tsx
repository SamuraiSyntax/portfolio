"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Mail } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="flex flex-col space-y-4 w-full md:w-auto">
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => (window.location.href = "/admin/contacts/stats")}
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M4 14h4v7H4v-7zM10 9h4v12h-4V9zM16 4h4v17h-4V4z"
                  strokeWidth="2"
                />
              </svg>
              Statistiques
            </div>
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={() =>
              window.open("https://mail.google.com/mail/u/0/#inbox", "_blank")
            }
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Gmail
              <ExternalLink className="h-3 w-3" />
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full"
            asChild
            onClick={() => window.open("https://resend.com/emails", "_blank")}
          >
            <div className="flex items-center gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-xs text-center">Resend</span>
              <ExternalLink className="h-3 w-3" />
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
