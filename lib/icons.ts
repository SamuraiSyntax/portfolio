import {
  Book,
  Briefcase,
  CircleAlert,
  Cloud,
  Laptop,
  RefreshCw,
  Search,
  ShoppingCart,
} from "lucide-react"; // Importation des icônes lucide
import { IconType } from "react-icons";
import { MdOutlineError } from "react-icons/md"; // Ajout d'une icône par défaut

const iconMap: Record<string, IconType> = {
  search: Search,
  book: Book,
  briefcase: Briefcase,
  refreshcw: RefreshCw,
  cloud: Cloud,
  circlealert: CircleAlert,
  shoppingcart: ShoppingCart,
  laptop: Laptop,
};

export function getServiceIcon(iconName: string): IconType {
  return iconMap[iconName?.toLowerCase() || ""] || MdOutlineError; // Vérification de undefined
}

export function getProjectIcon(iconName: string): IconType {
  return iconMap[iconName?.toLowerCase() || ""] || MdOutlineError; // Vérification de undefined
}
