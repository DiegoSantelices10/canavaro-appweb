/* eslint-disable react/no-unknown-property */
import React, { useEffect } from "react";
import Header from "components/header";
import HomeFront from "components/sections/homeFront";
import SectionPizza from "components/sections/sectionPizzas";
import SectionEmpanadas from "components/sections/sectionEmpanadas";
import SectionCombos from "components/sections/sectionCombos";
import SectionZona from "components/sections/sectionZona";
import Footer from "components/sections/footer";
import { setProductData } from "store/reducers/productSlice";

import { wrapper } from "store/app/store";
import { getProducts } from "services/fetchData";

export default function index({ state }) {
	useEffect(() => {
		console.log("productos", state);
		localStorage.setItem("productos", JSON.stringify(state));
	});

	return (
		<div className=" flex flex-col min-h-screen overflow-hidden bg-neutral-900 ">
			<main className="font-nunito">
				<Header />
				<HomeFront />
				<SectionPizza />
				<SectionEmpanadas />
				<SectionCombos />
				<SectionZona />
				<Footer />
			</main>
		</div>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
	const state = await getProducts();
	store.dispatch(setProductData(state));
	return {
		props: {
			// Pasa el estado hidratado como prop al componente de Next.js
			state,
		},
	};
});
