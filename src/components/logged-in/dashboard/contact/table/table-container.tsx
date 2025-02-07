import { Table } from "@/components/ui/table";
import { ReactNode } from "react";

interface TableContainerProps {
  children: ReactNode;
}

export function TableContainer({ children }: TableContainerProps) {
  return (
    <div className="rounded-md border mx-3">
      <Table>{children}</Table>
    </div>
  );
}
