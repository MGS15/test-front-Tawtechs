import SectionTitle from "./Common/SectionTitle";

const Contact = () => {
	return (
		<div id="contact" className={`w-full flex flex-col items-center bg-white py-20 lg:py-32 gap-y-10`}>
			<SectionTitle title={`Contact Me`} />
			<div className={`w-5/6 md:w-4/5 lg:w-3/4 flex flex-col justify-center items-center gap-y-5`}>
				<input type="text" name="name-form" id="name-form" placeholder="Name" required 
				className={`border border-primary w-4/5  lg:w-1/2 h-10 px-5 py-2 focus:outline-none rounded-md focus:border-secondary`} />
				<input type="email" name="email-form" id="email-form" placeholder="Email" required 
				className={`border border-primary w-4/5 lg:w-1/2 h-10 px-5 py-2 focus:outline-none rounded-md focus:border-secondary`} />
				<textarea name="message-form" id="message-form" placeholder="Message" required 
				className={`border border-primary w-4/5 lg:w-1/2 h-32 px-5 py-2 focus:outline-none rounded-md focus:border-secondary`} />
				<span onClick={() => alert('salam!')}
				className={`bg-secondary text-white uppercase text-center w-4/5 lg:w-1/2 px-16 py-2 rounded-md cursor-pointer`}>
					salam!
				</span>
			</div>
		</div>
	)
}

export default Contact;