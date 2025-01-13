import { LucideProps, icons } from "lucide-react";
import dynamic from "next/dynamic";
import { FaCircle, FaCog, FaTimesCircle, FaUserTie } from "react-icons/fa";
import {} from "react-icons/fa6";
import { MdWorkspaces } from "react-icons/md";
import { SiFiverr, SiMalt, SiUpwork } from "react-icons/si";

// Lucide Icons
const dynamicIconImport = (iconName: keyof typeof icons) =>
  dynamic<LucideProps>(
    () => import("lucide-react").then((mod) => mod[iconName]),
    {
      ssr: true,
    }
  );

// React Icons Map
const staticIcons = {
  // React Icons
  FaCog,
  FaCircle,
  FaTimesCircle,
  MdWorkspaces,
  SiFiverr,
  SiMalt,
  SiUpwork,
  FaUserTie,
} as const;

export const Icons = {
  // Lucide Icons
  user: dynamicIconImport("User"),
  settings: dynamicIconImport("Settings"),
  mail: dynamicIconImport("Mail"),
  github: dynamicIconImport("Github"),
  linkedin: dynamicIconImport("Linkedin"),
  external: dynamicIconImport("ExternalLink"),
  plus: dynamicIconImport("Plus"),
  close: dynamicIconImport("X"),
  check: dynamicIconImport("Check"),
  chevronLeft: dynamicIconImport("ChevronLeft"),
  chevronRight: dynamicIconImport("ChevronRight"),
  sun: dynamicIconImport("Sun"),
  moon: dynamicIconImport("Moon"),

  // React Icons
  ...staticIcons,
} as const;

export type IconKeys = keyof typeof Icons;

// Helper pour obtenir une icône
export function getIcon(iconName: string | IconKeys) {
  if (iconName in Icons) {
    return Icons[iconName as IconKeys];
  }
  if (iconName in staticIcons) {
    return staticIcons[iconName as keyof typeof staticIcons];
  }
  return null;
}
