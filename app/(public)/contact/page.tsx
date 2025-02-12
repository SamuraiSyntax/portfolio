import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { TestimonialsSection } from "@/components/not-logged/testimonials/TestimonialsSection";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Contact | Bernard Rogier - Développeur Web à Bordeaux",
  description:
    "Besoin d'un site web professionnel à Bordeaux ? Contactez-moi pour discuter de votre projet. Expert WordPress et Next.js au service des entreprises de Nouvelle-Aquitaine. Devis gratuit et accompagnement personnalisé.",
  path: "/contact",
  type: "website",
  keywords: [
    "contact développeur web Bordeaux",
    "devis site web Bordeaux",
    "création site internet Nouvelle-Aquitaine",
    "contact freelance WordPress Bordeaux",
    "développeur web Gironde",
    "agence web Bordeaux contact",
    "devis développement web Bordeaux",
    "contact expert WordPress Nouvelle-Aquitaine",
  ],
  image: "/images/og-contact.jpg",
  category: "Contact Développeur Web Bordeaux",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.dev-nanard.fr/contact",
    siteName: "Bernard Rogier - Contact Développeur Web Bordeaux",
    title: "Contactez Bernard Rogier - Développeur Web à Bordeaux",
    description:
      "Discutons de votre projet web à Bordeaux. Expert WordPress et Next.js pour les entreprises de Nouvelle-Aquitaine. Devis gratuit et accompagnement personnalisé.",
    images: [
      {
        url: "/images/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Bernard Rogier - Développeur Web Bordeaux",
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
