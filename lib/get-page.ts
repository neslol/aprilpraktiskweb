import type { Data } from "@puckeditor/core";
import { prisma } from "@/lib/prisme";

export interface PageData extends Data {
	published?: boolean;
	isRoot?: boolean;
	path?: string;
}

export const getPage = async (path: string) => {
	const page = await prisma.page.findUnique({
		where: { path },
	});

	if (!page) return null;

	return {
		...(page.pageData as Data),
		published: page.published,
		isRoot: page.isRoot,
		path: page.path,
	};
};

export const getRootPage = async () => {
	const page = await prisma.page.findFirst({
		where: { isRoot: true },
	});

	if (!page) return null;

	return {
		...(page.pageData as Data),
		published: page.published,
		isRoot: page.isRoot,
		path: page.path,
	};
};