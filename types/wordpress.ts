import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export interface NavigationItem {
  service: WPService;
  label: string;
  icon: typeof FaArrowLeft | typeof FaArrowRight;
}

export interface WPPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  categories: number[];
  slug: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

export interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
  content: string;
}

export interface WPProject extends WPPost {
  project_meta: {
    description: string;
    category: "web" | "app" | "design" | "other";
    media_type: "image" | "video" | "gif";
    media_url: string;
    url: string;
    technologies: string[];
    date: string;
    featured_image: string;
    github_url: string;
    status: "completed" | "in_progress" | "maintenance";
    client: string;
  };
}

export interface WPService extends WPPost {
  service_meta: {
    icon: string;
    price: string;
    features: string[];
    featured_image: string;
    duration: string;
    included_services: string[];
  };
}

export interface WPTestimonial extends WPPost {
  testimonial_meta: {
    client_name: string;
    client_role: string;
    project_related: string;
    rating?: string;
    project_link?: string;
    testimonial_date: string;
  };
}
