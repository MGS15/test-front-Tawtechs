const SectionTitle = ({title}: {title: string}) => (
	<div className={`flex flex-col items-center gap-y-5`}>
		<h2 className={`bracet text-4xl uppercase text-primary font-light`}>{title}</h2>
		<hr className={`h-px w-10 my-1 bg-gray-700 border-0 `} />
	</div>
)

export default SectionTitle;