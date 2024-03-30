import { useContext, useState } from "react";
import { ContentContext } from "../context/ContentConext";
import SectionTitle from "./Common/SectionTitle";

const NavButton = ({index, current, onSelect}: {index: number, current: number, onSelect: (index: number) => void}) => (
	<span onClick={() => onSelect(index)}
		className={`${index === current ? "w-10 bg-secondary" : "w-4 bg-gray-300 cursor-pointer"}
		h-4 rounded-full transition-all duration-500`}
	></span>
)

const TestimonyCard = ({content, name, position, isVisible}: {content: string, name: string, position: string, isVisible: boolean}) => {
	
	return (
		<div className={`absolute w-full md:w-4/5 lg:w-1/2 xl:1/3 flex flex-col items-center justify-center gap-y-5
		px-16 py-10  ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
			<p className={`text-center`}>
				{content}
			</p>
			<h3>
				{name}, {position}
			</h3>
		</div>
	)

}

const Testimony = () => {

	const { testimonies } = useContext(ContentContext)
	const [current, setCurrent] = useState(0)


	return (
		<div id="testimonial" className={`w-full flex flex-col items-center bg-tertiary py-20 lg:py-32 gap-y-7`}>
			<SectionTitle title={testimonies.title} />
			<div className={`text-9xl rounded-full bg-tertiary shadow-lg flex items-center justify-center w-24 h-24 mt-10 text-secondary`}>
				<span className={`mt-14 `}>“</span>
			</div>
			<div className={`relative w-full h-52 flex items-center justify-center`}>
				{
					testimonies.cards.map((card, index) => <TestimonyCard content={card.content} name={card.name}
						position={card.position} isVisible={index === current} />)
				}
			</div>
			<div className={`w-full flex flex-row gap-1 items-center justify-center p-1`}>
				{
					testimonies.cards.map((_card, index) => (
						<NavButton key={index} index={index} current={current} onSelect={setCurrent} />
					))
				}
			</div>
		</div>
	)
}

export default Testimony;