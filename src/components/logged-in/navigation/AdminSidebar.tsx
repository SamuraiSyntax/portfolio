"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ChevronDown,
  Contact2,
  FileText,
  FolderKanban,
  Globe2,
  Home,
  LayoutGrid,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { createElement, useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Administration",
    defaultExpanded: true,
    items: [
      {
        title: "Tableau de bord",
        href: "/dashboard",
        icon: Home,
      },
      {
        title: "Statistiques",
        href: "/dashboard/stats",
        icon: BarChart3,
      },
      {
        title: "Contacts",
        href: "/dashboard/contacts",
        icon: Contact2,
      },
      {
        title: "Projets",
        href: "/dashboard/projects",
        icon: FolderKanban,
      },
      {
        title: "Documents",
        href: "/dashboard/documents",
        icon: FileText,
      },
    ],
  },
  {
    title: "Site Public",
    items: [
      {
        title: "Accueil",
        href: "/",
        icon: Globe2,
      },
      {
        title: "Services",
        href: "/services",
        icon: LayoutGrid,
      },
      {
        title: "Projets",
        href: "/projects",
        icon: FolderKanban,
      },
      {
        title: "À propos",
        href: "/about",
        icon: Users,
      },
      {
        title: "Contact",
        href: "/contact",
        icon: Contact2,
      },
    ],
  },
  {
    title: "Paramètres",
    items: [
      {
        title: "Utilisateurs",
        href: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Configuration",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const { state } = useSidebar();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState<string>("");
  const [openMobile, setOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détermine et définit la section ouverte en fonction du chemin actuel
  useEffect(() => {
    const currentSection = navigationItems.find((section) =>
      section.items.some((item) => pathname.startsWith(item.href))
    );
    if (currentSection) {
      setOpenSection(currentSection.title);
    }
  }, [pathname]);

  // Ouvre toutes les sections quand la sidebar est en mode icon
  useEffect(() => {
    if (state === "collapsed") {
      setOpenSection(null);
    }
  }, [state]);

  // Extraire le titre de la page à partir du pathname et des données dynamiques
  useEffect(() => {
    const fetchPageTitle = async () => {
      const path = pathname.split("/").filter(Boolean);

      // Si nous sommes sur une page de détail contact
      if (pathname.includes("/dashboard/contacts/") && params.id) {
        try {
          const response = await fetch(`/api/contacts/${params.id}`);
          const contact = await response.json();
          setPageTitle(`${contact.firstName} ${contact.lastName}`);
          return;
        } catch (error) {
          console.error("Erreur lors de la récupération du contact:", error);
        }
      }

      // Si nous sommes sur une page de détail projet
      if (pathname.includes("/dashboard/projects/") && params.id) {
        try {
          const response = await fetch(`/api/projects/${params.id}`);
          const project = await response.json();
          setPageTitle(project.name);
          return;
        } catch (error) {
          console.error("Erreur lors de la récupération du projet:", error);
        }
      }

      // Fallback pour les autres pages
      if (path.length === 0) {
        setPageTitle("Tableau de bord");
      } else {
        const lastSegment = path[path.length - 1];
        if (lastSegment === params.id) {
          // Si c'est un ID, utiliser le segment précédent
          setPageTitle(
            path[path.length - 2].charAt(0).toUpperCase() +
              path[path.length - 2].slice(1)
          );
        } else {
          setPageTitle(
            lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
          );
        }
      }
    };

    fetchPageTitle();
  }, [pathname, params.id]);

  // Trouve l'icône de la page actuelle
  const getCurrentPageIcon = () => {
    const currentPage = navigationItems
      .flatMap((section) => section.items)
      .find((item) => pathname.startsWith(item.href));
    return currentPage?.icon || Home;
  };

  // Gère le clic sur une section
  const handleSectionClick = (sectionTitle: string) => {
    setOpenSection(openSection === sectionTitle ? null : sectionTitle);
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          className="w-[280px] p-0"
          onInteractOutside={() => setOpenMobile(false)}
        >
          <div className="flex h-full flex-col">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="user-select-none hover:bg-transparent pointer-events-none flex items-center gap-2 font-bold text-lg">
                    {createElement(getCurrentPageIcon(), {
                      className: "w-5 h-5",
                      "aria-hidden": "true",
                    })}
                    <h1 className="truncate">{pageTitle}</h1>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="">
              {navigationItems.map((section) => (
                <Collapsible
                  key={section.title}
                  open={
                    state === "collapsed" ? true : openSection === section.title
                  }
                  onOpenChange={() => handleSectionClick(section.title)}
                  className="group/collapsible"
                >
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger
                        className={cn(state === "collapsed" && "hidden")}
                      >
                        {section.title}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent
                      {...(state === "collapsed" && { forceMount: true })}
                    >
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {section.items.map((item) => (
                            <SidebarMenuItem key={item.href}>
                              <SidebarMenuButton
                                asChild
                                tooltip={
                                  state === "collapsed" ? item.title : undefined
                                }
                              >
                                <Link
                                  href={item.href}
                                  className={cn(
                                    pathname === item.href
                                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                      : "",
                                    "transition-colors hover:bg-sidebar-primary/80 hover:text-sidebar-primary-foreground"
                                  )}
                                  target={undefined}
                                  rel={"noopener noreferrer"}
                                >
                                  <item.icon className="w-4 h-4" />
                                  <span>{item.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              ))}
            </SidebarContent>

            <SidebarFooter className="border-t">
              <div className="p-4 text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} Bernard Rogier</p>
              </div>
            </SidebarFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="user-select-none hover:bg-transparent pointer-events-none flex items-center gap-2 font-bold text-lg">
                  {createElement(getCurrentPageIcon(), {
                    className: "w-5 h-5",
                    "aria-hidden": "true",
                  })}
                  <h1 className="truncate">{pageTitle}</h1>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent className="">
            {navigationItems.map((section) => (
              <Collapsible
                key={section.title}
                open={
                  state === "collapsed" ? true : openSection === section.title
                }
                onOpenChange={() => handleSectionClick(section.title)}
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger
                      className={cn(state === "collapsed" && "hidden")}
                    >
                      {section.title}
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent
                    {...(state === "collapsed" && { forceMount: true })}
                  >
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {section.items.map((item) => (
                          <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton
                              asChild
                              tooltip={
                                state === "collapsed" ? item.title : undefined
                              }
                            >
                              <Link
                                href={item.href}
                                className={cn(
                                  pathname === item.href
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                    : "",
                                  "transition-colors hover:bg-sidebar-primary/80 hover:text-sidebar-primary-foreground"
                                )}
                                target={undefined}
                                rel={"noopener noreferrer"}
                              >
                                <item.icon className="w-4 h-4" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </SidebarContent>

          <SidebarFooter className="border-t">
            <div className="p-4 text-xs text-muted-foreground">
              <p>© {new Date().getFullYear()} Bernard Rogier</p>
            </div>
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  );
}
