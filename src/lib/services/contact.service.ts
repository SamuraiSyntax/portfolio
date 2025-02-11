import prisma from "@/lib/prisma";
import { EmailService } from "@/lib/services/email.service";
import type { FormValues } from "@/lib/types/contact";
import { Prisma } from "@prisma/client";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export class ContactService {
  private static redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  private static ratelimit = new Ratelimit({
    redis: ContactService.redis,
    limiter: Ratelimit.slidingWindow(
      process.env.NODE_ENV === "development" ? 100 : 3,
      "24 h"
    ),
  });

  static async create(data: FormValues, clientIp: string) {
    try {
      console.log("Received data:", JSON.stringify(data, null, 2));
      console.log("Client IP:", clientIp);

      // Vérification que les données requises sont présentes
      if (!data || typeof data !== "object") {
        console.error("Invalid data received:", data);
        return {
          success: false,
          error: {
            message: "Les données reçues sont invalides.",
          },
        };
      }

      if (!data.firstName || !data.lastName || !data.email || !data.message) {
        console.error("Missing required fields:", {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          message: data.message,
        });
        return {
          success: false,
          error: {
            message: "Les champs nom, email et message sont requis.",
          },
        };
      }

      // Vérification du rate limiting par IP
      const rateLimitResult = await this.ratelimit.limit(clientIp);

      if (!rateLimitResult.success) {
        const remainingTime = rateLimitResult.reset - Date.now();
        return {
          success: false,
          error: {
            message: "Trop de tentatives. Veuillez réessayer plus tard.",
            remainingTime: remainingTime,
          },
        };
      }

      // 2. Vérification si l'email existe déjà dans les dernières 24h
      const lastContact = await prisma.contact.findFirst({
        where: {
          email: data.email,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
      });

      if (lastContact) {
        return {
          success: false,
          error: {
            message: "Un message a déjà été envoyé avec cet email récemment.",
          },
        };
      }

      // 4. Nettoyage et validation des données
      const cleanedData = {
        firstName: data.firstName.trim().substring(0, 100),
        lastName: data.lastName.trim().substring(0, 100),
        email: data.email?.toLowerCase().trim().substring(0, 255),
        message: data.message?.trim().substring(0, 2000),
        phone: data.phone?.trim().substring(0, 20),
        company: data.company?.trim().substring(0, 255) || null,
        clientType: data.clientType?.substring(0, 50) || null,
        projectType: data.projectType?.substring(0, 50) || null,
        budget: data.budget ? Number.parseFloat(data.budget.toString()) : null,
        deadline: data.deadline ? new Date(data.deadline) : null,
        existingSite: data.existingSite?.trim().substring(0, 255) || null,
        ipAddress: clientIp ? clientIp.substring(0, 45) : null,
        status: "NEW",
        source: "WEBSITE",
        priority: "NORMAL",
        newsletter: data.newsletter || false,
        metadata: data.metadata || {},
      };

      // Validation des données avant création
      if (
        !cleanedData.firstName ||
        !cleanedData.lastName ||
        !cleanedData.email ||
        !cleanedData.message
      ) {
        return {
          success: false,
          error: {
            message: "Les champs nom, email et message sont requis.",
          },
        };
      }

      console.log(
        "Attempting to create contact with data:",
        JSON.stringify(cleanedData, null, 2)
      );

      // 5. Création du contact dans la base de données
      const contact = await prisma.contact.create({
        data: cleanedData as Prisma.ContactCreateInput,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          message: true,
          phone: true,
          company: true,
          clientType: true,
          projectType: true,
          budget: true,
          deadline: true,
          existingSite: true,
        },
      });

      console.log(
        "Contact created successfully:",
        JSON.stringify(contact, null, 2)
      );

      if (!contact.id) {
        throw new Error("Contact créé sans ID");
      }

      // 6. Envoi de l'email avec délai aléatoire pour éviter les patterns
      const delay = Math.floor(Math.random() * 2000) + 1000; // 1-3 secondes
      setTimeout(async () => {
        await EmailService.sendNewContactNotification(data, contact.id);
      }, delay);

      // 7. Stockage de l'historique dans Redis pour analyse
      await this.redis.zadd("contact_history", {
        score: Date.now(),
        member: `${contact.id}:${cleanedData.ipAddress}`,
      });

      return { success: true, data: contact };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma error:", error.code, error.message, error.meta);
        let errorMessage =
          "Une erreur est survenue lors de la création du contact.";

        if (error.code === "P2000") {
          errorMessage =
            "Une ou plusieurs valeurs sont trop longues. Veuillez réduire la longueur des champs.";
        }

        return {
          success: false,
          error: {
            message: errorMessage,
            code: error.code,
            details: error.message,
          },
        };
      }
      console.error("Detailed error in ContactService.create:", error);
      return {
        success: false,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Une erreur inattendue est survenue",
          details: error instanceof Error ? error.stack : undefined,
        },
      };
    }
  }

  static async delete(id: string) {
    try {
      const deletedContact = await prisma.contact.delete({
        where: { id },
      });
      return deletedContact;
    } catch (error) {
      console.error("Erreur lors de la suppression du contact:", error);
      throw error;
    }
  }
}
