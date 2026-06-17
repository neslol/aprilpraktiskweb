import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisme";

export async function GET() {
  try {
    // Fetch submissions ordered by the newest first
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: "desc", // Assumes your schema has a createdAt field
      },
    });

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as {
			name?: string;
			email?: string;
			phone?: string;
			message?: string;
		};

		const name = body.name?.trim() ?? "";
		const email = body.email?.trim() ?? "";
		const phone = body.phone?.trim() ?? "";
		const message = body.message?.trim() ?? "";

		if (!name || !email || !message) {
			return NextResponse.json(
				{error: "Name, email and message are required"},
				{status: 400},
			);
		}

		const submission = await prisma.contactSubmission.create({
			data: {
				name,
				email,
				phone: phone || null,
				message,
			},
		});

		return NextResponse.json(submission, {status: 201});
	} catch (error) {
		console.error("Error creating contact submission:", error);
		return NextResponse.json({error: "Internal Server Error"}, {status: 500});
	}
}