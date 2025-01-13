import { Checkbox } from "@/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ContactHeadProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: (checked: boolean) => void;
}

export function ContactHead({
  selectedCount,
  totalCount,
  onSelectAll,
}: ContactHeadProps) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px]">
          <Checkbox
            checked={selectedCount === totalCount && totalCount > 0}
            onCheckedChange={(checked) => onSelectAll(checked as boolean)}
          />
        </TableHead>

        {/* Informations personnelles */}
        <TableHead className="whitespace-nowrap">Nom</TableHead>
        <TableHead className="whitespace-nowrap">Email</TableHead>
        <TableHead className="whitespace-nowrap">Téléphone</TableHead>
        <TableHead className="whitespace-nowrap">Société</TableHead>
        <TableHead className="whitespace-nowrap">Poste</TableHead>

        {/* Détails du projet */}
        <TableHead className="whitespace-nowrap">Message</TableHead>
        <TableHead className="whitespace-nowrap">Type de projet</TableHead>
        <TableHead className="whitespace-nowrap">Envergure</TableHead>
        <TableHead className="whitespace-nowrap">Budget</TableHead>
        <TableHead className="whitespace-nowrap">Deadline</TableHead>

        {/* Status et classification */}
        <TableHead className="whitespace-nowrap">Statut</TableHead>
        <TableHead className="whitespace-nowrap">Priorité</TableHead>
        <TableHead className="whitespace-nowrap">Tags</TableHead>

        {/* Informations techniques */}
        <TableHead className="whitespace-nowrap">Site existant</TableHead>
        <TableHead className="whitespace-nowrap">Public cible</TableHead>
        <TableHead className="whitespace-nowrap">Concurrents</TableHead>
        <TableHead className="whitespace-nowrap">Objectifs</TableHead>

        {/* Informations business */}
        <TableHead className="whitespace-nowrap">Type de client</TableHead>
        <TableHead className="whitespace-nowrap">Secteur</TableHead>
        <TableHead className="whitespace-nowrap">Taille entreprise</TableHead>
        <TableHead className="whitespace-nowrap">CA annuel</TableHead>

        {/* Préférences marketing */}
        <TableHead className="whitespace-nowrap">Contact préféré</TableHead>
        <TableHead className="whitespace-nowrap">Source</TableHead>
        <TableHead className="whitespace-nowrap">Newsletter</TableHead>

        {/* Suivi commercial */}
        <TableHead className="whitespace-nowrap">Dernier contact</TableHead>
        <TableHead className="whitespace-nowrap">Prochaine relance</TableHead>
        <TableHead className="whitespace-nowrap">Notes</TableHead>
        <TableHead className="whitespace-nowrap">Assigné à</TableHead>

        {/* Documents */}
        <TableHead className="whitespace-nowrap">Pièces jointes</TableHead>

        {/* Données financières */}
        <TableHead className="whitespace-nowrap">Montant devis</TableHead>
        <TableHead className="whitespace-nowrap">Valeur contrat</TableHead>

        {/* Métadonnées */}
        <TableHead className="whitespace-nowrap">IP</TableHead>
        <TableHead className="whitespace-nowrap">Navigateur</TableHead>
        <TableHead className="whitespace-nowrap">Langue</TableHead>
        <TableHead className="whitespace-nowrap">Fuseau horaire</TableHead>

        {/* Dates */}
        <TableHead className="whitespace-nowrap">Créé le</TableHead>
        <TableHead className="whitespace-nowrap">Mis à jour le</TableHead>

        {/* Actions */}
        <TableHead className="sticky right-0 bg-background border-l-[1px] text-right">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
