import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisme";

export type GalleryImage = {
	id: string;
	name: string;
	url: string;
	size: number;
	mimeType: string;
};

/**
 * GET /api/images
 *
 * Lists images stored in the database.
 */
export async function GET() {
	try {
		const images = await prisma.image.findMany({
			orderBy: {createdAt: "desc"},
			select: {
				id: true,
				name: true,
				size: true,
				mimeType: true,
			},
		});

		const galleryImages: GalleryImage[] = images.map((img) => ({
			id: img.id,
			name: img.name,
			url: `/api/images/${img.id}`,
			size: img.size,
			mimeType: img.mimeType,
		}));

		return NextResponse.json(galleryImages);
	} catch (error) {
		console.error("Error listing images:", error);
		return NextResponse.json({error: "Internal Server Error"}, {status: 500});
	}
}

/**
 * POST /api/images
 *
 * Uploads a new image to the database.
 */
export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File | null;

		if (!file) {
			return NextResponse.json({error: "No file provided"}, {status: 400});
		}

		const buffer = Buffer.from(await file.arrayBuffer());

		const image = await prisma.image.create({
			data: {
				name: file.name,
				mimeType: file.type,
				size: file.size,
				data: buffer,
			},
		});

		const galleryImage: GalleryImage = {
			id: image.id,
			name: image.name,
			url: `/api/images/${image.id}`,
			size: image.size,
			mimeType: image.mimeType,
		};

		return NextResponse.json(galleryImage);
	} catch (error) {
		console.error("Error uploading image:", error);
		return NextResponse.json({error: "Internal Server Error"}, {status: 500});
	}
}
