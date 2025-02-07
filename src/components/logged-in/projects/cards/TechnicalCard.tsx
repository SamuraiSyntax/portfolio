import { Card, CardContent } from "@/components/ui/card";

export function TechnicalCard({
  icon,
  title,

  value,
  isLink,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string;
  isLink?: boolean;
}) {
  if (!value) return null;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="font-semibold">{title}</h3>
        </div>
        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {value}
          </a>
        ) : (
          <p>{value}</p>
        )}
      </CardContent>
    </Card>
  );
}
