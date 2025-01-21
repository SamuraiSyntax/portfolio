"use client";

import { Separator } from "@/components/ui/separator";
import { Article } from "@/types/wordpress";
import { Calendar, Clock, Tag } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-muted/30 text-muted-foreground font-medium">
            <Tag className="w-4 h-4 mr-1" />
            {article.category}
          </span>

          <span className="inline-flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {article.readTime} de lecture
          </span>

          <span className="inline-flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(article.date).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <Separator className="bg-muted/30" />

        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          {article.title}
        </h1>

        <Separator className="bg-muted/30" />

        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>
    </header>
  );
}
