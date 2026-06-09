import Client from "./client";
import {getPage, getRootPage, PageData} from "@/lib/get-page";
import {Metadata} from "next";
import {notFound, redirect} from "next/navigation";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ puckPath?: string[] }>;
}): Promise<Metadata> {
	const {puckPath = []} = await params;
	const path = `/${puckPath.join("/")}`;

	return {
		title: "Venturen: " + path,
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ puckPath?: string[] }>;
}) {
	const {puckPath = []} = await params;
	const path = `/${puckPath.join("/")}`;
	let data = await getPage(path) as PageData | null;

	if (!data || !data.published) {
		if (path === "/") {
			const rootPage = await getRootPage();
			if (rootPage && rootPage.published && rootPage.path && rootPage.path !== "/") {
				redirect(rootPage.path);
			}
		}
		notFound();
	}
	
	return (<Client path={path} data={data}/>);
}

export const dynamic = "force-dynamic";