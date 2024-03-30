import About from "./About";
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
		</>
	);
}

export default MainComponent;