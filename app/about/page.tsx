import { AboutSection } from "@/components/organisms/about/AboutSection";
import { EducationSection } from "@/components/organisms/about/EducationSection";
import { ExperienceSection } from "@/components/organisms/about/ExperienceSection";
import { SkillsSection } from "@/components/organisms/about/SkillsSection";
import { ContactSection } from "@/components/organisms/contact/ContactSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProjectsPreviewSection } from "@/components/organisms/projects/ProjectsPreviewSection";
import Footer from "@/components/v2/footer";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "À Propos | Bernard Rogier - Développeur Web Full Stack",
  description:
    "Découvrez mon parcours de développeur web full stack, mon expertise en WordPress et Next.js, et ma passion pour le développement web. Plus de 5 ans d'expérience dans la création de solutions web sur mesure.",
  path: "/about",
  type: "profile",
  keywords: [
    "Bernard Rogier",
    "développeur full stack",
    "expert WordPress",
    "développeur Next.js",
    "parcours professionnel",
  ],
  image: "/images/og-about.jpg",
  category: "About",
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: "https://www.dev-nanard.fr/v2/about",
    siteName: "Bernard Rogier - Développeur Web",
    title: "À Propos de Bernard Rogier",
    description: "Découvrez mon parcours de développeur web full stack",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Bernard Rogier - Développeur Web",
        type: "image/jpeg",
      },
    ],
  },
});

const heroContent = {
  title: "Développeur Web Passionné",
  highlight: "WordPress & React",
  subtitle:
    "Création de solutions web innovantes et performantes adaptées à vos besoins",
  primaryButton: {
    text: "À propos de moi",
    link: "#about",
  },
  secondaryButton: {
    text: "Me contacter",
    link: "#contact",
  },
};

const aboutContent = {
  title: "À propos de moi",
  subtitle: "Développeur WordPress & Intégrateur Web",
  description: `Passionné par le développement web, je me spécialise dans la création de sites WordPress performants et professionnels. Mon approche combine expertise technique et créativité pour concevoir des solutions web adaptées à chaque projet. Curieux et en constante évolution, j'explore les technologies modernes comme React et Next.js pour enrichir mes compétences.`,
  image: "/me.jpg",
  stats: [
    { number: "2+", label: "Année d'expérience" },
    { number: "5+", label: "Projets WordPress" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title={heroContent.title}
        highlight={heroContent.highlight}
        subtitle={heroContent.subtitle}
        primaryButtonText={heroContent.primaryButton.text}
        primaryButtonLink={heroContent.primaryButton.link}
        secondaryButtonText={heroContent.secondaryButton.text}
        secondaryButtonLink={heroContent.secondaryButton.link}
      />

      <AboutSection
        title={aboutContent.title}
        subtitle={aboutContent.subtitle}
        description={aboutContent.description}
        image={aboutContent.image}
        stats={aboutContent.stats}
        color="muted"
        waveType="type1"
        zIndex={10}
      />

      <SkillsSection color="background" waveType="type1" zIndex={20} />

      <ExperienceSection waveType="type3" zIndex={30} />

      <EducationSection waveType="type1" zIndex={40} />

      <ProjectsPreviewSection color="muted" waveType="type3" zIndex={50} />

      <ContactSection color="background" waveType="type1" zIndex={60} />

      <Footer />
    </>
  );
}
