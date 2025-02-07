import Footer from "@/components/footer";
import { AboutSection } from "@/components/not-logged/about/AboutSection";
import { EducationSection } from "@/components/not-logged/about/EducationSection";
import { ExperienceSection } from "@/components/not-logged/about/ExperienceSection";
import { SkillsSection } from "@/components/not-logged/about/SkillsSection";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { ProjectsPreviewSection } from "@/components/not-logged/projects/ProjectsPreviewSection";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "À Propos | Bernard Rogier - Développeur Web Full Stack",
  description:
    "Découvrez mon parcours de développeur web full stack, mon expertise en WordPress et Next.js, et ma passion pour le développement web. Plus de 5 ans d'expérience dans la création de solutions web sur mesure, incluant le développement de sites vitrines, e-commerce et applications web.",
  path: "/about",
  type: "profile",
  keywords: [
    "Bernard Rogier",
    "développeur web",
    "expert WordPress",
    "développement Next.js",
    "création de sites web",
    "SEO",
    "services web",
    "formation WordPress",
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
  title: "Développeur Web Bordelais",
  highlight: "Expert WordPress & React",
  subtitle:
    "<span>Solutions web innovantes au cœur de Bordeaux.</span><span>Accompagnement personnalisé pour votre présence digitale en Nouvelle-Aquitaine.</span>",
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
  title: "Développeur Web à Bordeaux",
  subtitle: "Expert WordPress & Solutions Digitales",
  description: `Basé à Bordeaux, je suis un développeur web passionné spécialisé dans la création de sites WordPress et d'applications web modernes. J'accompagne les entreprises bordelaises et de la Nouvelle-Aquitaine dans leur transformation digitale, en proposant des solutions web sur mesure, performantes et évolutives. Mon expertise technique, combinée à ma connaissance du tissu économique local, me permet de créer des projets web parfaitement adaptés aux besoins des entreprises de la région.`,
  image: "/me.jpg",
  stats: [
    { number: "2+", label: "Années d'expérience" },
    { number: "10+", label: "Projets en Nouvelle-Aquitaine" },
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

      <ProjectsPreviewSection
        color="muted"
        waveType="type3"
        zIndex={50}
        showPrimaryButton={true}
        primaryButtonText="Voir tous mes projets"
        primaryButtonLink="/projects"
      />

      <ContactSection color="background" waveType="type1" zIndex={60} />

      <Footer />
    </>
  );
}
