import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WPTestimonial } from "@/types/wordpress";
import { FaQuoteLeft } from "react-icons/fa";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: WPTestimonial;
}) {
  const [role, company] =
    testimonial.testimonial_meta?.client_role?.split(" / ") || [];

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <FaQuoteLeft className="w-8 h-8 text-primary/20" />
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <div
          className="text-muted-foreground mb-6 flex-grow italic"
          dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }}
        />
        <div className="border-t pt-4 mt-auto">
          <p className="font-semibold text-primary">
            {testimonial.testimonial_meta?.client_name}
          </p>
          <p className="text-sm text-muted-foreground">
            {role}
            {company && (
              <>
                <span className="mx-2 text-primary/50">•</span>
                <span className="font-medium">{company}</span>
              </>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
