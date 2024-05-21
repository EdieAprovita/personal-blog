import React from "react";

interface ArticleCardProps {
	title: string;
	date: string;
	content: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, date, content }) => {
	return (
		<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
			<div className="md:flex">
				<div className="p-8">
					<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
						{title}
					</div>
					<p className="mt-2 text-gray-500">{date}</p>
					<p className="mt-2 text-gray-500">{content}</p>
				</div>
			</div>
		</div>
	);
};

export default ArticleCard;
