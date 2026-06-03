import type { Data } from "@puckeditor/core";
import { prisma } from "@/lib/prisme";

export const getPage = async (path: string): Promise<Data | null> => {
	const page = await prisma.page.findUnique({
		where: { path },
	});

	return page ? (page.pageData as Data) : null;
};