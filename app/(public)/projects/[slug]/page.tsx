import Footer from "@/components/footer";
import { ContactSection } from "@/components/not-logged/contact/ContactSection";
import { ErrorMessage } from "@/components/not-logged/ErrorMessage";
import { HeroSection } from "@/components/not-logged/HeroSection";
import { LoadingSpinner } from "@/components/not-logged/LoadingSpinner";
import { NavigationCard } from "@/components/not-logged/projects/NavigationCard";
import { SectionDivider } from "@/components/not-logged/SectionDivider";
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
  const { slug } = await params;
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

function ProjectNavigation({
  previous,
  next,
  zIndex,
}: {
  previous: WPProject;
  next: WPProject;
  zIndex: number;
}) {
  const navigation = [
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
  ];

  return (
    <section
      className="w-full px-4 sticky top-0 bg-muted flex items-center justify-center group"
      style={{ zIndex }}
    >
      <SectionDivider color="muted" waveType="type2" zIndex={zIndex} />
      <div className="grid grid-cols-2 gap-4 container mx-auto py-16">
        {navigation.map((item) => (
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
}

function ProjectImage({
  project,
  zIndex,
}: {
  project: WPProject;
  zIndex: number;
}) {
  if (!project.project_meta.media_url) return null;

  return (
    <section
      className="sticky top-0 h-screen bg-background transition-colors duration-300 ease-in-out flex items-center justify-center"
      style={{ zIndex }}
    >
      <div className="relative w-full h-full">
        {project.project_meta.media_type === "video" ? (
          <video
            src={project.project_meta.media_url}
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-black/10 z-10" />
            <Image
              src={project.project_meta.media_url}
              alt={project.title.rendered}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </>
        )}
      </div>
    </section>
  );
}

function ProjectDetails({
  project,
  zIndex,
}: {
  project: WPProject;
  zIndex: number;
}) {
  return (
    <section
      className="sticky top-0 min-h-screen bg-transparent transition-colors duration-300 ease-in-out flex items-center justify-center px-4"
      style={{ zIndex }}
    >
      <div className="bg-card rounded-2xl p-8 shadow-xl container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <FaTools className="text-primary" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.project_meta.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <FaCalendar className="text-primary" />
                Date de réalisation
              </h3>
              <p className="text-lg">{project.project_meta.date}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-between">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: project.project_meta.description,
              }}
            />
            {project.project_meta.url && (
              <Link
                href={project.project_meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-center bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-md"
              >
                Voir le projet en ligne
                <FaExternalLinkAlt className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectDescription({
  project,
  zIndex,
}: {
  project: WPProject;
  zIndex: number;
}) {
  if (!project.project_meta.description) return null;

  return (
    <section
      className="sticky top-0 min-h-screen bg-transparent transition-colors duration-300 ease-in-out flex items-center justify-center px-4"
      style={{ zIndex }}
    >
      <div className="bg-card rounded-2xl p-8 shadow-xl container mx-auto">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: project.project_meta.description }}
        />
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  try {
    const { slug } = await params;
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
        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
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
              <div className="container mx-auto flex flex-row flex-wrap justify-center my-4 gap-2">
                {technologies}
              </div>
            }
          />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
          <ProjectImage project={project} zIndex={10} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[40vh]" />}>
          <ProjectDescription project={project} zIndex={10} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[30vh]" />}>
          <ProjectDetails project={project} zIndex={20} />
        </Suspense>

        <Suspense fallback={<LoadingSpinner className="min-h-[20vh]" />}>
          <ProjectNavigation previous={previous} next={next} zIndex={40} />
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
