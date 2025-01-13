"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="max-w-3xl h-auto p-6 overflow-hidden">
        {children}
      </DialogContent>
    </Dialog>
  );
};
