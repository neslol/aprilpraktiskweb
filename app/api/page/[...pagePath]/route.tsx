import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisme";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ pagePath: string[] }> }
) {
	const { pagePath } = await params;
	const path = `/${pagePath.join("/")}`;

	try {
		const page = await prisma.page.findUnique({
			where: { path }
		});

		if (!page) {
			return NextResponse.json({ error: "Page not found" }, { status: 404 });
		}

		return NextResponse.json(page);
	} catch (error) {
		console.error("Error fetching page:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ pagePath: string[] }> }
) {
	const { pagePath } = await params;
	const path = `/${pagePath.join("/")}`;
	const data = await request.json();

	try {
		const page = await prisma.page.upsert({
			where: { path },
			update: {
				pageData: data,
				updateDate: new Date(),
			},
			create: {
				path,
				pageData: data,
				creationDate: new Date(),
				updateDate: new Date(),
			},
		});

		return NextResponse.json(page);
	} catch (error) {
		console.error("Error saving page:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ pagePath: string[] }> }
) {
	const { pagePath } = await params;
	const path = `/${pagePath.join("/")}`;

	try {
		await prisma.page.delete({
			where: { path }
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting page:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}