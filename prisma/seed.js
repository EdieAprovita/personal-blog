const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	await prisma.article.createMany({
		data: [
			{
				title: "A Sample Article",
				date: "May 18, 2024",
				content:
					"This is a sample article to demonstrate the ArticleCard component. It includes a title, date, and content.",
			},
			{
				title: "Another Article",
				date: "May 19, 2024",
				content:
					"Here is another article with different content. Tailwind CSS makes it easy to style components.",
			},
			{
				title: "Third Article",
				date: "May 20, 2024",
				content:
					"This is the third article in the list, showcasing the grid layout with multiple articles.",
			},
		],
	});
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
