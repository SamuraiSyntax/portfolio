"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500); // Augmenté à 1.5s pour mieux voir l'animation

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative flex gap-4">
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 1, rotate: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2, // Décalage pour créer un effet de vague
            }}
            className={`
              w-8 h-8 
              border-4 
              border-primary 
              rounded-lg 
              ${index === 0 ? "bg-primary/50" : ""} 
              ${index === 1 ? "bg-primary/30" : ""} 
              ${index === 2 ? "bg-primary/15" : ""}
            `}
          />
        ))}
      </div>
    </motion.div>
  );
}
