import prisma from "@/lib/prisma";
import { EmailService } from "@/lib/services/email.service";
import { FormValues } from "@/lib/types/contact";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { hash } from "bcryptjs";

export class ContactService {
  private static redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  private static ratelimit = new Ratelimit({
    redis: ContactService.redis,
    limiter: Ratelimit.slidingWindow(3, "24 h"), // 3 requêtes par 24h par IP
  });

  static async create(data: FormValues, clientIp: string) {
    try {
      // 1. Vérification du rate limiting par IP
      const rateLimitResult = await this.ratelimit.limit(clientIp);
      if (!rateLimitResult.success) {
        return {
          success: false,
          error: "Trop de tentatives. Veuillez réessayer plus tard.",
          remainingTime: rateLimitResult.reset,
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
          error: "Un message a déjà été envoyé avec cet email récemment.",
          remainingTime:
            24 * 60 * 60 * 1000 -
            (Date.now() - lastContact.createdAt.getTime()),
        };
      }

      // 3. Vérification honeypot (à implémenter côté frontend)
      if (data.honeypot) {
        // Simuler un succès mais ne rien faire
        return { success: true };
      }

      // 4. Nettoyage et validation des données
      const cleanedData = {
        name: data.name.trim().substring(0, 255),
        email: data.email.toLowerCase().trim().substring(0, 255),
        message: data.message.trim().substring(0, 2000),
        phone: data.phone?.trim().substring(0, 20) || null,
        company: data.company?.trim().substring(0, 255) || null,
        clientType: data.clientType?.substring(0, 255) || null,
        projectType: data.projectType?.substring(0, 255) || null,
        budget: data.budget ? parseFloat(data.budget) : null,
        deadline: data.deadline ? new Date(data.deadline) : null,
        existingSite: data.existingSite?.trim().substring(0, 255) || null,
        attachments: Array.isArray(data.attachments)
          ? data.attachments.slice(0, 10).map((url) => url.substring(0, 1000))
          : [],
        competitors: Array.isArray(data.competitors)
          ? data.competitors.slice(0, 10).map((c) => c.substring(0, 255))
          : [],
        objectives: Array.isArray(data.objectives)
          ? data.objectives.slice(0, 10).map((o) => o.substring(0, 255))
          : [],
        tags: Array.isArray(data.tags)
          ? data.tags.slice(0, 20).map((t) => t.substring(0, 50))
          : [],
        ipAddress: await hash(clientIp.substring(0, 45), 10),
        userAgent: data.userAgent?.substring(0, 500) || null,
      };

      // Validation des données avant création
      if (!cleanedData.name || !cleanedData.email || !cleanedData.message) {
        throw new Error("Les champs nom, email et message sont requis.");
      }

      // 5. Création du contact dans la base de données
      const contact = await prisma.contact.create({
        data: cleanedData,
        select: {
          id: true,
          name: true,
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
      console.error("Erreur ContactService.create:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'envoi du message.",
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
