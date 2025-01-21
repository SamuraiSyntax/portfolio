"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface PulseCircle {
  id: number;
  rect: DOMRect;
  timestamp: number;
}

export const BackgroundAnimated = () => {
  const [pulseCircles, setPulseCircles] = useState<PulseCircle[]>([]);
  const pulseLifetime = 1500;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      const card = element.closest(
        "[data-modal-trigger], .profile-card, .card-grid, .options-card, .card-freelance"
      );

      if (card instanceof HTMLElement) {
        const rect = card.getBoundingClientRect();
        const newCircle: PulseCircle = {
          id: Date.now(),
          rect,
          timestamp: Date.now(),
        };

        setPulseCircles((prev) => [...prev, newCircle]);
      }
    };

    window.addEventListener("click", handleClick);

    const cleanup = setInterval(() => {
      setPulseCircles((prev) =>
        prev.filter((circle) => Date.now() - circle.timestamp < pulseLifetime)
      );
    }, pulseLifetime);

    return () => {
      window.removeEventListener("click", handleClick);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <AnimatePresence>
        {pulseCircles.map((circle) => (
          <motion.div
            key={circle.id}
            initial={{
              position: "absolute",
              top: circle.rect.top,
              left: circle.rect.left,
              width: circle.rect.width,
              height: circle.rect.height,
              opacity: 0.5,
              backgroundColor: "hsl(var(--primary))",
              borderRadius: "var(--radius)",
            }}
            animate={{
              width: Math.max(window.innerWidth * 2, window.innerHeight * 2),
              height: Math.max(window.innerWidth * 2, window.innerHeight * 2),
              top:
                circle.rect.top -
                (Math.max(window.innerWidth * 2, window.innerHeight * 2) -
                  circle.rect.height) /
                  2,
              left:
                circle.rect.left -
                (Math.max(window.innerWidth * 2, window.innerHeight * 2) -
                  circle.rect.width) /
                  2,
              opacity: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.32, 0, 0.67, 0],
              opacity: {
                duration: 1.2,
                ease: [0.32, 0, 0.67, 0],
              },
            }}
            exit={{ opacity: 0 }}
            className="mix-blend-difference"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
