import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisme";

export async function GET() {
	try {
		const pages = await prisma.page.findMany({
			orderBy: {
				updateDate: 'desc'
			}
		});

		return NextResponse.json(pages);
	} catch (error) {
		console.error("Error fetching pages:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
