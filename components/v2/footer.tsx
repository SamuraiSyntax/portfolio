"use client";

import { SectionDivider } from "@/components/atoms/SectionDivider";
import { motion } from "motion/react";
import Link from "next/link";
import {
  FaCode,
  FaEnvelope,
  FaGithub,
  FaHome,
  FaLinkedin,
  FaTools,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "À propos",
      content:
        "Développeur web full stack freelance spécialisé en WordPress et Next.js. Création de solutions web innovantes et performantes.",
      social: [
        {
          name: "GitHub",
          url: "https://github.com/BernardRogier",
          icon: <FaGithub className="w-5 h-5" />,
        },
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/bernard-rogier",
          icon: <FaLinkedin className="w-5 h-5" />,
        },
        {
          name: "Twitter",
          url: "https://twitter.com/BernardRogier",
          icon: <FaTwitter className="w-5 h-5" />,
        },
      ],
    },
    {
      title: "Navigation",
      links: [
        { href: "/", label: "Accueil", icon: <FaHome /> },
        { href: "/about", label: "À propos de moi", icon: <FaUser /> },
        { href: "/services", label: "Mes services", icon: <FaTools /> },
        { href: "/projects", label: "Mes projets", icon: <FaCode /> },
        { href: "/contact", label: "Me contacter", icon: <FaEnvelope /> },
      ],
    },
    {
      title: "Contact",
      contact: {
        email: "contact@dev-nanard.fr",
        address: "Bordeaux, France",
      },
    },
  ];

  return (
    <footer
      className="bg-secondary text-primary flex items-center group sticky top-0"
      style={{ zIndex: 1000 }}
    >
      <SectionDivider color="secondary" waveType="type3" zIndex={1000} />

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full md:w-auto mx-auto"
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>

              {section.content && (
                <p className="text-muted-foreground mb-4">{section.content}</p>
              )}

              {section.social && (
                <div className="flex space-x-4">
                  {section.social.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                      aria-label={platform.name}
                    >
                      {platform.icon}
                    </a>
                  ))}
                </div>
              )}

              {section.links && (
                <ul className="flex flex-col gap-2 text-muted-foreground">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        {link.icon}
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {section.contact && (
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2 hover:text-primary transition-colors">
                    <MdEmail className="w-5 h-5" />
                    <a href={`mailto:${section.contact.email}`}>
                      {section.contact.email}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 hover:text-primary transition-colors">
                    <MdLocationOn className="w-5 h-5" />
                    {section.contact.address}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-4 pt-4 border-t border-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © {currentYear} Bernard Rogier. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0 space-x-4">
              <Link
                href="/mentions-legales"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
