"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ApprovalModalProps {
  template: {
    id: string;
    name: string;
    status: string;
    performance: string;
    variants: number;
  } | null;
  onClose: () => void;
}

export function ApprovalModal({ template, onClose }: ApprovalModalProps) {
  return (
    <Dialog open={Boolean(template)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{template?.name ?? "Template"}</DialogTitle>
          <DialogDescription>Leave feedback and approve template updates.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm text-slate-600">
          <p>Status: {template?.status}</p>
          <p>Performance: {template?.performance}</p>
          <p>Variants: {template?.variants}</p>
          <p>
            Coming soon: inline diff viewer, AI rewrite suggestions, and comment threads to streamline approvals between Outraro
            and client teams.
          </p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
          <Button>Approve</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
