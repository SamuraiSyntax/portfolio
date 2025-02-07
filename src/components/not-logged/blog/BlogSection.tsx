"use client";

import { SectionDivider } from "@/components/not-logged/SectionDivider";
import { ArticleCard } from "@/components/not-logged/blog/ArticleCard";
import { usePosts } from "@/hooks/useWordPress";
import { formatArticle } from "@/lib/wordpress";
import { Article, WPPost } from "@/types/wordpress";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function BlogSection({
  zIndex,
  color,
  reverse,
  colorReverse,
  utility,
  waveType,
}: {
  zIndex?: number;
  color?: string;
  colorReverse?: string;
  reverse?: boolean;
  utility?: number;
  waveType?: "type1" | "type2" | "type3";
}) {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const { data: wpPosts, isLoading, error } = usePosts();

  const articles: Article[] = wpPosts.map((post: WPPost) =>
    formatArticle(post)
  );

  const filteredArticles = articles.filter(
    (article) =>
      selectedCategory === "Tous" || article.category === selectedCategory
  );

  const className = `min-h-screen flex items-center relative border-none border-0 group bg-${color}${
    utility ? `-${utility}` : ""
  }`;

  return (
    <section className={`${className} sticky -top-1 z-${zIndex}`}>
      <SectionDivider
        color={color || "muted"}
        colorReverse={colorReverse}
        reverse={reverse}
        waveType={waveType}
        zIndex={zIndex}
      />
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-8 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Blog & Ressources
        </motion.h1>

        {isLoading ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          </motion.div>
        ) : error ? (
          <motion.div
            className="text-center text-destructive-500 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error.message}
          </motion.div>
        ) : (
          <>
            <div className="flex justify-center gap-4 mb-12">
              {["Tous", "Développement", "SEO"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-muted hover:bg-muted/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className="space-y-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {filteredArticles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredArticles.length === 0 && (
              <motion.p
                className="text-center text-muted-foreground mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Aucun article trouvé dans cette catégorie.
              </motion.p>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
}
