"use client";

import { Loader } from "@/components/ui/loader";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Réinitialiser le loader quand le composant est monté
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.scrollTo(0, 0);
        }}
      >
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.2 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3 },
          }}
          transition={{ duration: 0.3 }}
          className="w-full overflow-x-auto"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
