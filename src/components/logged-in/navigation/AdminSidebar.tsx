"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { usePathname } from "next/navigation";
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
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Détermine et définit la section ouverte en fonction du chemin actuel
  useEffect(() => {
    const currentSection = navigationItems.find((section) =>
      section.items.some((item) => pathname === item.href)
    );
    if (currentSection) {
      setOpenSection(currentSection.title);
    }
  }, [pathname]);

  // Trouve l'icône de la page actuelle
  const getCurrentPageIcon = () => {
    const currentPage = navigationItems
      .flatMap((section) => section.items)
      .find((item) => pathname === item.href);
    return currentPage?.icon || Home;
  };

  // Gère le clic sur une section
  const handleSectionClick = (sectionTitle: string) => {
    setOpenSection(openSection === sectionTitle ? null : sectionTitle);
  };

  // Extraire le titre de la page à partir du pathname
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean);
    if (path.length === 0) return "Tableau de bord";
    return (
      path[path.length - 1].charAt(0).toUpperCase() +
      path[path.length - 1].slice(1)
    );
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="user-select-none hover:bg-transparent pointer-events-none flex items-center gap-2 font-bold text-lg">
              {createElement(getCurrentPageIcon(), {
                className: "w-5 h-5",
                "aria-hidden": "true",
              })}
              <h1 className="truncate">{getPageTitle()}</h1>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="">
        {navigationItems.map((section) => (
          <Collapsible
            key={section.title}
            open={openSection === section.title}
            onOpenChange={() => handleSectionClick(section.title)}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {section.title}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              pathname === item.href
                                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                : "",
                              "transition-colors hover:bg-sidebar-primary/80 hover:text-sidebar-primary-foreground"
                            )}
                            target={
                              item.href.startsWith("/dashboard")
                                ? undefined
                                : "_blank"
                            }
                            rel={
                              item.href.startsWith("/dashboard")
                                ? undefined
                                : "noopener noreferrer"
                            }
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
    </Sidebar>
  );
}
