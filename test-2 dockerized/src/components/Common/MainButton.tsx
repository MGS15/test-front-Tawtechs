const MainButton = ({text}: {text: string}) => (
	<span onClick={() => alert(text)} className={`bg-secondary text-white uppercase px-16 py-2 mt-10 rounded-lg cursor-pointer`}>
		{text}
	</span>
)

export default MainButton;