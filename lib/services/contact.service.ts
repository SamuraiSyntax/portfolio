import { prisma } from "@/lib/prisma";
import { EmailService } from "@/lib/services/email.service";
import { FormValues } from "@/lib/types/contact";

export class ContactService {
  static async create(data: FormValues) {
    try {
      console.log("Début création contact avec données:", data);

      // Nettoyage des données avant création
      const cleanedData = {
        name: data.name,
        email: data.email,
        message: data.message,
        phone: data.phone || null,
        company: data.company || null,
        clientType: data.clientType || null,
        projectType: data.projectType || null,
        budget: data.budget ? parseFloat(data.budget) : null,
        deadline: data.deadline ? new Date(data.deadline) : null,
        existingSite: data.existingSite || null,
      };

      console.log("Données nettoyées:", cleanedData);

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

      console.log("Contact créé:", contact);

      if (!contact.id) {
        throw new Error("Contact créé sans ID");
      }

      await EmailService.sendNewContactNotification(data, contact.id);

      return contact;
    } catch (error) {
      console.error("Erreur ContactService.create:", error);
      throw error;
    }
  }

  static async delete(id: string) {
    console.log("Début de la suppression du contact ID:", id);
    try {
      const deletedContact = await prisma.contact.delete({
        where: { id },
      });
      console.log("Contact supprimé avec succès:", deletedContact);
      return deletedContact;
    } catch (error) {
      console.error("Erreur lors de la suppression du contact:", error);
      throw error;
    }
  }
}
