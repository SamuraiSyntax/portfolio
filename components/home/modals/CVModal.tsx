"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { education, experience, linkCV } from "@/lib/constants/resume";
import { neobrutalismClassPrimary } from "@/lib/styles";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaBriefcase, FaDownload, FaGraduationCap } from "react-icons/fa";
import { DialogTitle } from "../../ui/dialog";
import PDFViewerModal from "./PDFViewerModal";

interface CVModalProps {
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

const itemAnimation = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const [showPDF, setShowPDF] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
          {/* En-tête fixe */}
          <motion.div
            variants={sectionAnimation}
            className="flex-shrink-0 pb-6 sticky top-0"
          >
            <DialogTitle className="text-2xl font-bold">
              Mon Parcours
            </DialogTitle>
          </motion.div>

          {/* Zone de défilement */}
          <ScrollArea className="flex-grow -mr-6 pr-6">
            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="show"
              className="space-y-8 pb-6"
            >
              {/* Éducation */}
              <motion.section variants={sectionAnimation} className="space-y-4">
                <div className="flex items-center gap-2 sticky top-0 bg-background/80 backdrop-blur-sm py-2 z-10">
                  <FaGraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Éducation</h3>
                </div>
                <div className="grid gap-4">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      variants={itemAnimation}
                      className={`p-4 rounded-lg border bg-background/50 ${neobrutalismClassPrimary} hover:bg-background transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h4 className="font-medium">{edu.title}</h4>
                        <span className="text-sm text-primary font-medium">
                          {edu.level}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Domaine : {edu.domain}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.period}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Expérience Professionnelle */}
              <motion.section variants={sectionAnimation} className="space-y-4">
                <div className="flex items-center gap-2 sticky top-0 bg-background/80 backdrop-blur-sm py-2 z-10">
                  <FaBriefcase className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">
                    Expérience Professionnelle
                  </h3>
                </div>
                <div className="grid gap-4">
                  {experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      variants={itemAnimation}
                      className={`p-4 rounded-lg border bg-background/50 ${neobrutalismClassPrimary} hover:bg-background transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h4 className="font-medium">{exp.title}</h4>
                        <span className="text-sm text-primary font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-2">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="leading-relaxed">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </motion.div>
          </ScrollArea>

          {/* Bouton de téléchargement fixe en bas */}
          <motion.div
            variants={sectionAnimation}
            className="flex-shrink-0 pt-6 sticky bottom-0 bg-background/80 backdrop-blur-sm z-10"
          >
            <Button
              className={`w-full sm:w-auto ${neobrutalismClassPrimary}`}
              onClick={() => setShowPDF(true)}
            >
              <FaDownload className="mr-2" />
              Voir le CV complet
            </Button>
          </motion.div>
        </div>
      </Modal>
      <PDFViewerModal
        isOpen={isOpen && showPDF}
        onClose={() => setShowPDF(false)}
        pdfUrl={linkCV}
      />
    </>
  );
}
