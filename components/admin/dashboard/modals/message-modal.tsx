"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  name: string;
}

export function MessageModal({
  isOpen,
  onClose,
  message,
  name,
}: MessageModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message de {name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="whitespace-pre-wrap">{message}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
