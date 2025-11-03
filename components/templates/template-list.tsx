"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApprovalModal } from "./approval-modal";

const templates = [
  {
    id: "template-1",
    name: "Inbound momentum",
    status: "Awaiting approval",
    performance: "Top 20% reply rate",
    variants: 2
  },
  {
    id: "template-2",
    name: "Product-led growth",
    status: "Approved",
    performance: "+14% over control",
    variants: 3
  }
];

export function TemplateList() {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[number] | null>(null);

  return (
    <>
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Messaging Lab</h2>
            <p className="text-sm text-slate-500">Review templates, approve changes, and track performance.</p>
          </div>
          <Button onClick={() => setSelectedTemplate(templates[0])}>Request approval</Button>
        </div>
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="flex items-start justify-between rounded-lg border border-slate-200 p-4">
              <div>
                <div className="text-sm font-semibold text-slate-900">{template.name}</div>
                <div className="text-xs text-slate-500">{template.performance}</div>
                <div className="mt-2 text-xs text-slate-400">Variants: {template.variants}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={template.status === "Approved" ? "secondary" : "outline"}>{template.status}</Badge>
                <Button variant="ghost" onClick={() => setSelectedTemplate(template)}>
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <ApprovalModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
    </>
  );
}
