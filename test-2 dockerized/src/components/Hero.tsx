const Hero = () => {
	return (
		<div className={`relative bg-hero-bg bg-center bg-cover bg-no-repeat bg-fixed flex w-full h-screen`}>
			<div className="absolute inset-0 bg-black bg-opacity-30">
				<div className={`blob absolute w-44 h-44 bg-white opacity-40 top-1/2 left-[38%] transform -translate-x-1/2 -translate-y-1/2`}></div>
				<h1 className={`absolute text-5xl sm:text-6xl font-bold text-white uppercase  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-normal`}>
					i am alice joseph
				</h1>
			</div>
		</div>
	)
}

export default Hero;