"use client";

import { stripHtml } from "@/lib/utils";
import { WPService } from "@/types/wordpress";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ServiceNavigationProps {
  previous: WPService | null;
  next: WPService | null;
  color?: string;
  waveType?: "type1" | "type2" | "type3";
  colorReverse?: string;
  utility?: number;
  utilityReverse?: number;
  reverse?: boolean;
  zIndex?: number;
}

export function ServiceNavigation({ previous, next }: ServiceNavigationProps) {
  const renderNavigationLink = (
    service: WPService | null,
    isPrevious: boolean
  ) => {
    if (!service) return <div />;

    return (
      <Link
        href={`/services/${service.slug}`}
        className="flex items-center gap-2 hover:text-primary transition-colors"
      >
        {isPrevious && <FaArrowLeft />}
        <span>{stripHtml(service.title.rendered)}</span>
        {!isPrevious && <FaArrowRight />}
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        {previous && renderNavigationLink(previous, true)}
        {next && renderNavigationLink(next, false)}
      </div>
    </div>
  );
}
