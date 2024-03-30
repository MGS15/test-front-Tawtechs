import { useContext } from "react";
import { ContentContext } from "../context/ContentConext";
import SectionTitle from "./Common/SectionTitle";
import MainButton from "./Common/MainButton";

const Card = ({ title, content, image, type }: { title: string, content: string, image: string, type: string}) => {
	return (
		<div className={`flex flex-col items-center justify-start bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer`}>
			<div className={`relative`}>
				<img src={image} />
				<span className={`absolute bottom-0 right-0`}>
					{type}
				</span>
			</div>
			<div className={`flex flex-col gap-5 px-7 py-10`}>
				<h2 className={`text-xl font-bold`}>
					{title}
				</h2>
				<p className={`text-md font-light`}>
					{content}
				</p>
			</div>
		</div>
	)
}

const Blog = () => {

	const { blog } = useContext(ContentContext)

	return (
		<div id="blog" className={`w-full flex flex-col items-center bg-white py-20 lg:py-32 gap-y-10`}>
			<SectionTitle title={blog.title} />
			<div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 w-5/6 md:w-4/5 lg:w-3/4`}>
				{
					blog.cards.map((post, index) => {
						return <Card key={index} title={post.title} content={post.content} image={post.image} type={post.type} />
					})
				}
			</div>
			<MainButton text={`view more`} />
		</div>
	);
}

export default Blog;