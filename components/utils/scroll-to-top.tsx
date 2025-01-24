"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Vérifier la position de défilement et mettre à jour la visibilité
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 rounded-full p-3"
          size="icon"
          aria-label="Retour en haut de la page"
          style={{
            zIndex: 9999,
          }}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
