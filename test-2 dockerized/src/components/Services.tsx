import { useContext } from "react";
import SectionTitle from "./Common/SectionTitle";
import { ContentContext } from "../context/ContentConext";

const Card = ({ title, content, icon }: { title: string, content: string, icon: string}) => {
	return (
		<div className={`relative flex flex-col items-center justify-start px-10 py-14 bg-white shadow-lg`}>
			<div className={`absolute box-content p-7 bg-white w-10 rounded-full transform shadow-lg -translate-y-1/2 top-[0%]`}>
				<img src={icon} />
			</div>
			<div className={`flex flex-col justify-center items-center  gap-5`}>
				<h3 className={`text-xl font-bold uppercase text-primary`}>{title}</h3>
				<p className={`text-sm font-light text-primary`}>{content}</p>
			</div>
		</div>
	)
}

const Services = () => {

	const { services } = useContext(ContentContext)

	return (
		<div id="service" className={`flex flex-col items-center bg-tertiary py-20 lg:py-32 gap-y-20`}>
			<SectionTitle title={services.title} />
			<div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20 w-full md:w-4/5 lg:w-3/4`} >
				{
					services.cards.map((card, index) => {
						return <Card key={index} title={card.title} content={card.content} icon={card.icon} />
					})
				}
			</div>
		</div>
	)
}

export default Services;