import { APP_CONFIG } from "@/lib/constants/contact";
import { ApiResponse } from "@/types/api";
import { Contact } from "@/types/contact";

const BASE_URL = `${APP_CONFIG.apiBaseUrl}/contacts`;

export const contactService = {
  async getAll(): Promise<ApiResponse<Contact[]>> {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      return { data, status: "success" };
    } catch (error) {
      return {
        error: `Erreur lors de la récupération des contacts: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`,
        status: "error",
      };
    }
  },

  async getById(id: string): Promise<ApiResponse<Contact>> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      return { data, status: "success" };
    } catch (error) {
      return {
        error: `Erreur lors de la récupération du contact: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`,
        status: "error",
      };
    }
  },

  async create(contact: Partial<Contact>): Promise<ApiResponse<Contact>> {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      return { data, status: "success" };
    } catch (error) {
      return {
        error: `Erreur lors de la création du contact: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`,
        status: "error",
      };
    }
  },

  async update(
    id: string,
    contact: Partial<Contact>
  ): Promise<ApiResponse<Contact>> {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      return { data, status: "success" };
    } catch (error) {
      return {
        error: `Erreur lors de la mise à jour du contact: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`,
        status: "error",
      };
    }
  },

  async delete(id: string): Promise<ApiResponse<void>> {
    try {
      await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      return { status: "success" };
    } catch (error) {
      return {
        error: `Erreur lors de la suppression du contact: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`,
        status: "error",
      };
    }
  },

  async bulkUpdate(ids: string[], action: string): Promise<ApiResponse<void>> {
    try {
      await fetch(`${BASE_URL}/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, action }),
      });
      return { status: "success" };
    } catch (error) {
      return {
        error: `Erreur lors de la mise à jour groupée: ${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`,
        status: "error",
      };
    }
  },
};
