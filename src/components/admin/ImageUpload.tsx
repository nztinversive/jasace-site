"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import { convexEnabled } from "@/lib/convex-config";
import { AdminButton, AdminInput } from "@/components/admin/AdminPrimitives";

type ImageUploadProps = {
  value: string;
  onChange: (value: string) => void;
  previewLabel?: string;
};

type UploadResponse = {
  storageId: Id<"_storage">;
};

function uploadFileWithProgress(
  uploadUrl: string,
  file: File,
  onProgress: (progress: number) => void
) {
  return new Promise<UploadResponse>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", uploadUrl);
    request.setRequestHeader("Content-Type", file.type || "application/octet-stream");

    request.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return;
      onProgress(Math.round((event.loaded / event.total) * 100));
    });

    request.addEventListener("load", () => {
      if (request.status < 200 || request.status >= 300) {
        reject(new Error(`Upload failed with status ${request.status}.`));
        return;
      }

      try {
        resolve(JSON.parse(request.responseText) as UploadResponse);
      } catch {
        reject(new Error("Upload response could not be parsed."));
      }
    });

    request.addEventListener("error", () => {
      reject(new Error("Upload request failed."));
    });

    request.send(file);
  });
}

export function ImageUpload({
  value,
  onChange,
  previewLabel = "Image preview",
}: ImageUploadProps) {
  const convex = useConvex();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const previewSrc = localPreview ?? value;

  const replaceLocalPreview = (next: string | null) => {
    setLocalPreview((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return next;
    });
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Only image files are supported.");
      return;
    }
    if (!convexEnabled) {
      setError("Convex uploads are unavailable until NEXT_PUBLIC_CONVEX_URL is configured.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    replaceLocalPreview(objectUrl);
    setMode("upload");
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const uploadUrl = await generateUploadUrl({});
      const { storageId } = await uploadFileWithProgress(uploadUrl, file, setProgress);
      const servingUrl = await convex.query(api.files.getUrl, { storageId });

      if (!servingUrl) {
        throw new Error("Convex did not return a serving URL.");
      }

      onChange(servingUrl);
      replaceLocalPreview(null);
      setProgress(100);
    } catch (uploadError) {
      replaceLocalPreview(null);
      setProgress(0);
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload image.");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await handleUpload(event.target.files?.[0] ?? null);
  };

  const handleDrop = async (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragActive(false);
    await handleUpload(event.dataTransfer.files?.[0] ?? null);
  };

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-2xl border border-stone-700 bg-stone-950 p-1">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            mode === "upload" ? "bg-terra text-stone-50" : "text-stone-400 hover:text-stone-200"
          }`}
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
            mode === "url" ? "bg-terra text-stone-50" : "text-stone-400 hover:text-stone-200"
          }`}
        >
          Paste URL
        </button>
      </div>

      {mode === "upload" ? (
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex min-h-[160px] w-full flex-col items-center justify-center rounded-3xl border border-dashed px-6 py-8 text-center transition-colors ${
              dragActive
                ? "border-terra bg-terra/10 text-stone-50"
                : "border-stone-700 bg-stone-900 text-stone-300 hover:border-terra/50 hover:bg-stone-900/80"
            }`}
          >
            <span className="text-sm font-semibold text-stone-100">
              Drop an image here or click to browse
            </span>
            <span className="mt-2 text-xs uppercase tracking-[0.22em] text-stone-500">
              JPG, PNG, WebP, AVIF
            </span>
            {!convexEnabled ? (
              <span className="mt-4 text-xs text-terra">
                Uploads are disabled until Convex is configured.
              </span>
            ) : null}
          </button>

          {uploading ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-stone-400">
                <span>Uploading</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-stone-800">
                <div
                  className="h-full rounded-full bg-terra transition-[width]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-3">
          <AdminInput
            value={value}
            placeholder="https://example.com/image.jpg"
            onChange={(event) => {
              setError(null);
              replaceLocalPreview(null);
              onChange(event.target.value);
            }}
          />
          <p className="text-xs text-stone-500">
            Paste any image URL if you do not want to upload a file to Convex.
          </p>
        </div>
      )}

      <div className="rounded-3xl border border-stone-800 bg-stone-900/70 p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
            {previewLabel}
          </span>
          {value ? (
            <AdminButton
              type="button"
              tone="secondary"
              className="px-3 py-2 text-xs"
              onClick={() => {
                setError(null);
                replaceLocalPreview(null);
                onChange("");
              }}
            >
              Clear
            </AdminButton>
          ) : null}
        </div>
        {previewSrc ? (
          <img
            src={previewSrc}
            alt={previewLabel}
            className="h-48 w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-dashed border-stone-700 bg-stone-950 text-sm text-stone-500">
            No image selected
          </div>
        )}
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      {value ? <p className="break-all text-xs text-stone-500">{value}</p> : null}
    </div>
  );
}
