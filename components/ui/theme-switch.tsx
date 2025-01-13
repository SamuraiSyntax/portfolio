"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"; // Ajout de useState

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // Pour gérer l'hydratation

  // Attendre que le composant soit monté côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Ne rien rendre pendant l'hydratation pour éviter le flash
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle theme"
      />
      <Moon className="h-5 w-5" />
    </div>
  );
}
