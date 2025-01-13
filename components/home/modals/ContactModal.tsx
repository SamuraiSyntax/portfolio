"use client";

import { Modal } from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import { ContactForm } from "../../contact/ContactForm";
import { DialogTitle } from "../../ui/dialog";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const sectionAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-auto max-h-[800px]">
        {/* En-tête fixe */}
        <motion.div
          variants={sectionAnimation}
          className="flex-shrink-0 pb-6 sticky top-0"
        >
          <div className="flex items-center gap-2">
            <FaEnvelope className="h-5 w-5 text-primary" />
            <DialogTitle className="text-2xl font-bold">
              Me contacter
            </DialogTitle>
          </div>
          <p className="text-muted-foreground mt-2">
            Je vous répondrai dans les plus brefs délais.
          </p>
        </motion.div>

        {/* Zone de défilement */}
        <ScrollArea className="flex-grow -mr-6 pr-6">
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="space-y-6 pb-6"
          >
            <ContactForm onClose={onClose} />
          </motion.div>
        </ScrollArea>
      </div>
    </Modal>
  );
}
