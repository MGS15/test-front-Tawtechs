import { useState } from "react";

const navItems = ['home', 'about', 'service', 'works', 'testimonial', 'blog', 'contact'].map((item: string, key: number) => (
	<li
	className={`uppercase py-2 text-primary h-auto cursor-pointer lg:mr-10 md:mr-7`}
	key={`${key}`}>
		<a href={key === 0 ? "/" : "/#" + item} className="py-3 hover:text-secondary hover-navitem">
			{item}
		</a>
	</li>
))

const Navbar = ({isOpen}: {isOpen: Boolean}) => (
	<nav className={isOpen ? "flex" : "hidden lg:flex"}>
		<ul className={`flex bg-white absolute max-lg:z-10 lg:relative max-lg:flex-col
			lg:flex-row w-full text-center items-center justify-content-center
			top-11 left-0 lg:top-0 lg:flex gap-2
		`}>
			{navItems}
		</ul>
	</nav>
)

const Header = () => {

	const [isOpen, setIsOpen] = useState(false)

	const toggleNavBar = () => {setIsOpen(!isOpen)}

	return (
		<header className={`bg-white relative m-auto p-3 flex flex-row justify-center items-center`}>
			<div className={`w-full sm:w-[80%] lg:w-[90%] xl:w-[80%] flex flex-row justify-between items-center`}>
				<div className={`font-bold uppercase`}>
					<button className={`font-xl font-bold text-primary uppercase md:text-2xl text-xl`}>
						logo
					</button>
				</div>
				<Navbar isOpen={isOpen} />
				<div className="lg:hidden">
					<button className="flex justify-center items-center" onClick={toggleNavBar}>
						<svg
							viewBox="0 0 24 24"
							width="24"
							height="24"
							stroke="#333333"
							strokeWidth="2"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={isOpen ? "hidden" : "flex"}
						>
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
						<svg
							viewBox="0 0 24 24"
							width="24"
							height="24"
							stroke="#333333"
							strokeWidth="2"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={isOpen ? "flex fill-primary" : "hidden"}
						>
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header;