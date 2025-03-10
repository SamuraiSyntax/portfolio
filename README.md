# Portfolio Professionnel avec Dashboard et WordPress Headless

Ce projet est un portfolio professionnel moderne développé avec Next.js 15, utilisant WordPress comme CMS headless pour la gestion dynamique du contenu. Il intègre un dashboard administrateur et offre une expérience utilisateur optimale.

## 🌟 Fonctionnalités

- **Portfolio Public**

  - Présentation professionnelle moderne
  - Projets avec catégorisation (web, app, design)
  - Services détaillés avec tarification
  - Blog avec articles enrichis
  - Témoignages clients
  - Mode sombre/clair
  - Design responsive et animations fluides
  - Optimisation SEO

- **Dashboard Administrateur**

  - Authentification Google OAuth
  - Gestion des projets et services
  - Analytics et statistiques en temps réel
  - Gestion des messages de contact
  - Interface d'administration intuitive
  - Système de cache avec Redis

- **Intégration WordPress Headless**
  - API REST WordPress personnalisée
  - Types de contenu personnalisés :
    - Projets (avec métadonnées techniques)
    - Services (avec tarification et fonctionnalités)
    - Témoignages (avec informations client)
    - Articles de blog
  - Mise en cache optimisée avec Upstash Redis
  - Revalidation automatique du contenu

## 🚀 Stack Technique

- **Frontend**

  - Next.js 15 (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS avec animations
  - Radix UI (composants accessibles)
  - Zustand (gestion d'état)
  - React Hook Form avec Zod

- **Backend & API**

  - WordPress (Headless CMS)
  - API Routes Next.js
  - Prisma (ORM)
  - PostgreSQL
  - NextAuth.js avec Google OAuth
  - Upstash Redis (cache et rate limiting)

- **Infrastructure**
  - Vercel (hébergement et déploiement)
  - WordPress (gestion de contenu)
  - Resend (emails transactionnels)
  - Google Cloud Platform (authentification)

## 📋 Prérequis

- Node.js 18.x ou supérieur
- PostgreSQL
- Instance WordPress avec REST API activée
- Comptes pour :
  - Vercel
  - Google Cloud Console (OAuth)
  - Upstash
  - Resend

## 🛠️ Installation

1. **Cloner le repository**

   ```bash
   git clone https://github.com/votre-username/portfolio.git
   cd portfolio
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Configuration des variables d'environnement**

   ```bash
   cp .env.example .env
   ```

   Configurez les variables suivantes :

   - Base de données PostgreSQL
   - URL de l'API WordPress
   - Clés Google OAuth
   - Token Upstash Redis
   - Clé API Resend
   - NextAuth secret

4. **Configuration de la base de données**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

## 🌐 Configuration WordPress

1. **Installation des plugins requis**

   - REST API
   - Custom Post Types UI
   - Advanced Custom Fields PRO
   - ACF to REST API

2. **Configuration des Custom Post Types**

   - Projects
   - Services
   - Testimonials

3. **Configuration des champs ACF**

   - Métadonnées des projets (technologies, liens, etc.)
   - Détails des services (prix, fonctionnalités)
   - Informations des témoignages

4. **Sécurité de l'API**
   - Configuration CORS
   - Authentification API
   - Rate limiting

## 📦 Structure du Projet

```
portfolio/
├── app/                    # Routes et pages Next.js
│   ├── api/               # Routes API
│   ├── dashboard/         # Interface admin
│   └── (site)/           # Pages publiques
├── components/            # Composants React
├── hooks/                # Hooks personnalisés
│   └── useWordPress.ts   # Hook d'intégration WP
├── lib/                  # Utilitaires
├── types/               # Types TypeScript
│   └── wordpress.ts     # Types WP
├── prisma/              # Configuration DB
└── public/              # Assets statiques
```

## 🔒 Sécurité

- Authentification OAuth 2.0
- Protection CSRF
- Rate limiting par IP
- Validation des données (Zod)
- Variables d'environnement sécurisées
- Sanitization des contenus WordPress

## 🚀 Déploiement

1. **Préparer le déploiement**

   ```bash
   npm run build
   ```

2. **Déployer sur Vercel**
   ```bash
   vercel --prod
   ```

## 📝 Contribution

Les contributions sont les bienvenues ! Suivez ces étapes :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 📧 Contact

Pour toute question ou suggestion :

- Email: [votre-email]
- Site: [votre-site]
- LinkedIn: [votre-linkedin]
