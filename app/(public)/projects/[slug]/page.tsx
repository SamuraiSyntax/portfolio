import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { ErrorMessage } from "@/components/not-logged/ErrorMessage";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { LoadingSpinner } from "@/components/not-logged/LoadingSpinner";
import { NavigationCard } from "@/components/not-logged/projects/NavigationCard";
import { decodeHTMLEntities, truncateText } from "@/lib/utils";
import { wpFetch } from "@/lib/wordpress";
import { WPProject } from "@/types/wordpress";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendar,
  FaExternalLinkAlt,
  FaTools,
} from "react-icons/fa";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProjects() {
  return wpFetch<WPProject[]>({
    endpoint: "projects",
    embed: true,
  });
}

async function findProjectNavigation(
  projects: WPProject[],
  currentSlug: string
) {
  const currentIndex = projects.findIndex(
    (project) => project.slug === currentSlug
  );
  const totalProjects = projects.length;

  return {
    previous:
      currentIndex > 0
        ? projects[currentIndex - 1]
        : projects[totalProjects - 1],
    current: projects[currentIndex],
    next:
      currentIndex < totalProjects - 1
        ? projects[currentIndex + 1]
        : projects[0],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const projects = await getProjects();
  const { current: project } = await findProjectNavigation(projects, slug);

  if (!project) return {};

  const title = decodeHTMLEntities(project.title.rendered);
  const description = truncateText(project.content.rendered, 160);

  return {
    title: `${title} | Bernard Rogier`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.dev-nanard.fr/projects/${slug}`,
      images: [
        {
          url: project.project_meta.featured_image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

const ProjectImage = ({ project }: { project: WPProject }) => {
  if (!project.project_meta.media_url) return null;

  return (
    <section className="relative h-[50vh] md:h-screen w-full group overflow-hidden">
      {project.project_meta.media_type === "video" ? (
        <video
          src={project.project_meta.media_url}
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="relative h-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 z-10" />
          <Image
            src={project.project_meta.media_url}
            alt={project.title.rendered}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="100vw"
            priority
          />
        </div>
      )}
    </section>
  );
};

const ProjectDetails = ({ project }: { project: WPProject }) => {
  return (
    <section className="px-4 py-12">
      <div className="container mx-auto bg-muted/20 hover:bg-muted/50 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <FaTools className="text-primary animate-spin-slow" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.project_meta.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <FaCalendar className="text-primary" />
                Date de réalisation
              </h3>
              <p className="text-lg">{project.project_meta.date}</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground hover:prose-a:text-primary transition-colors duration-300"
              dangerouslySetInnerHTML={{
                __html: project.project_meta.description,
              }}
            />
            {project.project_meta.url && (
              <Link
                href={project.project_meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center bg-primary text-primary-foreground h-12 px-6 rounded-md hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
              >
                Voir le projet en ligne
                <FaExternalLinkAlt className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectNavigation = ({
  previous,
  next,
}: {
  previous: WPProject;
  next: WPProject;
}) => {
  return (
    <section className="px-4 py-8 bg-muted">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            project: previous,
            label: "Projet précédent",
            icon: FaArrowLeft,
            type: "previous" as const,
          },
          {
            project: next,
            label: "Projet suivant",
            icon: FaArrowRight,
            type: "next" as const,
          },
        ].map((item) => (
          <NavigationCard
            key={item.project.id}
            href={`/projects/${item.project.slug}`}
            label={item.label}
            title={decodeHTMLEntities(item.project.title.rendered)}
            icon={item.icon}
            type={item.type}
          />
        ))}
      </div>
    </section>
  );
};

export default async function ProjectPage({ params }: Props) {
  try {
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const projects = await getProjects();
    const {
      previous,
      current: project,
      next,
    } = await findProjectNavigation(projects, slug);

    if (!project) return notFound();

    const decodedTitle = decodeHTMLEntities(project.title.rendered);
    const technologies = project.project_meta.technologies.map((tech) => (
      <span
        key={tech}
        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-300"
      >
        {tech}
      </span>
    ));

    return (
      <main className="min-h-screen bg-background">
        <Suspense fallback={<LoadingSpinner className="min-h-[50vh]" />}>
          <HeroSection
            title={decodedTitle}
            subtitle={
              <div className="flex flex-wrap justify-center gap-2 my-4 animate-fade-in">
                {technologies}
              </div>
            }
          />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
          <ProjectImage project={project} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
          <ProjectDetails project={project} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[20vh]" />}>
          <ProjectNavigation previous={previous} next={next} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[30vh]" />}>
          <ContactSection color="background" waveType="type1" zIndex={50} />
        </Suspense>

        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Project page error:", error);
    return (
      <ErrorMessage
        error={
          error instanceof Error ? error : new Error("Une erreur est survenue")
        }
      />
    );
  }
}
