import Client from "./client";
import {getPage, PageData} from "@/lib/get-page";
import {Metadata} from "next";
import {notFound} from "next/navigation";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ puckPath?: string[] }>;
}): Promise<Metadata> {
	const {puckPath = []} = await params;
	const path = `/${puckPath.join("/")}`;

	return {
		title: "Puck: " + path,
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ puckPath?: string[] }>;
}) {
	const {puckPath = []} = await params;
	const path = `/${puckPath.join("/")}`;
	const data = await getPage(path) as PageData | null;

	if (!data || !data.published) {
		notFound();
	}
	
	return (<Client path={path} data={data}/>);
}

export const dynamic = "force-dynamic";