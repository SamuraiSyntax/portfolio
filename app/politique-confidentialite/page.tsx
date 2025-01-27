import CookiePreferences from "@/components/v2/CookiePreferences";
import Footer from "@/components/v2/footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Bernard Rogier",
  description:
    "Politique de confidentialité du site web de Bernard Rogier, développeur web à Bordeaux.",
  openGraph: {
    title: "Politique de confidentialité - Bernard Rogier",
    description:
      "Politique de confidentialité du site web de Bernard Rogier, développeur web à Bordeaux.",
  },
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto py-16 px-4 lg:py-24 lg:px-8 flex-grow">
        <article className="prose prose-slate dark:prose-invert max-w-3xl mx-auto">
          <h1>Politique de confidentialité</h1>

          <p>
            Bernard Rogier s&apos;engage à ce que la collecte et le traitement
            de vos données soient conformes au règlement général sur la
            protection des données (RGPD) et à la loi Informatique et Libertés.
          </p>

          <section>
            <h2>Collecte et traitement des données</h2>
            <p>
              En application du RGPD et de la Loi Informatique et Libertés du 6
              janvier 1978, nous traitons les données recueillies uniquement
              pour :
            </p>
            <ul>
              <li>Répondre à vos demandes de contact</li>
              <li>Améliorer votre expérience utilisateur</li>
              <li>Établir des statistiques de navigation anonymes</li>
            </ul>
          </section>

          <section>
            <h2>Cookies et traceurs</h2>
            <p>Notre site utilise trois types de cookies :</p>
            <ul>
              <li>
                <strong>Cookies essentiels :</strong> Nécessaires au
                fonctionnement du site
              </li>
              <li>
                <strong>Cookies analytiques :</strong> Pour mesurer
                l&apos;audience (données anonymes)
              </li>
              <li>
                <strong>Cookies de préférences :</strong> Pour mémoriser vos
                choix d&apos;affichage
              </li>
            </ul>
            <p>Vous pouvez gérer vos préférences de cookies ci-dessous :</p>
            <CookiePreferences />
          </section>

          <section>
            <h2>Durée de conservation</h2>
            <p>
              Les données personnelles sont conservées pour une durée limitée :
            </p>
            <ul>
              <li>Données de contact : 3 ans après le dernier contact</li>
              <li>Cookies : 13 mois maximum</li>
              <li>Données de navigation : 12 mois maximum</li>
            </ul>
          </section>

          <section>
            <h2>Vos droits</h2>
            <p>
              Conformément à la réglementation, vous disposez des droits
              suivants :
            </p>
            <ul>
              <li>Droit d&apos;accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l&apos;effacement (droit à l&apos;oubli)</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d&apos;opposition</li>
            </ul>
            <p>
              Pour exercer ces droits, vous pouvez me contacter directement à :
              <Link href="mailto:contact@dev-nanard.fr">
                contact@dev-nanard.fr
              </Link>
            </p>
          </section>

          <section>
            <h2>Sécurité</h2>
            <p>
              Je mets en œuvre toutes les mesures techniques et
              organisationnelles nécessaires pour garantir la sécurité de vos
              données personnelles contre toute accès non autorisé,
              modification, divulgation ou destruction.
            </p>
          </section>

          <section>
            <h2>Réclamation auprès de la CNIL</h2>
            <p>
              Si vous estimez que le traitement de vos données n&apos;est pas
              conforme à la réglementation, vous pouvez adresser une réclamation
              à la CNIL (Commission Nationale de l&apos;Informatique et des
              Libertés).
            </p>
          </section>

          <section>
            <h2>Mise à jour</h2>
            <p>
              Cette politique de confidentialité peut être mise à jour à tout
              moment. La date de dernière mise à jour est le 27 janvier 2025.
            </p>
          </section>
        </article>
      </div>
      <Footer />
    </main>
  );
}
