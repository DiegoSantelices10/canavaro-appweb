import React from "react";
import Header from "components/header";
import HeroHome from "components/heroHome";
// import FeaturesHome from "components/featuresHome";
// import FeaturesBlocks from "components/featuresBlocks";
// import Testimonials from "components/testimonials";
// import Newsletter from "components/newSletter";
// import Footer from "components/footer";

export default function index() {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden bg-slate-900">
			<Header />
			<main className="flex-grow bg-slate-900">
				{/*  Page sections */}
				<HeroHome />
				{/* <FeaturesHome />
				<FeaturesBlocks />
				<Testimonials />
				<Newsletter /> */}
			</main>

			{/*  Site footer */}
			{/* <Footer /> */}
		</div>
	);
}
