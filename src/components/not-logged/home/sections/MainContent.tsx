"use client";

import {
  AboutModal,
  CVModal,
  ContactModal,
  ProjectsModal,
} from "@/components/home/modals";
import { CardGrid } from "@/components/ui/card-grid";
import { useModal } from "@/hooks/useModal";
import {
  ABOUT_CARDS,
  PROJECT_CARDS,
  SOCIAL_CARDS,
} from "@/lib/constants/cards";

export default function MainContent() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const allCards = [...ABOUT_CARDS, ...PROJECT_CARDS, ...SOCIAL_CARDS];

  return (
    <>
      <div className="col-span-2 w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-auto ">
        {allCards.map((card) => (
          <CardGrid key={card.id} card={card} onModalOpen={openModal} />
        ))}
      </div>

      {/* Modals */}
      <AboutModal
        isOpen={isModalOpen("about-modal")}
        onClose={() => closeModal("about-modal")}
      />
      <CVModal
        isOpen={isModalOpen("cv-modal")}
        onClose={() => closeModal("cv-modal")}
      />
      <ContactModal
        isOpen={isModalOpen("contact-modal")}
        onClose={() => closeModal("contact-modal")}
      />
      <ProjectsModal
        isOpen={isModalOpen("projects-modal")}
        onClose={() => closeModal("projects-modal")}
      />
    </>
  );
}
