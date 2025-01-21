import { ContactSection } from "@/components/organisms/contact/ContactSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { TestimonialsSection } from "@/components/organisms/testimonials/TestimonialsSection";
import Footer from "@/components/v2/footer";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Contact | Bernard Rogier - Développeur WordPress",
  description:
    "Vous avez un projet web ? Discutons ensemble de vos besoins pour créer un site WordPress professionnel et sur mesure. Devis gratuit et accompagnement personnalisé.",
  path: "/contact",
  type: "website",
  keywords: [
    "contact développeur WordPress",
    "devis site WordPress",
    "création site web",
    "développeur junior WordPress",
    "contact Bernard Rogier",
    "développeur web Bordeaux",
    "intégrateur web freelance",
  ],
  image: "/images/og-contact.jpg",
  category: "Contact",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.dev-nanard.fr/contact",
    siteName: "Bernard Rogier - Contact",
    title: "Contactez Bernard Rogier - Développeur WordPress",
    description: "Discutons de votre projet de site WordPress",
    images: [
      {
        url: "/images/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contactez Bernard Rogier - Développeur WordPress",
        type: "image/jpeg",
      },
    ],
  },
});

export default function ContactPage() {
  return (
    <>
      <HeroSection
        title="Parlons de Votre Projet"
        highlight="WordPress & Web"
        subtitle="À l'écoute de vos besoins, je vous accompagne dans la création de votre site web professionnel. Bénéficiez d'un devis gratuit et d'un accompagnement personnalisé."
        primaryButtonText="Remplir le formulaire"
        primaryButtonLink="#contact-form"
        secondaryButtonText="Voir mes services"
        secondaryButtonLink="/services"
      />
      <TestimonialsSection color="muted" waveType="type1" zIndex={20} />
      <ContactSection color="background" waveType="type1" zIndex={30} />
      <Footer />
    </>
  );
}
