"use client";

import { Article } from "@/types/wordpress";
import { Calendar, Clock, Tag } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.article
      key={article.slug}
      className="group bg-muted/50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * (index + 1) }}
    >
      <Link
        href={`/blog/${article.slug}`}
        className="flex flex-col md:flex-row"
      >
        <div className="relative w-full md:w-1/3 h-64 md:h-auto overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="flex-1 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
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

          <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h2>

          <p
            className="text-muted-foreground mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: article.description,
            }}
          />

          <span className="inline-flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
            Lire l&apos;article
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
