const socialMedia = ['facebook', 'twitter', 'dribble', 'linkedin', 'pintrest'].map((item, index) => (
	<a key={index} href={`https://www.${item}.com/`}
		className={`text-tertiary capitalize text-lg`}>
		{item}
	</a>
))


const Footer = () => {
	return (
		<footer className={`w-full flex flex-col items-center justify-start bg-primary py-20 lg:py-32 gap-y-7`}>
			<h2 className={`text-2xl font-bold uppercase text-tertiary cursor-pointer select-none`}>logo</h2>
			<div className={`w-4/5 md:w-3/4 lg:w-1/2 flex flex-row flex-wrap justify-center items-center gap-5`}>
				{socialMedia}
			</div>
			<h3 className={`text-sm text-tertiary`}>
				© 2024 - Soufiane Elkhamlichi, All rights reserved
			</h3>
		</footer>
	);
}

export default Footer;