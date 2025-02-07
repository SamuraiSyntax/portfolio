"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export const BlendCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Vérifier si c'est un appareil tactile (mobile ou tablette)
    const checkTouchDevice = () => {
      // Vérifie si c'est un appareil tactile ET si la largeur est inférieure à 1024px (tablettes incluses)
      const isTouchCapable =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        ("msMaxTouchPoints" in navigator &&
          (navigator as Navigator & { msMaxTouchPoints: number })
            .msMaxTouchPoints > 0);
      const isSmallScreen = window.matchMedia("(max-width: 1024px)").matches;

      setIsTouchDevice(isTouchCapable || isSmallScreen);
    };

    // Vérification initiale
    checkTouchDevice();

    // Écouter les changements de taille d'écran
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    mediaQuery.addEventListener("change", checkTouchDevice);

    return () => mediaQuery.removeEventListener("change", checkTouchDevice);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      const isInteractive =
        element.classList.contains("profile-card") ||
        element.classList.contains("card-grid") ||
        element.classList.contains("options-card") ||
        element.classList.contains("card-freelance") ||
        // Ajout des sélecteurs pour les modales
        element.closest("[role='dialog']") ||
        element.closest(".modal-content") ||
        element.closest("button") ||
        element.closest("a") ||
        element.closest(".profile-card") ||
        element.closest(".card-grid") ||
        element.closest(".options-card") ||
        element.closest(".card-freelance");
      if (isInteractive !== isHovering) {
        setIsHovering(!!isInteractive);
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isHovering, isTouchDevice]);

  // Ne rien rendre sur les appareils tactiles
  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-all duration-0"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 16),
          y: mousePosition.y - (isHovering ? 24 : 16),
          scale: isHovering ? 1.25 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 20,
          mass: 0.5,
        }}
      >
        <div
          className={`w-8 h-8 rounded-full ${
            isHovering ? "bg-[#ffffff]" : "bg-[#ffffff]/80"
          }`}
        />
      </motion.div>
    </>
  );
};
