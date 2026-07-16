"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileText, Image, Music, Video, Archive, Check, AlertCircle } from "lucide-react";

function uid() { return Math.random().toString(36).slice(2); }

function fileIcon(type) {
  if (type.startsWith("image/")) return Image;
  if (type.startsWith("video/")) return Video;
  if (type.startsWith("audio/")) return Music;
  if (type.includes("zip") || type.includes("archive")) return Archive;
  return FileText;
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 ** 2) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1024 ** 2).toFixed(1) + " MB";
}

function Section({ title, description, children, span2 = false }) {
  return (
    <div className={`p-6 bg-card border border-border rounded-xl shadow-sm space-y-4 ${span2 ? "lg:col-span-2" : ""}`}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

/* Basic dropzone */
function BasicDropzone() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (accepted) => setFiles(p => [...p, ...accepted.map(f => ({ id: uid(), file: f }))]),
  });
  return (
    <div className="space-y-3">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-blue-50" : "border-border hover:border-primary/50 hover:bg-muted"}`}>
        <input {...getInputProps()} />
        <Upload className={`size-8 mx-auto mb-2 ${isDragActive ? "text-primary" : "text-muted-foreground"}`} />
        <p className="text-sm font-medium">{isDragActive ? "Drop files here" : "Drag & drop, or click to browse"}</p>
        <p className="text-xs text-muted-foreground mt-1">Any file type accepted</p>
      </div>
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map(({ id, file }) => {
            const Icon = fileIcon(file.type);
            return (
              <li key={id} className="flex items-center gap-3 px-3 py-2.5 border border-border rounded-lg bg-muted">
                <Icon className="size-4 text-muted-foreground shrink-0" />
                <span className="flex-1 text-sm truncate">{file.name}</span>
                <span className="text-xs text-muted-foreground shrink-0">{formatSize(file.size)}</span>
                <button onClick={() => setFiles(p => p.filter(x => x.id !== id))} className="text-muted-foreground hover:text-red-600 transition-colors"><X className="size-3.5" /></button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* Image preview dropzone */
function ImageDropzone() {
  const [images, setImages] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (accepted) => {
      const previews = accepted.map(f => ({ id: uid(), file: f, url: URL.createObjectURL(f) }));
      setImages(p => [...p, ...previews]);
    },
  });
  return (
    <div className="space-y-3">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-blue-50" : "border-border hover:border-primary/50 hover:bg-muted"}`}>
        <input {...getInputProps()} />
        <Image className={`size-7 mx-auto mb-2 ${isDragActive ? "text-primary" : "text-muted-foreground"}`} />
        <p className="text-sm font-medium">{isDragActive ? "Drop images here" : "Drop images or click to browse"}</p>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 10MB</p>
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map(({ id, file, url }) => (
            <div key={id} className="relative group rounded-xl overflow-hidden aspect-square border border-border">
              <img src={url} className="w-full h-full object-cover" alt={file.name} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => setImages(p => p.filter(x => x.id !== id))} className="bg-red-500 text-white rounded-full p-1">
                  <X className="size-3.5" />
                </button>
              </div>
              <p className="absolute bottom-0 left-0 right-0 text-[10px] text-white bg-black/50 px-1 py-0.5 truncate">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Simulated upload with progress */
function ProgressDropzone() {
  const [files, setFiles] = useState([]);

  const simulate = (fileList) => {
    const newFiles = fileList.map(f => ({ id: uid(), name: f.name, size: formatSize(f.size), progress: 0, done: false, error: false }));
    setFiles(p => [...p, ...newFiles]);
    newFiles.forEach(({ id }) => {
      let prog = 0;
      const interval = setInterval(() => {
        prog += Math.random() * 20;
        if (prog >= 100) {
          prog = 100;
          clearInterval(interval);
          setFiles(p => p.map(f => f.id === id ? { ...f, progress: 100, done: true } : f));
        } else {
          setFiles(p => p.map(f => f.id === id ? { ...f, progress: prog } : f));
        }
      }, 200);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: simulate });
  return (
    <div className="space-y-3">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-blue-50" : "border-border hover:border-primary/50 hover:bg-muted"}`}>
        <input {...getInputProps()} />
        <Upload className="size-7 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm font-medium">Drop files to upload</p>
        <p className="text-xs text-muted-foreground mt-1">Simulates real upload progress</p>
      </div>
      {files.length > 0 && (
        <ul className="space-y-2.5">
          {files.map(({ id, name, size, progress, done }) => (
            <li key={id} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-muted-foreground shrink-0" />
                <span className="flex-1 text-sm truncate">{name}</span>
                <span className="text-xs text-muted-foreground shrink-0">{size}</span>
                {done ? <Check className="size-4 text-green-500 shrink-0" /> : <button onClick={() => setFiles(p => p.filter(x => x.id !== id))}><X className="size-3.5 text-muted-foreground" /></button>}
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className={`h-1.5 rounded-full transition-all duration-200 ${done ? "bg-green-500" : "bg-primary"}`} style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground text-right">{done ? "Complete" : `${Math.round(progress)}%`}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* Restricted file types */
function RestrictedDropzone() {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [], "text/plain": [], "application/msword": [], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [] },
    maxSize: 5 * 1024 * 1024,
    onDrop: (acc, rej) => {
      setFiles(p => [...p, ...acc.map(f => ({ id: uid(), file: f }))]);
      setRejected(rej.map(({ file, errors }) => ({ id: uid(), name: file.name, error: errors[0]?.message })));
    },
  });
  return (
    <div className="space-y-3">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-blue-50" : "border-border hover:border-primary/50"}`}>
        <input {...getInputProps()} />
        <FileText className="size-7 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm font-medium">Documents only (PDF, DOC, TXT)</p>
        <p className="text-xs text-muted-foreground mt-1">Max 5MB per file</p>
      </div>
      {files.map(({ id, file }) => (
        <div key={id} className="flex items-center gap-2 px-3 py-2 border border-green-200 rounded-lg bg-green-50">
          <Check className="size-4 text-green-600 shrink-0" /><span className="text-sm flex-1 truncate">{file.name}</span><span className="text-xs text-muted-foreground">{formatSize(file.size)}</span>
        </div>
      ))}
      {rejected.map(({ id, name, error }) => (
        <div key={id} className="flex items-center gap-2 px-3 py-2 border border-red-200 rounded-lg bg-red-50">
          <AlertCircle className="size-4 text-red-600 shrink-0" /><span className="text-sm flex-1 truncate">{name}</span><span className="text-xs text-red-600">{error}</span>
        </div>
      ))}
    </div>
  );
}

export default function FileUploadsPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">File Uploads</h1>
        <p className="text-muted-foreground">Drag-and-drop file upload zones with previews, progress simulation, and type restrictions using react-dropzone.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Basic File Upload" description="Accept any file type, list uploaded files."><BasicDropzone /></Section>
        <Section title="Image Upload with Preview" description="Images-only with grid thumbnail preview."><ImageDropzone /></Section>
        <Section title="Upload with Progress" description="Simulated upload progress bars per file."><ProgressDropzone /></Section>
        <Section title="Type & Size Restrictions" description="Only PDF, DOC, TXT — max 5MB. Invalid files show errors."><RestrictedDropzone /></Section>
      </div>
    </div>
  );
}
