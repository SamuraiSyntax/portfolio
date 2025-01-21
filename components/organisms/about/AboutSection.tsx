"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { SectionTitle } from "@/components/atoms/SectionTitle";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

interface AboutSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: Array<{
    number: string;
    label: string;
  }>;
  color?: string;
  colorReverse?: string;
  reverse?: boolean | false;
  waveType?: "type1" | "type2" | "type3";
  utility?: number;
  zIndex?: number;
}

export function AboutSection({
  title,
  subtitle,
  description,
  image,
  stats,
  color,
  colorReverse,
  reverse,
  waveType,
  utility,
  zIndex,
}: AboutSectionProps) {
  const className = `min-h-screen flex items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <section className={`${className}`} style={{ zIndex: zIndex }}>
      <SectionDivider
        color={color || "muted"}
        colorReverse={colorReverse}
        reverse={reverse}
        waveType={waveType}
      />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle title={title} subtitle={subtitle} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative col-span-1"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={image}
                alt="Bernard Ngandu"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 col-span-2"
          >
            <p className="text-lg text-muted-foreground">{description}</p>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="text-center p-4 rounded-xl bg-background/50 hover:bg-background backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center mt-6 text-primary hover:text-primary/80 transition-colors"
              >
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
