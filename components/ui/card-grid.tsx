"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardType } from "@/lib/types";
import Link from "next/link";
import {
  FaBriefcase,
  FaCode,
  FaCog,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFolderOpen,
  FaGithub,
  FaLinkedin,
  FaUser,
} from "react-icons/fa";

const IconMap = {
  FaUser,
  FaFileAlt,
  FaEnvelope,
  FaBriefcase,
  FaCode,
  FaFolderOpen,
  FaLinkedin,
  FaGithub,
  FaCog,
};

interface CardGridProps {
  card: CardType;
  onModalOpen: (modalId: string) => void;
}

export function CardGrid({ card, onModalOpen }: CardGridProps) {
  const Icon = card.icon ? IconMap[card.icon as keyof typeof IconMap] : null;

  const CardContentDisplay = () => (
    <>
      <CardHeader className="p-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="flex-shrink-0">
              <Icon className="h-5 w-5 text-primary transition-colors duration-200" />
            </div>
          )}
          <CardTitle className="text-lg font-medium truncate whitespace-nowrap">
            {card.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-4">
        {card.description && (
          <p className="text-sm text-muted-foreground">{card.description}</p>
        )}
      </CardContent>
    </>
  );

  const baseCardClass = `
    group 
    transition-all 
    duration-200 
    ease-in-out
    border-2 
    border-foreground/20
    hover:border-primary
    hover:shadow-[4px_4px_0px_0px_hsl(var(--primary))]
    hover:translate-x-[-4px]
    hover:translate-y-[-4px]
    active:translate-x-[0px]
    active:translate-y-[0px]
    active:shadow-[0px_0px_0px_0px_hsl(var(--primary))]
  `;

  switch (card.action.type) {
    case "modal":
      return (
        <Card
          className={`${baseCardClass} card-grid cursor-pointer hover:no-underline`}
          onClick={() => onModalOpen(card.action.modalId!)}
          data-modal-trigger
        >
          <CardContentDisplay />
        </Card>
      );

    case "external-link":
      return (
        <Card className={`${baseCardClass} card-grid`}>
          <Link
            href={card.action.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block h-full hover:no-underline custom-cursor-external-link"
          >
            <CardContentDisplay />
            <div className="absolute top-4 right-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
              <FaExternalLinkAlt className="h-4 w-4 text-primary transition-colors duration-200" />
            </div>
          </Link>
        </Card>
      );

    case "link":
      return (
        <Card className={`${baseCardClass} card-grid`}>
          <Link
            href={card.action.href || "#"}
            className="block h-full hover:no-underline"
          >
            <CardContentDisplay />
          </Link>
        </Card>
      );

    default:
      return (
        <Card className={`${baseCardClass} card-grid`}>
          <CardContentDisplay />
        </Card>
      );
  }
}
