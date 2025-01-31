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
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        message: data.message.trim(),
        phone: data.phone?.trim() || null,
        company: data.company?.trim() || null,
        clientType: data.clientType || null,
        projectType: data.projectType || null,
        budget: data.budget ? parseFloat(data.budget) : null,
        deadline: data.deadline ? new Date(data.deadline) : null,
        existingSite: data.existingSite?.trim() || null,
        attachments: data.attachments || [],
        competitors: data.competitors || [],
        objectives: data.objectives || [],
        tags: data.tags || [],
        ipAddress: await hash(clientIp, 10), // Stockage sécurisé de l'IP
        userAgent: data.userAgent || null,
      };

      // Validation des longueurs
      const maxLengths = {
        name: 255,
        email: 255,
        message: 2000, // Ajustez selon vos besoins
        phone: 20,
        company: 255,
        // Ajoutez d'autres champs si nécessaire
      };

      for (const [key, value] of Object.entries(cleanedData)) {
        if (
          value &&
          typeof value === "string" &&
          value.length > maxLengths[key as keyof typeof maxLengths]
        ) {
          throw new Error(`La valeur pour ${key} est trop longue.`);
        }
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
        error: "Une erreur est survenue lors de l'envoi du message.",
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
