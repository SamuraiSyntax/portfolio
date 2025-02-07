"use client";

import { motion } from "motion/react";

export function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
              delay: index * 0.2,
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
