"use client";

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
    setTimeout(() => {
      const x = 0;

      fullNames?.forEach((name) => ((name as HTMLElement).style.opacity = "0"));
      letterR.setAttribute("transform", "translate(" + x + " 0)");
    }, 500);

    const handleHover = () => {
      const x = 120;

      letterR.setAttribute("transform", "translate(" + x + " 0)");

      fullNames?.forEach((name) => ((name as HTMLElement).style.opacity = "1"));
    };

    const handleMouseLeave = () => {
      const x = 0;

      // Cacher le texte
      fullNames?.forEach((name) => ((name as HTMLElement).style.opacity = "0"));

      // Replacer le R
      letterR.setAttribute("transform", "translate(" + x + " 0)");
    };

    svg.addEventListener("mouseenter", handleHover);
    svg.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      svg.removeEventListener("mouseenter", handleHover);
      svg.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      style={{ transition: "width 0.5s ease" }}
    >
      <defs>
        <style type="text/css">
          {`
            @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
            
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
              font-weight: 400;
              font-style: normal;
              font-size: 35px;
              opacity: 1;
              transition: opacity 0.5s ease-in-out;
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
        y="20"
        style={{ fill: theme === "light" ? "#000" : "#fff" }}
      >
        B
      </text>

      <text
        ref={letterRRef}
        className="letter-r"
        textAnchor="start"
        x="25"
        y="20"
        style={{ fill: theme === "light" ? "#000" : "#fff" }}
      >
        R
      </text>

      <text className="full-name" x="25" y="20" textAnchor="start">
        ernard
      </text>
      <text className="full-name" x="170" y="20" textAnchor="start">
        ogier
      </text>
    </svg>
  );
}
