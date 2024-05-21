import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	try {
		const { id } = await request.json();
		await prisma.article.delete({
			where: { id },
		});
		return NextResponse.json({ message: "Article deleted" });
	} catch (error) {
		return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
	}
}
