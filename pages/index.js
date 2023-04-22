import React, { useEffect } from "react";
import Header from "components/header";
import HomeFront from "components/sections/homeFront";
import SectionPizza from "components/sections/sectionPizzas";
import SectionEmpanadas from "components/sections/sectionEmpanadas";
import SectionCombos from "components/sections/sectionCombos";
import { useDispatch } from "react-redux";
import { setProductData } from "store/reducers/productSlice";
import { getProducts } from "services/fetchData";
export default function index() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setProductData(getProducts));
	}, []);
	return (
		<div className="bg-image flex flex-col min-h-screen overflow-hidden ">
			<div className="absolute inset-0 h-full"> </div>
			<style jsx>{`
				.bg-image {
					background-image: url(/images/textura-papel.jpg);
					background-size: cover;
					background-position: center center;
					width: 100%;
				}
			`}</style>
			<main className="font-nunito">
				<Header />
				<HomeFront />
				<SectionPizza />
				<SectionEmpanadas />
				<SectionCombos />
			</main>
		</div>
	);
}
