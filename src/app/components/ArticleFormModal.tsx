// ArticleFormModal.tsx
"use client";
import React, { useState } from "react";
import Modal from "react-modal";

interface ArticleFormModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	onArticleAdded: (article: {
		id: number;
		title: string;
		date: string;
		content: string;
	}) => void;
}

const ArticleFormModal: React.FC<ArticleFormModalProps> = ({
	isOpen,
	onRequestClose,
	onArticleAdded,
}) => {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch("/api/articles/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, date, content }),
			});

			if (!response.ok) {
				throw new Error(`Failed to create article: ${response.statusText}`);
			}

			const newArticle = await response.json();
			onArticleAdded(newArticle);

			setTitle("");
			setDate("");
			setContent("");

			onRequestClose();
		} catch (error) {
			console.error("Error creating article:", (error as Error).message);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Add New Article"
			className="bg-white p-4 rounded shadow-lg max-w-md mx-auto mt-20"
			overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
			<h2 className="text-xl font-bold mb-4">Add New Article</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="title" className="block text-sm font-medium">
						Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="border rounded-md p-2 w-full"
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="date" className="block text-sm font-medium">
						Date
					</label>
					<input
						type="text"
						id="date"
						name="date"
						value={date}
						onChange={e => setDate(e.target.value)}
						className="border rounded-md p-2 w-full"
						required
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="content" className="block text-sm font-medium">
						Content
					</label>
					<textarea
						id="content"
						name="content"
						value={content}
						onChange={e => setContent(e.target.value)}
						className="border rounded-md p-2 w-full"
						required
					/>
				</div>
				<div className="flex justify-end">
					<button
						type="button"
						onClick={onRequestClose}
						className="mr-2 bg-gray-500 text-white rounded-md px-4 py-2 hover:bg-gray-600">
						Cancel
					</button>
					<button
						type="submit"
						className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
						Add Article
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default ArticleFormModal;
