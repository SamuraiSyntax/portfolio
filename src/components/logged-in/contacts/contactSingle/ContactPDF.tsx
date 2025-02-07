import { Contact } from "@/types/contact";
import { ExtendedProject } from "@/types/project";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { PDFLogo } from "./PDFLogo";

const styles = StyleSheet.create({
  coverPage: {
    flexDirection: "column",
    padding: 30,
    backgroundColor: "hsl(28 55% 98%)",
    justifyContent: "space-between",
    height: "100%",
  },
  coverHeader: {
    alignItems: "center",
    marginBottom: 50,
  },
  coverLogo: {
    width: 250,
    height: 60,
  },
  coverTitle: {
    fontSize: 36,
    color: "hsl(28 58% 24%)",
    backgroundColor: "hsl(28 18% 84%)",
    width: "auto",
    padding: 8,
    borderRadius: 4,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 150,
    marginBottom: 50,
  },
  coverFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  page: {
    flexDirection: "column",
    padding: 30,
    backgroundColor: "hsl(28 55% 98%)",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: "hsl(28 68% 4%)",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "hsl(28 58% 24%)",
    backgroundColor: "hsl(28 18% 84%)",
    padding: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.5,
    color: "hsl(28 68% 4%)",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "hsl(28 58% 24%)",
  },
  header: {
    flexDirection: "column",
    marginBottom: 30,
    borderBottom: 1,
    borderBottomColor: "hsl(28 58% 24%)",
    paddingBottom: 20,
  },
  headerInfo: {
    marginTop: 15,
  },
  headerLogo: {
    width: 180,
    height: 40,
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    padding: 0,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "hsl(28 18% 84%)",
    marginVertical: 10,
    breakInside: "avoid",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "hsl(28 18% 84%)",
  },
  tableHeader: {
    backgroundColor: "hsl(28 18% 84%)",
    fontWeight: "bold",
    color: "hsl(28 58% 24%)",
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
  },
  tableCellPhase: {
    flex: 2,
    padding: 8,
    fontSize: 10,
  },
  tableCellLarge: {
    flex: 2,
    padding: 8,
    fontSize: 10,
  },
  tableCellSmall: {
    flex: 1,
    padding: 8,
    fontSize: 10,
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  listItemContent: {
    flex: 1,
    fontSize: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  gridItem: {
    width: "50%",
    padding: 5,
  },
  box: {
    border: 1,
    borderColor: "hsl(28 18% 84%)",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "hsl(28 28% 75%)",
    borderRadius: 4,
    padding: 4,
    marginRight: 5,
    fontSize: 10,
    color: "hsl(28 58% 24%)",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "hsl(28 58% 24%)",
  },
  coverContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
  },
  coverProjectName: {
    fontSize: 24,
    color: "hsl(28 58% 24%)",
    marginTop: 20,
    marginBottom: 10,
  },
  coverClient: {
    fontSize: 18,
    color: "hsl(28 58% 24%)",
  },
});

interface ProjectPDFProps {
  project: ExtendedProject;
}

export const ContactInfosPDF = ({ contact }: { contact: Contact }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Fiche Contact</Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Informations personnelles</Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Nom : </Text>
            {contact.name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Email : </Text>
            {contact.email}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Téléphone : </Text>
            {contact.phone || "Non renseigné"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Message</Text>
          <Text style={styles.text}>{contact.message}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export const ContactMessagePDF = ({ contact }: { contact: Contact }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Message du contact</Text>
        <Text style={styles.text}>Message: {contact.message}</Text>
      </View>
    </Page>
  </Document>
);

interface ProjectPDFProps {
  project: ExtendedProject;
}

export const ProjectPDF = ({ project }: ProjectPDFProps) => (
  <Document>
    {/* Page de couverture */}
    <Page size="A4" style={styles.page}>
      <View style={styles.coverContainer}>
        <PDFLogo style={styles.coverLogo} />
        <Text style={styles.coverTitle}>Cadrage de Projet</Text>
        <Text style={styles.coverProjectName}>{project.name}</Text>
        <Text style={styles.coverClient}>
          Client :{" "}
          {project.clientName || project.client?.name || "Non renseigné"}
        </Text>
      </View>

      <View style={styles.coverFooter}>
        <Text style={styles.text}>Référence : {project.id}</Text>
        <Text style={styles.text}>
          Date : {new Date().toLocaleDateString("fr-FR")}
        </Text>
      </View>
    </Page>

    {/* Page 1: Informations générales */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section} wrap={false}>
        <Text style={styles.subtitle}>1. Informations Générales</Text>
        <View style={styles.box}>
          <Text style={styles.text}>
            <Text style={styles.label}>Nom du projet : </Text>
            {project.name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Chef de projet : </Text>
            {project.projectManagerUser?.name || "Non renseigné"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Client : </Text>
            {project.clientName || project.client?.name || "Non renseigné"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Date de début : </Text>

            {project.startDate
              ? new Date(project.startDate).toLocaleDateString("fr-FR")
              : "Non définie"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Date de livraison estimée : </Text>
            {project.estimatedDeliveryDate
              ? new Date(project.estimatedDeliveryDate).toLocaleDateString(
                  "fr-FR"
                )
              : "Non définie"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>URL de production : </Text>
            {project.productionUrl || "Non définie"}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Technologies principales : </Text>
            {(project.technologies as string[])?.join(", ") || "Non définies"}
          </Text>
        </View>
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.subtitle}>2. Contexte et Objectifs</Text>
        <View style={styles.box}>
          <Text style={styles.label}>Contexte du projet :</Text>
          <Text style={styles.text}>{project.context || "Non renseigné"}</Text>

          <Text style={styles.label}>Objectifs :</Text>
          <View style={styles.list}>
            {(project.objectives as string[])?.map((objective, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemContent}>{objective}</Text>
              </View>
            )) || <Text style={styles.text}>Aucun objectif défini</Text>}
          </View>

          <Text style={styles.label}>Public cible :</Text>
          <View style={styles.list}>
            {(project.targetAudience as string[])?.map((target, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemContent}>{target}</Text>
              </View>
            )) || <Text style={styles.text}>Public cible non défini</Text>}
          </View>

          <Text style={styles.label}>KPIs :</Text>
          <View style={styles.list}>
            {(project.kpis as string[])?.map((kpi, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemContent}>{kpi}</Text>
              </View>
            )) || <Text style={styles.text}>Aucun KPI défini</Text>}
          </View>
        </View>
      </View>
      <PageNumber />
    </Page>

    {/* Page 2: Périmètre et Contraintes */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section} wrap={false}>
        <Text style={styles.subtitle}>3. Périmètre du Projet</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Inclus :</Text>
            <View style={styles.list}>
              {(project.scopeIncluded as string[])?.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>✓</Text>
                  <Text style={styles.listItemContent}>{item}</Text>
                </View>
              )) || (
                <Text style={styles.text}>Aucun élément inclus défini</Text>
              )}
            </View>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Exclus :</Text>
            <View style={styles.list}>
              {(project.scopeExcluded as string[])?.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.bullet}>✗</Text>
                  <Text style={styles.listItemContent}>{item}</Text>
                </View>
              )) || <Text style={styles.text}>Aucun élément exclu défini</Text>}
            </View>
          </View>
        </View>

        <Text style={styles.subtitle}>4. Contraintes</Text>
        <View style={styles.box}>
          <Text style={styles.label}>Contraintes budgétaires :</Text>
          <Text style={styles.text}>
            {project.budgetConstraints || "Non renseignées"}
          </Text>

          <Text style={styles.label}>Contraintes techniques :</Text>
          <Text style={styles.text}>
            {project.technicalConstraints || "Non renseignées"}
          </Text>

          <Text style={styles.label}>Contraintes légales :</Text>
          <Text style={styles.text}>
            {project.legalConstraints || "Non renseignées"}
          </Text>
        </View>
      </View>
      <PageNumber />
    </Page>

    {/* Page 3: Planning et Risques */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section} wrap={false}>
        <Text style={styles.subtitle}>5. Planning et Phases</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCellPhase}>Phase</Text>
            <Text style={styles.tableCellSmall}>Début</Text>
            <Text style={styles.tableCellSmall}>Fin</Text>
            <Text style={styles.tableCellSmall}>Responsable</Text>
          </View>
          {project.phases?.map((phase, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCellPhase}>{phase.name}</Text>
              <Text style={styles.tableCellSmall}>
                {new Date(phase.startDate).toLocaleDateString("fr-FR")}
              </Text>
              <Text style={styles.tableCellSmall}>
                {new Date(phase.endDate).toLocaleDateString("fr-FR")}
              </Text>
              <Text style={styles.tableCellSmall}>
                {phase.responsibleUser?.name || "Non assigné"}
              </Text>
            </View>
          )) || (
            <View style={styles.tableRow}>
              <Text style={styles.tableCellPhase}>Aucune phase définie</Text>
            </View>
          )}
        </View>

        <Text style={styles.subtitle}>6. Risques et Solutions</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCellLarge}>Description</Text>
            <Text style={styles.tableCellSmall}>Probabilité</Text>
            <Text style={styles.tableCellSmall}>Impact</Text>
            <Text style={styles.tableCellLarge}>Solution</Text>
          </View>
          {project.risks?.map((risk, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCellLarge}>{risk.description}</Text>
              <Text style={styles.tableCellSmall}>{risk.probability}</Text>
              <Text style={styles.tableCellSmall}>{risk.impact}</Text>
              <Text style={styles.tableCellLarge}>{risk.solution}</Text>
            </View>
          )) || (
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLarge}>Aucun risque identifié</Text>
            </View>
          )}
        </View>
      </View>
      <PageNumber />
    </Page>

    {/* Page 4: Aspects Techniques et Validation */}
    <Page size="A4" style={styles.page}>
      <View style={styles.section} wrap={false}>
        <Text style={styles.subtitle}>7. Aspects Techniques</Text>
        <View style={styles.box}>
          <Text style={styles.label}>Détails d&apos;intégration :</Text>
          <Text style={styles.text}>
            {project.integrationDetails || "Non renseignés"}
          </Text>

          <Text style={styles.label}>Prochaines étapes :</Text>
          <View style={styles.list}>
            {(project.nextSteps as string[])?.map((step, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemContent}>{step}</Text>
              </View>
            )) || (
              <Text style={styles.text}>Aucune prochaine étape définie</Text>
            )}
          </View>

          <Text style={styles.label}>Livrables attendus :</Text>
          <View style={styles.list}>
            {(project.deliverables as string[])?.map((deliverable, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemContent}>{deliverable}</Text>
              </View>
            )) || <Text style={styles.text}>Aucun livrable défini</Text>}
          </View>

          <Text style={styles.label}>Étapes de validation :</Text>
          <View style={styles.list}>
            {(project.validationSteps as string[])?.map((step, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemContent}>{step}</Text>
              </View>
            )) || (
              <Text style={styles.text}>
                Aucune étape de validation définie
              </Text>
            )}
          </View>
        </View>

        <Text style={styles.subtitle}>8. Sécurité et Plan de Contingence</Text>
        <View style={styles.box}>
          <Text style={styles.label}>Mesures de sécurité :</Text>
          <Text style={styles.text}>
            {project.securityMeasures || "Non renseignées"}
          </Text>

          <Text style={styles.label}>Plan de contingence :</Text>
          <Text style={styles.text}>
            {project.contingencyPlan || "Non renseigné"}
          </Text>
        </View>
      </View>
      <PageNumber />
    </Page>
  </Document>
);

const PageNumber = () => (
  <Text
    style={styles.pageNumber}
    render={({ pageNumber, totalPages }) =>
      `Page ${pageNumber} sur ${totalPages}`
    }
  />
);

export const ContactPDFViewer = ({
  typePDF,
  contact,
  project,
}: {
  typePDF: "infos" | "message" | "project";
  contact: Contact;
  project: ExtendedProject;
}) => (
  <PDFViewer className="w-full h-full">
    {typePDF === "infos" ? (
      <ContactInfosPDF contact={contact as Contact} />
    ) : typePDF === "project" ? (
      <ProjectPDF project={project} />
    ) : (
      <ContactMessagePDF contact={contact as Contact} />
    )}
  </PDFViewer>
);
