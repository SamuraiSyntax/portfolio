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
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Nom
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Email
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Téléphone
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Société
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Poste
        </TableHead>

        {/* Détails du projet */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Message
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Type de projet
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Envergure
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Budget
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Deadline
        </TableHead>

        {/* Status et classification */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Statut
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Priorité
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Tags
        </TableHead>

        {/* Informations techniques */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Site existant
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Public cible
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Concurrents
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Objectifs
        </TableHead>

        {/* Informations business */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Type de client
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Secteur
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Taille entreprise
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          CA annuel
        </TableHead>

        {/* Préférences marketing */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Contact préféré
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Source
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Newsletter
        </TableHead>

        {/* Suivi commercial */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Dernier contact
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Prochaine relance
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Notes
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Assigné à
        </TableHead>

        {/* Documents */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Pièces jointes
        </TableHead>

        {/* Données financières */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Montant devis
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Valeur contrat
        </TableHead>

        {/* Métadonnées */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          IP
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Navigateur
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Langue
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Fuseau horaire
        </TableHead>

        {/* Dates */}
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Créé le
        </TableHead>
        <TableHead className="whitespace-nowrap hidden md:table-cell">
          Mis à jour le
        </TableHead>

        {/* Actions */}
        <TableHead className="sticky right-0 bg-background border-l-[1px] text-right hidden md:table-cell">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
