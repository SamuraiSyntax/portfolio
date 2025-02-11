"use client";

import { useEffect } from "react";

export default function Favicon() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Fond transparent
      ctx.clearRect(0, 0, 32, 32);

      // Dessiner le cercle
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, 2 * Math.PI);
      ctx.fillStyle = "#000000";
      ctx.fill();

      // Configuration du texte
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px Ubuntu";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      // Dessiner "BR"
      ctx.fillText("BR", 16, 16);

      // Créer le favicon
      const link = (document.querySelector("link[rel*='icon']") ||
        document.createElement("link")) as HTMLLinkElement;
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = canvas.toDataURL();

      // Ajouter au head si pas déjà présent
      if (!document.querySelector("link[rel*='icon']")) {
        document.getElementsByTagName("head")[0].appendChild(link);
      }
    }
  }, []);

  return null;
}
