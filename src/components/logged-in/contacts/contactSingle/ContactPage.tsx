"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from "@/hooks/use-media-query";
import { formatDate } from "@/lib/utils";
import { Contact } from "@/types/contact";
import { ProjectManagerUser, ProjectWithRelations } from "@/types/project";
import {
  ActivityLog,
  Communication,
  Document,
  Invoice,
  Phase,
  Project,
  Quote,
  Risk,
} from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  File,
  FileText,
  FolderOpen,
  LayoutDashboard,
  MessageSquare,
  Receipt,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditContactForm } from "../form/EditContactForm";
import { ContactModalsPDF } from "./ContactModalsPDF";
import { ContactActivities } from "./tabs/ContactActivities";
import { ContactCommunications } from "./tabs/ContactCommunications";
import { ContactDocuments } from "./tabs/ContactDocuments";
import { ContactInvoices } from "./tabs/ContactInvoices";
import { ContactOverview } from "./tabs/ContactOverview";
import { ContactProjects } from "./tabs/ContactProjects";
import { ContactQuotes } from "./tabs/ContactQuotes";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

interface ExtendedProject extends Project {
  phases?: Phase[];
  risks?: Risk[];
  projectManagerUser?: ProjectManagerUser;
  clientName?: string;
}

interface ContactPageProps {
  contact: Contact;
  id: string;
  projects: Project[];
  activities: ActivityLog[];
  documents: Document[];
  quotes: Quote[];
  invoices: Invoice[];
  communications: Communication[];
}

export function ContactPage({
  contact,
  id,
  projects,
  activities,
  documents,
  communications,
  quotes,
  invoices,
}: ContactPageProps) {
  const router = useRouter();
  const [isModalPDFOpen, setIsModalPDFOpen] = useState(false);
  const [selectedProject] = useState<ProjectWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const tabs = [
    {
      id: "overview",
      label: "Vue d'ensemble",
      icon: <LayoutDashboard className="w-4 h-4" />,
      content: <ContactOverview contact={contact} />,
    },
    {
      id: "activities",
      label: "Activités",
      icon: <Activity className="w-4 h-4" />,
      content: (
        <ContactActivities
          activities={activities}
          contactId={id}
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "projects",
      label: "Projets",
      icon: <FolderOpen className="w-4 h-4" />,
      content: (
        <ContactProjects
          projects={projects as ProjectWithRelations[]}
          contact={contact}
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "quotes",
      label: "Devis",
      icon: <FileText className="w-4 h-4" />,
      content: (
        <ContactQuotes quotes={quotes} contactId={id} isLoading={isLoading} />
      ),
    },
    {
      id: "invoices",
      label: "Factures",
      icon: <Receipt className="w-4 h-4" />,
      content: (
        <ContactInvoices
          invoices={invoices}
          contactId={id}
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "documents",
      label: "Documents",
      icon: <File className="w-4 h-4" />,
      content: (
        <ContactDocuments
          documents={documents}
          contactId={id}
          isLoading={isLoading}
        />
      ),
    },
    {
      id: "communications",
      label: "Communications",
      icon: <MessageSquare className="w-4 h-4" />,
      content: (
        <ContactCommunications
          communications={communications}
          contactId={id}
          isLoading={isLoading}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6 py-6">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/dashboard/contacts")}
            className="hover:bg-muted transition duration-200"
            aria-label="Retour"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {contact.firstName} {contact.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {contact.company || "Pas d'entreprise"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <EditContactForm contact={contact} />
          <ContactModalsPDF
            isModalOpen={isModalPDFOpen}
            setIsModalOpen={setIsModalPDFOpen}
            contact={contact}
            project={selectedProject as ExtendedProject}
          />
        </div>
      </header>

      {/* Metadata Section */}
      <section className="flex flex-col sm:flex-row justify-between gap-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
        <p>Créé le {formatDate(contact.createdAt)}</p>
        <p>Dernière modification le {formatDate(contact.updatedAt)}</p>
      </section>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full h-auto justify-start gap-1 overflow-x-auto whitespace-nowrap px-1">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="min-w-[10px] h-auto"
              >
                <div className="flex items-center gap-2">
                  {tab.icon}
                  {!isMobile && tab.label}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {isLoading ? (
            <div className="space-y-4 mt-4">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>
          ) : (
            <div className="mt-6 overflow-x-hidden">
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab.content}
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          )}
        </Tabs>
      </AnimatePresence>
    </div>
  );
}
