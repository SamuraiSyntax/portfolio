"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { TestimonialCard } from "@/components/molecules/testimonials/TestimonialCard";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTestimonials } from "@/hooks/useWordPress";
import { fadeInUp, staggerChildren } from "@/lib/animations";
import Autoplay from "embla-carousel-autoplay";
import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import * as React from "react";

export function TestimonialsSection({
  color,
  colorReverse,
  utility,
  reverse,
  waveType,
  utilityReverse,
  zIndex,
}: {
  color?: string;
  colorReverse?: string;
  utility?: number;
  reverse?: boolean | false;
  waveType?: "type1" | "type2" | "type3";
  utilityReverse?: number;
  zIndex?: number;
}) {
  const { data: testimonials, isLoading, error } = useTestimonials();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const hasTestimonials =
    Array.isArray(testimonials) && testimonials.length > 0;

  if (isLoading) return <div>Chargement...</div>;
  if (error) return null;

  const className = `min-h-fit flex items-center relative border-none border-0 group md:sticky md:top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <section
      id="testimonials"
      className={`${className}`}
      style={{ zIndex: zIndex }}
    >
      <SectionDivider
        color={color || "muted"}
        waveType={waveType}
        colorReverse={colorReverse}
        utility={utilityReverse}
        reverse={reverse}
        zIndex={zIndex}
      />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            title="Témoignages de mes clients"
            subtitle="Retours d'expérience sur la qualité de mes services"
            description="Chaque retour est une preuve de mon engagement à fournir des solutions adaptées et performantes."
            showPrimaryButton={false}
            showSecondaryButton={false}
          />
        </motion.div>

        {hasTestimonials ? (
          <>
            {/* Carousel pour mobile */}
            <Carousel
              orientation="horizontal"
              opts={{ align: "center", loop: true }}
              className="md:hidden w-full px-10 mt-12"
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="h-auto">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-1 top-1/2 -translate-y-1/2" />
              <CarouselNext className="absolute right-1 top-1/2 -translate-y-1/2" />
            </Carousel>

            {/* Grille pour desktop */}
            <motion.div
              className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              exit="initial"
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 * index }}
                  variants={fadeInUp}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <Card className="p-8 text-center bg-background/80 hover:bg-background transition-all duration-300 flex flex-col items-center justify-center gap-4">
              <MessageCircle className="w-12 h-12 text-primary mb-4" />
              <div className="w-full max-w-md border-t border-muted my-4"></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="font-semibold text-primary">
                  Aucun témoignage pour le moment.
                </span>
                <br />
                <span>
                  Vos retours sont précieux et m&apos;aident à améliorer mes
                  services.
                </span>
                <br />
                <span className="italic">
                  Soyez le premier à partager votre expérience et à m&apos;aider
                  à grandir !
                </span>
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
}
