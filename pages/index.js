import React from "react";
import Header from "components/header";
import HomeFront from "components/homeFront";
import SectionPizza from "components/sectionPizzas";
import SectionEmpanadas from "components/sectionEmpanadas";
import SectionCombos from "components/sectionCombos";
export default function index() {
	return (
		<div className="flex flex-col min-h-screen overflow-hidden bg-slate-900">
			<main className="flex-grow bg-slate-900">
				<Header />
				<HomeFront />
				<SectionPizza />
				<SectionEmpanadas />
				<SectionCombos />
			</main>
		</div>
	);
}
