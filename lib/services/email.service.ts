import { resend } from "@/lib/resend";
import { FormValues } from "@/lib/types/contact";

export class EmailService {
  static async sendNewContactNotification(
    contactData: FormValues,
    contactId: string
  ) {
    try {
      console.log(
        "Envoi de l'email de notification pour le contact:",
        contactData
      );
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      // Fonction helper pour formater les valeurs
      const formatValue = (value: string | number | null | undefined) =>
        value || "Non renseigné";

      // Fonction helper pour formater le budget
      const formatBudget = (budget: string | null | undefined) =>
        budget ? `${budget}€` : "Non renseigné";

      // Fonction helper pour formater la date
      const formatDate = (date: string | null | undefined) => {
        if (!date) return "Non renseigné";
        return new Date(date).toLocaleDateString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>", // Utilisation du domaine par défaut de Resend
        to: process.env.ADMIN_EMAIL!,
        subject: `🔔 Nouveau contact: ${contactData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; margin: 0; padding: 20px 0;">
                Nouveau Contact Reçu
              </h1>
              <p style="color: #64748b; margin-top: 10px;">
                Un nouveau contact vient d'être créé sur votre portfolio
              </p>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; margin-top: 0; font-size: 18px;">
                📋 Informations Principales
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Nom:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">
                    ${contactData.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Email:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    <a href="mailto:${
                      contactData.email
                    }" style="color: #2563eb; text-decoration: none;">
                      ${contactData.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Téléphone:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    ${formatValue(contactData.phone)}
                  </td>
                </tr>
              </table>
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; margin-top: 0; font-size: 18px;">
                💼 Détails du Projet
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Entreprise:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    ${formatValue(contactData.company)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Type de client:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    ${formatValue(contactData.clientType)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Type de projet:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    ${formatValue(contactData.projectType)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Budget:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    ${formatBudget(contactData.budget)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Date limite:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    ${formatDate(contactData.deadline)}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Site existant:</td>
                  <td style="padding: 8px 0; color: #1e293b;">
                    ${
                      contactData.existingSite
                        ? `<a href="${contactData.existingSite}" style="color: #2563eb; text-decoration: none;" target="_blank">
                        ${contactData.existingSite}
                      </a>`
                        : "Non renseigné"
                    }
                  </td>
                </tr>
              </table>
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; margin-top: 0; font-size: 18px;">
                💭 Message
              </h2>
              <p style="color: #1e293b; white-space: pre-wrap; margin: 10px 0;">
                ${contactData.message}
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <a href="${baseUrl}/admin/contacts/${contactId}" 
                 style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 500;">
                Voir les détails du contact
              </a>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                ID du contact: ${contactId}
              </p>
              <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0;">
                Cet email a été envoyé automatiquement depuis votre portfolio.
              </p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      throw error;
    }
  }
}
