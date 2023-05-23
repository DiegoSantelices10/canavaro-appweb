import React, { useEffect, useState } from "react";
import Header from "components/header";
import HomeFront from "components/sections/homeFront";
import SectionPizza from "components/sections/sectionPizzas";
import SectionEmpanadas from "components/sections/sectionEmpanadas";
import SectionCombos from "components/sections/sectionCombos";
import Footer from "components/sections/footer";
import { setProductData } from "store/reducers/productSlice";
import { wrapper } from "store/app/store";
import getProducts from "services/fetchData";
import axios from "axios";

export default function index({ data: state }) {
	const [showModal, setShowModal] = useState(false);

	const [currentProducto, setCurrentProducto] = useState(null);

	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/products/");
			console.log("respuesta", res);
		})();

		localStorage.setItem("products", JSON.stringify(state));
	});

	const handleOpenModal = producto => {
		setCurrentProducto(producto);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setCurrentProducto(null);
		setShowModal(false);
	};

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
				<SectionPizza
					handleOpen={handleOpenModal}
					handleClose={handleCloseModal}
					showModal={showModal}
					currentProducto={currentProducto}
				/>
				<SectionEmpanadas
					handleOpen={handleOpenModal}
					handleClose={handleCloseModal}
					showModal={showModal}
					currentProducto={currentProducto}
				/>
				<SectionCombos
					handleOpen={handleOpenModal}
					handleClose={handleCloseModal}
					showModal={showModal}
					currentProducto={currentProducto}
				/>
				<Footer />
			</main>
		</div>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
	const baseUrl = context.req.headers.host;
	console.log(context.req.headers);
	const state = await getProducts(baseUrl);
	store.dispatch(setProductData(state));
	return {
		props: {
			// Pasa el estado hidratado como prop al componente de Next.js
			data: state,
		},
	};
});
