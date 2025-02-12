import Footer from "@/components/footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales - Bernard Rogier",
  description:
    "Mentions légales du site web de Bernard Rogier, développeur web à Bordeaux.",
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto py-16 px-4 lg:py-24 lg:px-8 flex-grow">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>
          <p className="mb-6">
            Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance
            dans l&apos;économie numérique, nous vous informons que :
          </p>
          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Éditeur du site
            </h2>
            <p className="mb-6">
              Bernard Rogier
              <br />
              Adresse : 33000 Bordeaux, France
              <br />
              Email :{" "}
              <Link href="mailto:contact@dev-nanard.fr">
                contact@dev-nanard.fr
              </Link>
              <br />
              Directeur de la publication : Bernard Rogier
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Hébergement</h2>
            <p className="mb-6">
              Le site est hébergé par Vercel Inc.
              <br />
              340 S Lemon Ave #4133
              <br />
              Walnut, CA 91789
              <br />
              États-Unis
              <br />
              Téléphone : <Link href="tel:+15592887060">(559) 288-7060</Link>
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              Propriété intellectuelle
            </h2>
            <p className="mb-6">
              Tous les contenus présents sur ce site, y compris les textes,
              images, graphismes, logos, vidéos, etc., sont protégés par le
              droit d&apos;auteur et appartiennent à Bernard Rogier ou à des
              tiers ayant autorisé leur utilisation.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Responsabilité</h2>
            <p className="mb-6">
              Bernard Rogier ne pourra être tenu responsable des dommages
              directs ou indirects résultant de l&apos;utilisation de ce site.
            </p>
          </section>
        </article>
      </div>
      <Footer />
    </main>
  );
}
