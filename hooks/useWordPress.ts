"use client";

import { WPPost, WPProject, WPService, WPTestimonial } from "@/types/wordpress";
import { useEffect, useState } from "react";

interface UseWPResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseWPListResponse<T> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
}

async function fetchWPData<T>(
  endpoint: string,
  query: Record<string, string> = {}
): Promise<T> {
  const queryParams = new URLSearchParams(query).toString();
  const url = `/api/wordpress?endpoint=${endpoint}${
    queryParams ? `&${queryParams}` : ""
  }`;

  const response = await fetch(url, {
    next: {
      revalidate: 3600,
      tags: [endpoint],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export function useServiceBySlug(slug: string): UseWPResponse<WPService> {
  const [state, setState] = useState<UseWPResponse<WPService>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const services = await fetchWPData<WPService[]>("services", { slug });
        setState({
          data: services?.[0] || null,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error:
            error instanceof Error
              ? error
              : new Error("Une erreur est survenue"),
        });
      }
    };

    fetchService();
  }, [slug]);

  return state;
}

export function useServices(): UseWPListResponse<WPService> {
  const [state, setState] = useState<UseWPListResponse<WPService>>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const services = await fetchWPData<WPService[]>("services");
        setState({
          data: services,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: [],
          isLoading: false,
          error:
            error instanceof Error
              ? error
              : new Error("Une erreur est survenue"),
        });
      }
    };

    fetchServices();
  }, []);

  return state;
}

export function useProjects(): UseWPListResponse<WPProject> {
  const [state, setState] = useState<UseWPListResponse<WPProject>>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await fetchWPData<WPProject[]>("projects");
        setState({
          data: projects,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: [],
          isLoading: false,
          error:
            error instanceof Error
              ? error
              : new Error("Une erreur est survenue"),
        });
      }
    };

    fetchProjects();
  }, []);

  return state;
}

export function useTestimonials(): UseWPListResponse<WPTestimonial> {
  const [state, setState] = useState<UseWPListResponse<WPTestimonial>>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonials = await fetchWPData<WPTestimonial[]>("testimonials");
        setState({
          data: testimonials,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: [],
          isLoading: false,
          error:
            error instanceof Error
              ? error
              : new Error("Une erreur est survenue"),
        });
      }
    };

    fetchTestimonials();
  }, []);

  return state;
}

export function usePosts(): UseWPListResponse<WPPost> {
  const [state, setState] = useState<UseWPListResponse<WPPost>>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await fetchWPData<WPPost[]>("posts");
        setState({
          data: posts,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: [],
          isLoading: false,
          error:
            error instanceof Error
              ? error
              : new Error("Une erreur est survenue"),
        });
      }
    };

    fetchPosts();
  }, []);

  return state;
}
