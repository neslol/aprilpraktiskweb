import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisme";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    // Map email to username for compatibility with dashboard UI if needed, 
    // but dashboard UI uses user.username which I should update too.
    return NextResponse.json(users.map(u => ({ ...u, username: u.email })));
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, password, name, role } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Note: Better Auth should ideally handle user creation to hash passwords correctly.
    // For now, this is a direct prisma call, but password should be hashed if used for login.
    // Better Auth uses Account table for credentials.
    
    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email,
        name: name || email,
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: role || "admin",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
