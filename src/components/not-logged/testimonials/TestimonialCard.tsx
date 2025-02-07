import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { WPTestimonial } from "@/types/wordpress";
import { FaQuoteLeft, FaStar, FaStarHalf } from "react-icons/fa";

interface TestimonialCardProps {
  testimonial: WPTestimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  const { testimonial_meta: meta, content } = testimonial;

  const [role, company] = meta?.client_role?.split(" / ") || [];
  const rating = meta?.rating ? parseFloat(meta.rating) : 0;

  // Nettoyer le HTML du contenu
  const cleanContent = content.rendered
    .replace(/\n/g, "")
    .replace(/&#8230;/g, "...")
    .replace(/<p>/g, '<p class="mb-4">');

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`star-${i}`} className="text-primary w-auto h-full" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalf key="half-star" className="text-primary w-auto h-full" />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaStar
          key={`empty-star-${i}`}
          className="text-secondary w-auto h-full"
        />
      );
    }

    return stars;
  };

  return (
    <Card
      data-hover="false"
      className={cn(
        "flex flex-col h-full hover:shadow-lg transition-all duration-300 relative",
        "dark:hover:shadow-primary/5 [&:hover_.quote-icon]:text-primary",
        className
      )}
    >
      <CardHeader className="flex flex-col gap-4">
        <div className="flex justify-between items-start gap-2">
          <FaQuoteLeft className="w-8 h-8 text-primary/20 transition-colors duration-300 quote-icon" />
          {rating > 0 && (
            <div
              className="flex gap-1 w-full h-full justify-end items-center"
              title={`${rating} sur 5 étoiles`}
            >
              {renderStars(rating)}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-grow">
        <div
          className="text-muted-foreground flex-grow italic"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />

        <div className="border-t pt-4 flex flex-col gap-2">
          <p className="font-semibold text-primary">{meta?.client_name}</p>
          <div className="text-sm text-muted-foreground">
            {role}
            {company && (
              <>
                <span className="mx-2 text-primary/50">•</span>
                <span className="font-medium">{company}</span>
              </>
            )}
          </div>
          {meta?.project_related && (
            <a
              href={meta.project_related}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-block mt-2"
            >
              Voir le projet associé
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
