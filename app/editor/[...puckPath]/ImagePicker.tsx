"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import type { GalleryImage } from "@/app/api/images/route";

export interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ImagePicker({ value, onChange }: ImagePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/images");
      if (!res.ok) throw new Error("Failed to load images");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading images");
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadFiles = async (files: FileList | File[]) => {
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/images", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error(`Upload failed for ${file.name}`);
      }
      await fetchImages();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen, fetchImages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFiles(e.target.files);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFiles(e.dataTransfer.files);
    }
  };

  const deleteImage = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/images/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete image");
      await fetchImages();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to delete image");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL..."
          className="w-full rounded border border-gray-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          type="button"
          className="rounded border border-gray-300 p-1.5 text-gray-500 hover:bg-gray-50 flex items-center justify-center transition-colors"
          title="Open Gallery"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </button>
      </div>

      {value && (
        <div className="group relative aspect-video w-full overflow-hidden rounded border border-gray-200 bg-gray-50 shadow-sm">
          <img src={value} alt="Preview" className="h-full w-full object-contain p-1" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
             <button 
               onClick={(e) => { e.preventDefault(); setIsOpen(true); }}
               type="button"
               className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-gray-900 shadow-sm hover:bg-gray-100"
             >
               Change Image
             </button>
          </div>
        </div>
      )}

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative flex h-[85vh] w-full max-w-5xl flex-col rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-8 py-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Select Image</h3>
                <p className="text-sm text-gray-500">Choose an image from your gallery or upload a new one</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                type="button"
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar for Upload */}
              <div className="w-72 border-r border-gray-100 p-6 bg-gray-50/50">
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                    isDragging ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className={`mb-4 rounded-full p-3 ${isDragging ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  </div>
                  <p className="mb-4 text-sm font-medium text-gray-700">
                    {uploading ? "Uploading..." : "Drag & drop images"}
                  </p>
                  <label className="cursor-pointer rounded-lg bg-white px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <span>Browse files</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </label>
                </div>
                
                <div className="mt-8 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Manual Entry</h4>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-gray-500 uppercase">Image URL</label>
                    <input
                      type="text"
                      value={value || ""}
                      onChange={(e) => onChange(e.target.value)}
                      placeholder="https://..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Main Gallery Grid */}
              <div className="flex-1 overflow-y-auto p-8">
                {loading && images.length === 0 ? (
                  <div className="flex h-full items-center justify-center flex-col gap-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
                    <p className="text-sm text-gray-500">Fetching your images...</p>
                  </div>
                ) : error ? (
                  <div className="flex h-full items-center justify-center text-red-500 bg-red-50 rounded-xl p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                    {error}
                  </div>
                ) : images.length === 0 ? (
                  <div className="flex h-full items-center justify-center flex-col text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                    <p>Your gallery is empty.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                    {images.map((img) => (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => {
                          onChange(img.url);
                          setIsOpen(false);
                        }}
                        className={`group relative flex flex-col items-center gap-2 rounded-xl transition-all ${
                          value === img.url ? "ring-2 ring-blue-500 ring-offset-4" : ""
                        }`}
                      >
                        <div className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 transition-all ${
                          value === img.url ? "border-blue-500 shadow-md" : "border-gray-100 hover:border-blue-200 shadow-sm"
                        }`}>
                          <img src={img.url} alt={img.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                          {value === img.url && (
                            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/10">
                              <div className="rounded-full bg-blue-500 p-1 text-white shadow-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                              </div>
                            </div>
                          )}
                          
                          <button
                            onClick={(e) => deleteImage(e, img.id)}
                            className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100 shadow-md"
                            title="Delete image"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                            </svg>
                          </button>
                        </div>
                        <span className="max-w-full truncate text-[10px] font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                          {img.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-8 py-5 flex justify-between items-center bg-gray-50/30">
              <p className="text-sm font-medium text-gray-500">{images.length} images in library</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="rounded-lg px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
                >
                  Select Current
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
