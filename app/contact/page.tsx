import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { TestimonialsSection } from "@/components/not-logged/testimonials/TestimonialsSection";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Contact | Bernard Rogier - Développeur WordPress",
  description:
    "Vous avez un projet web ? Discutons ensemble de vos besoins pour créer un site WordPress professionnel et sur mesure. Devis gratuit et accompagnement personnalisé pour vos projets de développement web.",
  path: "/contact",
  type: "website",
  keywords: [
    "contact développeur WordPress",
    "devis site WordPress",
    "création site web",
    "développeur junior WordPress",
    "accompagnement projet web",
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
        highlight="Accompagnement Personnalisé"
        subtitle="<span>À l'écoute de vos besoins, je vous accompagne dans la création de votre site web professionnel.</span><span>Bénéficiez d'un devis gratuit et d'un accompagnement personnalisé pour chaque projet.</span>"
        primaryButtonText="Remplir le formulaire"
        primaryButtonLink="#contact"
        secondaryButtonText="Voir mes services"
        secondaryButtonLink="/services"
      />
      <TestimonialsSection color="muted" waveType="type1" zIndex={20} />

      <ContactSection color="background" waveType="type1" zIndex={30} />

      <Footer />
    </>
  );
}
