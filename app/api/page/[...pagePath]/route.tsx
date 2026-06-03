import {NextRequest, NextResponse} from "next/server";

export async function GET(
	{ params }: { params: Promise<{ puckPath: string }> }
) {
	const { puckPath } = await params;
	return new Response();
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ puckPath: string }> }
) {
	const { puckPath } = await params;
	
	return new Response();
}