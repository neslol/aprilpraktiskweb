import type { Data } from "@puckeditor/core";
import { prisma } from "@/lib/prisme";

export interface PageData extends Data {
	published?: boolean;
}

export const getPage = async (path: string) => {
	const page = await prisma.page.findUnique({
		where: { path },
	});

	if (!page) return null;

	return {
		...(page.pageData as Data),
		published: page.published,
	};
};