import { ArticleContent } from "@/components/organisms/blog/ArticleContent";
import { ArticleHeader } from "@/components/organisms/blog/ArticleHeader";
import { RelatedArticles } from "@/components/organisms/blog/RelatedArticles";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/v2/footer";
import { WPPost } from "@/types/wordpress";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string): Promise<WPPost> {
  const res = await fetch(
    `https://www.api.dev-nanard.fr/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const posts = await res.json();

  if (!posts.length) {
    throw new Error("Post not found");
  }

  return posts[0];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPost(slug);

    return {
      title: `${post.title.rendered} | Bernard Rogier`,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
      openGraph: {
        title: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
        images: [
          {
            url: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Article | Bernard Rogier",
      description: "Article non trouvé  " + error,
    };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  try {
    const post = await getPost(slug);

    const article = {
      id: post.id,
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
      date: post.date,
      category: "Développement", // À adapter selon vos catégories
      readTime: "5 min",
      image:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/images/default-blog.jpg",
      content: post.content.rendered,
      slug: post.slug,
    };

    return (
      <>
        <article className="container mx-auto px-4 pt-20 pb-10">
          <div className="max-w-4xl mx-auto">
            <ArticleHeader article={article} />
            <ArticleContent content={article.content} />
            <Separator className="bg-muted/30" />
          </div>
        </article>
        <RelatedArticles currentArticleId={article.id} />
        <Footer />
      </>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    return notFound();
  }
}
