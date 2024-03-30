import { useContext, useState } from "react";
import { ContentContext } from "../context/ContentConext";
import SectionTitle from "./Common/SectionTitle";

const TypeChoice = ({type, isSelected, onSelect}: {type: string, isSelected: boolean, onSelect: (type: string) => void}) => {

	return (
		<div onClick={() => onSelect(type)}
			className={`px-5 py-1 ${isSelected ? "bg-secondary text-tertiary" : "bg-tertiary text-primary"}
			rounded-md cursor-pointer uppercase`}>
			{type}
		</div>
	)
}

const Project = ({image}: {image: string}) => {
	return (
		<div className={`h-fit rounded-lg overflow-hidden grid-item`}>
			<img src={image} />
		</div>
	)
}

const MyWork = () => {

	const { works } = useContext(ContentContext)
	const [selectedType, setSelectedType] = useState('all')
	const types = ['all', ...works.types]

	return (
		<div id="works" className={`flex flex-col items-center bg-white py-20 lg:py-32 gap-y-20`}>
			<SectionTitle title={works.title} />
			<div className={`w-full md:w-4/5 lg:w-3/4 flex flex-col items-center justify-start gap-y-5`}>
				<div className={`flex flex-row flex-wrap justify-center items-center gap-x-5 gap-y-2`}>
					{
						types.map((type, index) => {
							return <TypeChoice key={index} type={type} isSelected={type === selectedType} onSelect={setSelectedType} />
						})
					}
				</div>
				<div className={`gridd gap-5 my-10`}>
					{
						works.projects.filter(project => selectedType === 'all' || project.type === selectedType).map((project, index) => {
							return <Project key={index} image={project.image} />
						})
					}
				</div>
			</div>
		</div>
	)
}

export default MyWork;