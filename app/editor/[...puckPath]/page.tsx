import "@puckeditor/core/puck.css";
import Client from "./client";
import {getPage} from "@/lib/get-page";
import {Metadata} from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ puckPath: string[] }>;
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
	params: Promise<{ puckPath: string[] }>;
}) {
	const {puckPath = []} = await params;
	const path = `/${puckPath.join("/")}`;
	const data = await getPage(path);

	return (<Client path={path} data={data || {}}/>);
}

export const dynamic = "force-dynamic";