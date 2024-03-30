import MainButton from "./Common/MainButton";
import SectionTitle from "./Common/SectionTitle";

const Freelancing = () => {
	return (
		<div className={`w-full flex flex-col items-center bg-tertiary py-20 lg:py-32 gap-y-7`}>
			<SectionTitle title={`I am available for Freelancing`} />
			<MainButton text={`hire me`} />
		</div>
	)
}

export default Freelancing;