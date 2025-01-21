import { BlogSection } from "@/components/organisms/blog/BlogSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import Footer from "@/components/v2/footer";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Blog Tech & Développement Web",
  description:
    "Articles, tutoriels et actualités sur le développement web, WordPress, Next.js, React et les meilleures pratiques. Partageons ensemble nos connaissances techniques.",
  path: "/blog",
  type: "article",
  keywords: [
    "blog développement web",
    "tutoriels WordPress",
    "actualités Next.js",
  ],
  image: "/images/og-blog.jpg",
  category: "Blog",
  openGraph: {
    type: "article",
    locale: "fr_FR",
    url: "https://www.dev-nanard.fr/v2/blog",
    siteName: "Bernard Rogier - Blog Tech",
    title: "Blog Tech & Développement Web",
    description: "Articles et tutoriels sur le développement web",
    images: [
      {
        url: "/images/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Tech de Bernard Rogier",
        type: "image/jpeg",
      },
    ],
  },
  alternates: {
    canonical: "https://www.dev-nanard.fr/v2/blog",
    types: {
      "application/rss+xml": "https://www.dev-nanard.fr/feed.xml",
    },
  },
});

export default function BlogPage() {
  return (
    <>
      <HeroSection
        title="Blog & Ressources"
        subtitle="Articles et tutoriels sur le développement web"
        highlight="Tech Blog"
      />
      <BlogSection color="muted" waveType="type1" zIndex={10} />
      <Footer />
    </>
  );
}
