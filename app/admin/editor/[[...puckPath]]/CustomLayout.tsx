"use client";

import {useState} from "react";
import {Puck, usePuck} from "@puckeditor/core";
import ImageGallery from "./ImageGallery";

import Link from "next/link";

type Tab = "blocks" | "outline" | "gallery";

const TABS: {id: Tab; label: string}[] = [
	{id: "blocks", label: "Blocks"},
	{id: "outline", label: "Outline"},
	{id: "gallery", label: "Gallery"},
];

function PublishButton({path}: {path: string}) {
	const {appState} = usePuck();
	const data = appState.data;
	const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

	const publish = async (asPublished: boolean) => {
		setState("saving");
		try {
			const res = await fetch(`/api/page${path}`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ pageData: data, published: asPublished }),
			});
			if (!res.ok) throw new Error(`Request failed (${res.status})`);
			setState("saved");
			setTimeout(() => setState("idle"), 2000);
		} catch (e) {
			console.error("Publish failed:", e);
			setState("error");
			setTimeout(() => setState("idle"), 3000);
		}
	};

	return (
		<div className="flex gap-2">
			<button
				type="button"
				onClick={() => publish(false)}
				disabled={state === "saving"}
				className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-60"
			>
				Save Draft
			</button>
			<button
				type="button"
				onClick={() => publish(true)}
				disabled={state === "saving"}
				className={`rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:opacity-60 ${
					state === "error" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
				}`}
			>
				{state === "saving" ? "Publishing…" : state === "saved" ? "Published ✓" : "Publish"}
			</button>
		</div>
	);
}

export default function CustomLayout({path}: {path: string}) {
	const [tab, setTab] = useState<Tab>("blocks");

	return (
		<div className="grid h-screen grid-cols-[300px_1fr_320px] bg-gray-100 text-gray-900">
			{/* LEFT SIDEBAR */}
			<aside className="flex h-screen flex-col border-r border-gray-200 bg-white">
				<div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 bg-gray-50">
					<Link href="/admin/dashboard" className="flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
						Dashboard
					</Link>
				</div>
				<div className="flex border-b border-gray-200">
					{TABS.map((t) => (
						<button
							key={t.id}
							type="button"
							onClick={() => setTab(t.id)}
							className={`flex-1 px-3 py-3 text-sm font-medium transition ${
								tab === t.id
									? "border-b-2 border-blue-600 text-blue-600"
									: "text-gray-500 hover:text-gray-800"
							}`}
						>
							{t.label}
						</button>
					))}
				</div>

				<div className="flex-1 overflow-y-auto p-3">
					{/* Keep panels mounted so each tab preserves its state; toggle visibility. */}
					<div className={tab === "blocks" ? "block" : "hidden"}>
						<Puck.Components/>
					</div>
					<div className={tab === "outline" ? "block" : "hidden"}>
						<Puck.Outline/>
					</div>
					<div className={tab === "gallery" ? "block h-full" : "hidden"}>
						<ImageGallery/>
					</div>
				</div>
			</aside>

			{/* CENTER — PREVIEW / DROP ZONE */}
			<main className="flex h-screen flex-col overflow-hidden">
				<header className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
					<div>
						<h1 className="text-sm font-semibold">Page editor</h1>
						<p className="font-mono text-xs text-gray-400">{path}</p>
					</div>
					<PublishButton path={path}/>
				</header>

				<div className="flex-1 overflow-auto p-6">
					<Puck.Preview/>
				</div>
			</main>

			{/* RIGHT SIDEBAR — PROPERTIES */}
			<aside className="flex h-screen flex-col border-l border-gray-200 bg-white">
				<div className="border-b border-gray-200 px-4 py-3">
					<h2 className="text-sm font-semibold">Properties</h2>
				</div>
				<div className="flex-1 overflow-y-auto p-3">
					<Puck.Fields/>
				</div>
			</aside>
		</div>
	);
}
