"use client";

import Link from "next/link";
import { ArrowLeft, Database, UploadCloud, FileType, CheckCircle2, RefreshCw } from "lucide-react";
import { useState, useRef } from "react";

type UploadedFile = {
  id: string;
  name: string;
  size: string;
  status: "processing" | "completed" | "error";
  type: string;
};

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: "1", name: "NVDA_Q3_2023.pdf", size: "2.4 MB", status: "completed", type: "PDF" },
    { id: "2", name: "Market_Trends.csv", size: "12 MB", status: "completed", type: "CSV" },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (newFiles: File[]) => {
    const uploaded = newFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      status: "processing" as const,
      type: file.type.includes("pdf") ? "PDF" : file.type.includes("video") ? "Video" : "Data",
    }));

    setFiles((prev) => [...uploaded, ...prev]);

    // Simulate processing delay
    setTimeout(() => {
      setFiles((currentFiles) =>
        currentFiles.map((f) =>
          uploaded.find((u) => u.id === f.id) ? { ...f, status: "completed" } : f
        )
      );
    }, 3000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="px-6 h-14 flex items-center border-b border-border/40 bg-background/95 sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 mr-6 text-muted-foreground hover:text-primary transition-colors" href="/">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tight">Knowledge Base</span>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Data Ingestion</h1>
            <p className="text-muted-foreground">Upload SEC filings, CSV datasets, earnings call videos, and more to expand the AI's knowledge.</p>
          </div>

          {/* Drag & Drop Zone */}
          <div 
            className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer
              ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent/50"}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <UploadCloud className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Click or drag files to upload</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              Support for PDF, DOCX, CSV, Excel, MP4, and Image formats. Large files (up to 5GB) will be processed in the background via Celery.
            </p>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              multiple 
              onChange={handleFileInput} 
            />
          </div>

          {/* Uploaded Files List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Indexed Files</h3>
            <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
              {files.map((file, i) => (
                <div key={file.id} className={`flex items-center justify-between p-4 ${i !== files.length - 1 ? "border-b border-border/50" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileType className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground flex gap-2">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.type}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    {file.status === "processing" ? (
                      <div className="flex items-center gap-2 text-xs font-medium text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Processing (OCR/Embeddings)
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Vectorized & Indexed
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
