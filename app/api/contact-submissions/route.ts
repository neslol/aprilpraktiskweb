import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisme";

export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: {
        createdAt: "desc",
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
        { error: "Name, email and message are required" },
        { status: 400 }
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

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    console.error("Error creating contact submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Extract 'id' from query parameters (e.g., /api/submissions?id=xyz)
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 }
      );
    }

    // Delete the record from the database
    const deletedSubmission = await prisma.contactSubmission.delete({
      where: { id: id }, // Adjust field type mapping if your ID is an Int/Number
    });

    return NextResponse.json(
      { message: "Submission deleted successfully", deletedSubmission },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting contact submission:", error);

    // Handle case where record to delete doesn't exist in Prisma
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}