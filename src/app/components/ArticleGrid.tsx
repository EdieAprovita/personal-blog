"use client";

import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import ArticleFormModal from "./ArticleFormModal";

interface Article {
	id: number;
	title: string;
	date: string;
	content: string;
}

const ArticleGrid: React.FC = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const fetchArticles = async () => {
		try {
			const response = await fetch("/api/articles");
			if (!response.ok) {
				throw new Error("Failed to fetch articles");
			}
			const data = await response.json();
			setArticles(data);
		} catch (error) {
			console.error((error as Error).message);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, []);

	const handleDelete = async (id: number) => {
		try {
			const response = await fetch("/api/articles/delete", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ id }),
			});

			if (!response.ok) {
				throw new Error("Failed to delete article");
			}

			setArticles(articles.filter(article => article.id !== id));
		} catch (error) {
			console.error((error as Error).message);
		}
	};

	const handleArticleAdded = (newArticle: Article) => {
		setArticles([...articles, newArticle]);
	};

	return (
		<div className="container mx-auto">
			<button
				onClick={() => setModalIsOpen(true)}
				className="mb-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
				Add New Article
			</button>
			<ArticleFormModal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				onArticleAdded={handleArticleAdded}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
				{articles.map(article => (
					<div key={article.id} className="relative">
						<ArticleCard
							title={article.title}
							date={article.date}
							content={article.content}
						/>
						<button
							onClick={() => handleDelete(article.id)}
							className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600">
							Delete
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default ArticleGrid;
