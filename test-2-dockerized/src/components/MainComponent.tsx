import About from "./About";
import Blog from "./Blog";
import Contact from "./Contact";
import Footer from "./Footer";
import Freelancing from "./Freelancing";
import Header from "./Header";
import Hero from "./Hero";
import MyWork from "./MyWork";
import Services from "./Services";
import Testimony from "./Testimony";

const MainComponent = () => {
	return (
		<>
			<Header />
			<Hero />
			<About />
			<Services />
			<MyWork />
			<Testimony />
			<Blog />
			<Freelancing />
			<Contact />
			<Footer />
		</>
	);
}

export default MainComponent;