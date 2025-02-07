import Link from "next/link";
import { IconType } from "react-icons";

interface NavigationCardProps {
  href: string;
  label: string;
  title: string;
  icon: IconType;
  type: "previous" | "next";
}

export function NavigationCard({
  href,
  label,
  title,
  icon: Icon,
  type,
}: NavigationCardProps) {
  return (
    <Link
      href={href}
      className="block w-full hover:scale-102 transition-all duration-300"
    >
      <div className="bg-card p-2 md:p-4 rounded-lg hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          {type === "previous" && <Icon className="text-primary" />}
          <div
            className={`${
              type === "previous" ? "text-end" : "text-start"
            } flex flex-col gap-1 w-full`}
          >
            <p className="text-sm text-muted-foreground">{label}</p>
            <h3 className="font-medium">{title}</h3>
          </div>
          {type === "next" && <Icon className="text-primary" />}
        </div>
      </div>
    </Link>
  );
}
