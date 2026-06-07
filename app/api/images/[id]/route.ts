import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisme";

export async function GET(
	request: NextRequest,
	{params}: {params: Promise<{id: string}>}
) {
	const {id} = await params;

	try {
		const image = await prisma.image.findUnique({
			where: {id},
		});

		if (!image) {
			return new NextResponse("Not Found", {status: 404});
		}

		return new NextResponse(image.data, {
			headers: {
				"Content-Type": image.mimeType,
				"Content-Length": image.size.toString(),
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (error) {
		console.error("Error serving image:", error);
		return new NextResponse("Internal Server Error", {status: 500});
	}
}

export async function DELETE(
	request: NextRequest,
	{params}: {params: Promise<{id: string}>}
) {
	const {id} = await params;

	try {
		await prisma.image.delete({
			where: {id},
		});

		return new NextResponse(null, {status: 204});
	} catch (error) {
		console.error("Error deleting image:", error);
		return new NextResponse("Internal Server Error", {status: 500});
	}
}
