"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactView } from "@/types/contact";

interface TableHeaderProps {
  view: ContactView;
  search: string;
  showTitle: boolean;
  onViewChange: (view: ContactView) => void;
  onSearchChange: (search: string) => void;
}

export function TableHeader({
  view,
  search,
  showTitle,
  onViewChange,
  onSearchChange,
}: TableHeaderProps) {
  return (
    <CardHeader className="p-3 flex flex-row items-center justify-between">
      {showTitle && <CardTitle>{getViewTitle(view)}</CardTitle>}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Rechercher un contact..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={view.toString()}
          onValueChange={(value) => onViewChange(value as ContactView)}
        >
          <SelectTrigger className="gap-2">
            <SelectValue placeholder="Sélectionner une vue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les contacts</SelectItem>
            <SelectItem value="recent">Contacts récents</SelectItem>
            <SelectItem value="archived">Contacts archivés</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardHeader>
  );
}

function getViewTitle(view: ContactView): string {
  const titles = {
    all: "Tous les contacts",
    recent: "Contacts récents",
    archived: "Contacts archivés",
  };
  return titles[view] || titles.all;
}
