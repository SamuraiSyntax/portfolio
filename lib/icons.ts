import {
  FaCode,
  FaDatabase,
  FaSearch,
  FaStore,
  FaTools,
  FaWordpress,
} from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

const iconMap: Record<string, React.ElementType> = {
  FaWordpress,
  SiNextdotjs,
  FaStore,
  FaTools,
  FaCode,
  FaDatabase,
  FaSearch,
};

export function getServiceIcon(iconName: string): React.ElementType {
  return iconMap[iconName] || FaCode;
}
