"use client";

import {useCallback, useEffect, useState} from "react";
import {usePuck} from "@puckeditor/core";
import type {GalleryImage} from "@/app/api/images/route";

// Root content zone id used by Puck (rootAreaId:rootZone).
const ROOT_ZONE = "root:default-zone";

export default function ImageGallery() {
	const {dispatch, selectedItem, appState} = usePuck();
	const itemSelector = appState.ui.itemSelector;

	const [images, setImages] = useState<GalleryImage[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [uploading, setUploading] = useState(false);

	const fetchImages = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/images");
			if (!res.ok) throw new Error(`Request failed (${res.status})`);
			const contentType = res.headers.get("content-type");
			if (contentType && contentType.includes("application/json")) {
				const data = await res.json() as GalleryImage[];
				setImages(data);
				setError(null);
			} else {
				throw new Error("Invalid response from server");
			}
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Failed to load images");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchImages();
	}, [fetchImages]);

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

				if (!res.ok) {
					throw new Error(`Upload failed for ${file.name}`);
				}
			}
			await fetchImages();
		} catch (e: unknown) {
			setError(e instanceof Error ? e.message : "Failed to upload images");
		} finally {
			setUploading(false);
		}
	};

	const handleDrop = async (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			await uploadFiles(e.dataTransfer.files);
		}
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => {
		setIsDragging(false);
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			await uploadFiles(e.target.files);
		}
	};

	const selectedIsImage = selectedItem?.type === "Image";

	// Append a brand new Image block to the root content.
	const insertImage = (img: GalleryImage) => {
		const id = `Image-${crypto.randomUUID()}`;
		dispatch({
			type: "setData",
			data: (previous) => ({
				...previous,
				content: [
					...(previous.content ?? []),
					{type: "Image", props: {id, src: img.url, alt: img.name}},
				],
			}),
		});
	};

	// Replace the source of the currently selected Image block.
	const updateSelectedImage = (img: GalleryImage) => {
		if (!selectedItem || !itemSelector) return;
		dispatch({
			type: "replace",
			destinationZone: itemSelector.zone ?? ROOT_ZONE,
			destinationIndex: itemSelector.index,
			data: {
				...selectedItem,
				props: {
					...selectedItem.props,
					src: img.url,
					alt: (selectedItem.props as {alt?: string}).alt || img.name,
				},
			},
		});
	};

	const handleClick = (img: GalleryImage) => {
		if (selectedIsImage) {
			updateSelectedImage(img);
		} else {
			insertImage(img);
		}
	};

	const deleteImage = async (e: React.MouseEvent, id: string) => {
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
		<div className="flex h-full flex-col">
			<div
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`mb-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition ${
					isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
				}`}
			>
				<p className="mb-2 text-sm text-gray-600">
					{uploading ? "Uploading..." : "Drag & drop images here"}
				</p>
				<label className="cursor-pointer rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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

			<p className="px-1 pb-3 text-xs leading-relaxed text-gray-500">
				{selectedIsImage
					? "An image block is selected — click a picture to set its source."
					: "Click a picture to add it as a new image block."}
			</p>

			{loading && images.length === 0 && (
				<p className="px-1 text-sm text-gray-400">Loading images…</p>
			)}

			{error && (
				<p className="mb-3 px-1 text-sm text-red-500">
					{error}
				</p>
			)}

			{!loading && images.length === 0 && (
				<p className="px-1 text-sm text-gray-400">
					No images found. Upload some to get started!
				</p>
			)}

			<div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1">
				{images.map((img) => (
					<div
						key={img.id}
						title={`${img.name} — ${(img.size / 1024).toFixed(0)} KB`}
						onClick={() => handleClick(img)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								handleClick(img);
							}
						}}
						tabIndex={0}
						role="button"
						className="group relative aspect-square cursor-pointer overflow-hidden rounded-md border border-gray-200 bg-gray-50 transition hover:border-blue-500 hover:ring-2 hover:ring-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={img.url}
							alt={img.name}
							loading="lazy"
							className="h-full w-full object-cover"
						/>
						<span className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-1.5 py-1 text-left text-[10px] text-white opacity-0 transition group-hover:opacity-100">
							{img.name}
						</span>
						<button
							onClick={(e) => deleteImage(e, img.id)}
							type="button"
							className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition hover:bg-red-600 group-hover:opacity-100"
							title="Delete image"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
								<path d="M18 6 6 18"/><path d="m6 6 12 12"/>
							</svg>
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
