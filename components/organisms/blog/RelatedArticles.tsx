"use client";

import { ArticleCard } from "@/components/molecules/blog/ArticleCard";
import { usePosts } from "@/hooks/useWordPress";
import { formatArticle } from "@/lib/wordpress";
import { Article, WPPost } from "@/types/wordpress";
import { motion } from "motion/react";

interface RelatedArticlesProps {
  currentArticleId: number;
}

export function RelatedArticles({ currentArticleId }: RelatedArticlesProps) {
  const { data: wpPosts, isLoading, error } = usePosts();

  if (isLoading || error) return null;

  const articles: Article[] = wpPosts
    .filter((post: WPPost) => post.id !== currentArticleId)
    .map((post: WPPost) => formatArticle(post))
    .slice(0, 3);

  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Articles similaires
          </motion.h2>

          <div className="space-y-8">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
