import ArticleGrid from "./components/ArticleGrid";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1>Personal Blog</h1>
			<ArticleGrid />
		</main>
	);
}
