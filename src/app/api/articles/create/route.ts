import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	try {
		const { title, date, content } = await request.json();
		const article = await prisma.article.create({
			data: {
				title,
				date,
				content,
			},
		});
		return NextResponse.json(article);
	} catch (error) {
		return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
	}
}
