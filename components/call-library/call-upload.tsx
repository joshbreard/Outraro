"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CallUpload() {
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Upload call recording</h3>
        <p className="text-sm text-slate-500">Store recordings and attach AI summaries.</p>
      </div>
      <label className="flex cursor-pointer items-center justify-between rounded-lg border border-dashed border-slate-300 p-4">
        <div className="space-y-1">
          <div className="text-sm font-medium text-slate-900">Drop file or click to upload</div>
          <div className="text-xs text-slate-500">Supported formats: mp3, wav, m4a</div>
        </div>
        <Button type="button">Browse</Button>
        <input
          type="file"
          className="hidden"
          accept="audio/*"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
        />
      </label>
      {fileName && <p className="text-xs text-slate-500">Selected: {fileName}</p>}
    </Card>
  );
}
