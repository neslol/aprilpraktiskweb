import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisme";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ pagePath?: string[] }> }
) {
	const { pagePath } = await params;
	const path = pagePath ? `/${pagePath.join("/")}` : "/";

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
	{ params }: { params: Promise<{ pagePath?: string[] }> }
) {
	const { pagePath } = await params;
	const path = pagePath ? `/${pagePath.join("/")}` : "/";
	const { pageData, published } = await request.json();

	try {
		const page = await prisma.page.upsert({
			where: { path },
			update: {
				pageData: pageData !== undefined ? pageData : undefined,
				published: published !== undefined ? published : undefined,
				updateDate: new Date(),
			},
			create: {
				path,
				pageData: pageData || {},
				published: published || false,
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

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ pagePath?: string[] }> }
) {
	const { pagePath } = await params;
	const path = pagePath ? `/${pagePath.join("/")}` : "/";
	const { newPath, published } = await request.json();

	try {
		if (newPath) {
			// Handle renaming
			const existing = await prisma.page.findUnique({ where: { path: newPath } });
			if (existing) {
				return NextResponse.json({ error: "Page with this path already exists" }, { status: 400 });
			}

			// We need to create a new record and delete the old one because path is the @id
			const oldPage = await prisma.page.findUnique({ where: { path } });
			if (!oldPage) {
				return NextResponse.json({ error: "Page not found" }, { status: 404 });
			}

			await prisma.$transaction([
				prisma.page.create({
					data: {
						path: newPath,
						pageData: oldPage.pageData as any,
						published: published !== undefined ? published : oldPage.published,
						creationDate: oldPage.creationDate,
						updateDate: new Date(),
					}
				}),
				prisma.page.delete({ where: { path } })
			]);

			return NextResponse.json({ success: true, path: newPath });
		} else if (published !== undefined) {
			// Handle toggling published
			await prisma.page.update({
				where: { path },
				data: { published, updateDate: new Date() }
			});
			return NextResponse.json({ success: true });
		}

		return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
	} catch (error) {
		console.error("Error updating page:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ pagePath?: string[] }> }
) {
	const { pagePath } = await params;
	const path = pagePath ? `/${pagePath.join("/")}` : "/";

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