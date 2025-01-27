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
  const classNameDesktop = `hidden md:flex min-h-screen items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  const classNameMobile = `flex md:hidden items-center relative border-none border-0 group sticky top-0 bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <>
      {/* Desktop */}
      <section
        id="about"
        className={`${classNameDesktop}`}
        style={{ zIndex: zIndex }}
      >
        <SectionDivider
          color={color || "muted"}
          colorReverse={colorReverse}
          reverse={reverse}
          waveType={waveType}
          zIndex={zIndex}
        />
        <div className="container mx-auto px-4 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <SectionTitle title={title} subtitle={subtitle} />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative lg:sticky lg:top-24"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={image}
                  alt="Bernard Rogier"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 lg:col-span-2"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    className="text-center p-6 rounded-xl bg-background/50 hover:bg-background backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
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
                  className="inline-flex items-center px-6 py-3 text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile */}
      <>
        {/* Mobile titre */}
        <section
          id="about-mobile"
          className={`${classNameMobile}`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider
            color={color || "muted"}
            colorReverse={colorReverse}
            reverse={reverse}
            waveType={waveType}
            zIndex={zIndex}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-12 md:py-20"
          >
            <SectionTitle title={title} subtitle={subtitle} />
          </motion.div>
        </section>

        {/* Mobile image */}
        <section className={`${classNameMobile}`} style={{ zIndex: zIndex }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full px-4"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl h-full w-full">
              <Image
                src={image}
                alt="Bernard Rogier"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 h-full w-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
            </div>
          </motion.div>
        </section>

        {/* Mobile description */}
        <section
          className={`flex md:hidden items-center border-none border-0 group sticky top-0 bg-background py-20`}
          style={{ zIndex: zIndex }}
        >
          <div className="grid grid-cols-1 gap-8 items-start px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            </motion.div>
          </div>
        </section>

        <section
          className={`flex md:hidden items-center border-none border-0 group sticky top-0 bg-background py-20`}
          style={{ zIndex: zIndex }}
        >
          <SectionDivider
            color={"background"}
            waveType={waveType}
            zIndex={zIndex}
          />
          <div className="grid grid-cols-1 gap-8 items-start px-4">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="text-center p-6 rounded-xl bg-muted/50 hover:bg-muted backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
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
                className="inline-flex items-center px-6 py-3 text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              >
                Me contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      </>
    </>
  );
}
