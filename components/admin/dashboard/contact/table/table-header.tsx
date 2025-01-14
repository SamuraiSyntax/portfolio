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
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={view.toString()}
          onValueChange={(value) => onViewChange(value as ContactView)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une vue" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les messages</SelectItem>
            <SelectItem value="recent">Messages récents</SelectItem>
            <SelectItem value="archived">Messages archivés</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardHeader>
  );
}

function getViewTitle(view: ContactView): string {
  const titles = {
    all: "Tous les messages",
    recent: "Messages récents",
    archived: "Messages archivés",
  };
  return titles[view] || titles.all;
}
