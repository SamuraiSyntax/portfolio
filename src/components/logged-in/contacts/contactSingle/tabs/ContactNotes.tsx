import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Contact } from "@/types/contact";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Note {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export function ContactNotes({ contact }: { contact: Contact }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = async () => {
    if (!newNote.trim()) {
      toast.error("La note ne peut pas être vide");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/contacts/${contact.id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNote }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout de la note");

      const addedNote = await response.json();
      setNotes([addedNote, ...notes]);
      setNewNote("");
      toast.success("Note ajoutée avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la note " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notes</h2>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Ajouter une nouvelle note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <Button
            onClick={handleAddNote}
            disabled={isLoading}
            className="self-end"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une note
          </Button>
        </div>

        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id} className="p-4">
              <p className="whitespace-pre-wrap">{note.content}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Créée le {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </Card>
          ))}
          {notes.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              Aucune note enregistrée
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
