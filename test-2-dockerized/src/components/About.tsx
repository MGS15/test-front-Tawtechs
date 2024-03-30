import { useContext } from 'react';
import alicepic from '../assets/alicepic.jpg';
import { ContentContext } from '../context/ContentConext';
import SectionTitle from './Common/SectionTitle';

const Card = ({ title, content, icon }: { title: string, content: string, icon: string}) => {
	return (
		<div className={`w-full lg:w-1/3 flex flex-col md:flex-row items-center md:items-start justify-start gap-x-4`}>
			<div className={`w-10`}>
				<img src={icon} />
			</div>
			<div className={`w-3/4 bg-white flex flex-col justify-center items-center md:items-start`}>
				<h3 className={`text-xl font-bold uppercase text-primary`}>{title}</h3>
				<p className={`text-sm font-light text-primary`}>{content}</p>
			</div>
		</div>
	)
}

const About = () => {

	const { about } = useContext(ContentContext);

	return (
		<div id='about' className={`w-full bg-white py-20 lg:py-32 flex flex-col gap-y-20 justify-between items-center`}>
			<SectionTitle title={about.title} />	
			<div className={`flex flex-col md:flex-row gap-10 justify-evenly items-center`}>
				<div className={`hidden sm:block blob overflow-hidden w-72 lg:w-96`}>
					<img src={alicepic} alt="" />
				</div>
				<div className={`w-full md:w-1/2 flex flex-row flex-wrap justify-center items-center gap-10`}>
					{
						about.cards.map((card, index) => {
							return <Card key={index} title={card.title} content={card.content} icon={card.icon} />
						})
					}
				</div>
			</div>
		</div>
	)
}

export default About;