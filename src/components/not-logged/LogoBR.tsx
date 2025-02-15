"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

interface LogoBRProps {
  className?: string;
  "aria-label"?: string;
  theme?: "light" | "dark";
}

export default function LogoBR({
  className,
  theme,
  "aria-label": ariaLabel,
}: LogoBRProps) {
  const letterRRef = useRef<SVGTSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const letterR = letterRRef.current;
    const fullNames = svg?.querySelectorAll(".full-name");

    if (!svg || !letterR || !fullNames) return;

    letterR.setAttribute("transform", "translate(120 0)");
    fullNames?.forEach(
      (name) => ((name as HTMLElement).style.fill = "hsla(var(--primary))")
    );

    // Animation initiale après chargement
    timeoutRef.current = setTimeout(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const x = 0;

      fullNames?.forEach((name) => ((name as HTMLElement).style.opacity = "0"));
      letterR.setAttribute("transform", "translate(" + x + " 0)");

      timeoutRef.current = setTimeout(() => {
        svg.setAttribute("width", "50");

        letterR.setAttribute("transform-origin", "center");
        letterR.setAttribute("transform", "translate(" + x + " 0) rotate(-10)");
      }, 600);
    }, 300);

    const handleHover = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const x = 120;

      letterR.setAttribute("transform", "translate(" + x + " 0) rotate(0)");
      // Augmenter la taille du SVG
      svg.setAttribute("width", "250");

      timeoutRef.current = setTimeout(() => {
        fullNames?.forEach(
          (name) => ((name as HTMLElement).style.opacity = "1")
        );
      }, 300);
    };

    const handleMouseLeave = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const x = 0;

      // Cacher le texte
      fullNames?.forEach((name) => ((name as HTMLElement).style.opacity = "0"));

      // Replacer le R
      letterR.setAttribute("transform", "translate(" + x + " 0)");

      // Réduire la taille du SVG
      timeoutRef.current = setTimeout(() => {
        svg.setAttribute("width", "50");
        timeoutRef.current = setTimeout(() => {
          letterR.setAttribute("transform-origin", "center");
          letterR.setAttribute(
            "transform",
            "translate(" + x + " 0) rotate(-10)"
          );
        }, 300);
      }, 300);
    };

    svg.addEventListener("mouseenter", handleHover);
    svg.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      svg.removeEventListener("mouseenter", handleHover);
      svg.removeEventListener("mouseleave", handleMouseLeave);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        transition: "width 0.3s ease",
        willChange: "width, transform",
        contain: "content",
        contentVisibility: "auto",
      }}
    >
      <defs>
        <style type="text/css">
          {`
            .letter-b, .letter-r {
              font-family: 'Ubuntu', sans-serif;
              font-weight: 500;
              font-style: normal;
              font-size: 40px;
              text-anchor: start;
              dominant-baseline: middle;
              fill: ${theme === "light" ? "fill-black" : "fill-white"};
            }

            .full-name {
              font-family: 'Ubuntu', sans-serif;
              font-weight: 300;
              font-style: normal;
              font-size: 35px;
              opacity: 1;
              text-anchor: start;
              dominant-baseline: middle;
            }

            .letter-r {
              transition: transform 0.5s ease-in-out;
            }
          `}
        </style>
      </defs>

      <text
        className="letter-b"
        textAnchor="start"
        x="0"
        y="30"
        style={{ fill: theme === "light" ? "#000" : "#fff" }}
      >
        B
      </text>

      <text
        ref={letterRRef}
        className="letter-r"
        textAnchor="start"
        x="25"
        y="30"
        style={{ fill: theme === "light" ? "#000" : "#fff" }}
      >
        R
      </text>

      <text className="full-name" x="25" y="30" textAnchor="start">
        ernard
      </text>
      <text className="full-name" x="170" y="30" textAnchor="start">
        ogier
      </text>
    </motion.svg>
  );
}
