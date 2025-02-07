import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface ProjectFormButtonsProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export function ProjectFormButtons({
  setIsModalOpen,
}: ProjectFormButtonsProps) {
  return (
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
        Fermer
      </Button>
      <Button type="submit">Enregistrer le projet</Button>
    </DialogFooter>
  );
}
