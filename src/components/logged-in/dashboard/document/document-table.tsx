"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface DocumentTableProps {
  documents: {
    id: string;
    title: string;
    description: string | null;
    type: string;
    url: string;
    createdAt: Date;
  }[];
}

export function DocumentTable({ documents }: DocumentTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date de création</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell>{document.title}</TableCell>
              <TableCell>{document.description || "-"}</TableCell>
              <TableCell>{document.type}</TableCell>
              <TableCell>{formatDate(document.createdAt)}</TableCell>
              <TableCell>
                <Link
                  href={document.url}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Voir le document
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
