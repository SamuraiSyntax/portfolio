import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";

const navigationItems = [
  {
    title: "Administration",
    items: [
      {
        title: "Tableau de bord",
        href: "/dashboard",
        description: "Vue d'ensemble des statistiques et activités",
      },
      {
        title: "Contacts",
        href: "/dashboard/contacts",
        description: "Gestion des contacts et prospects",
      },
      {
        title: "Projets",
        href: "/dashboard/projects",
        description: "Suivi et gestion des projets",
      },
      {
        title: "Documents",
        href: "/dashboard/documents",
        description: "Gestion des documents et fichiers",
      },
    ],
  },
  {
    title: "Paramètres",
    items: [
      {
        title: "Utilisateurs",
        href: "/dashboard/users",
        description: "Gestion des utilisateurs et permissions",
      },
      {
        title: "Configuration",
        href: "/dashboard/settings",
        description: "Paramètres généraux de l'application",
      },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { description?: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function AdminNavigation() {
  return (
    <div className="container flex h-14 items-center">
      <NavigationMenu>
        <NavigationMenuList>
          {navigationItems.map((section) => (
            <NavigationMenuItem key={section.title}>
              <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {section.items.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
