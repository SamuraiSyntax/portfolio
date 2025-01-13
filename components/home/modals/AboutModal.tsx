"use client";

import { DialogTitle } from "@/components/ui/dialog";
import { Modal } from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SKILLS } from "@/lib/constants";
import { neobrutalismClassPrimary } from "@/lib/styles";
import { motion } from "framer-motion";
import { FaDatabase, FaReact, FaWordpress } from "react-icons/fa";
import { SiNextdotjs, SiPrisma, SiTailwindcss } from "react-icons/si";

const IconMap = {
  FaWordpress,
  SiNextdotjs,
  FaReact,
  SiTailwindcss,
  SiPrisma,
  FaDatabase,
};

interface AboutModalProps {
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

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
        {/* En-tête fixe */}
        <motion.div
          variants={sectionAnimation}
          className="flex-shrink-0 pb-6 sticky top-0 z-10"
        >
          <DialogTitle className="text-2xl font-bold">
            À propos de moi
          </DialogTitle>
        </motion.div>

        {/* Zone de défilement */}
        <ScrollArea className="flex-grow -mr-6 pr-6">
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Parcours */}
            <motion.section variants={sectionAnimation} className="space-y-4">
              <h3 className="text-xl font-semibold sticky top-0 bg-transparent backdrop-blur-sm py-2">
                Mon Parcours
              </h3>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Spécialiste WordPress avec une solide expertise dans le
                  développement de thèmes et plugins personnalisés. Mon parcours
                  a débuté avec la création de solutions WordPress sur mesure,
                  évoluant vers des architectures modernes et headless.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Diplômé en tant que Développeur Intégrateur Web avec une
                  spécialisation WordPress, j&apos;ai élargi mes compétences
                  vers les technologies modernes du web pour créer des
                  expériences utilisateur plus riches et performantes.
                </p>
              </div>
            </motion.section>

            {/* Expertise */}
            <motion.section variants={sectionAnimation} className="space-y-4">
              <h3 className="text-xl font-semibold sticky top-0 bg-transparent backdrop-blur-sm py-2">
                Expertise Technique
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILLS.map((skill, index) => {
                  const Icon = IconMap[skill.icon as keyof typeof IconMap];
                  return (
                    <motion.div
                      key={index}
                      variants={sectionAnimation}
                      className={`flex items-start space-x-3 p-4 rounded-lg border bg-background/50 ${neobrutalismClassPrimary} hover:bg-background transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className="text-primary mt-1 flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {skill.details}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Approche */}
            <motion.section variants={sectionAnimation} className="space-y-4">
              <h3 className="text-xl font-semibold sticky top-0 bg-transparent backdrop-blur-sm py-2">
                Mon Approche
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Je combine l&apos;expertise WordPress traditionnelle avec les
                technologies modernes pour créer des solutions web performantes
                et évolutives. Ma spécialisation en WordPress headless permet
                d&apos;offrir le meilleur des deux mondes : la puissance de
                WordPress comme CMS et la flexibilité des frameworks modernes
                pour le front-end.
              </p>
            </motion.section>
          </motion.div>
        </ScrollArea>
      </div>
    </Modal>
  );
}
