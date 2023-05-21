/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import Header from "components/header";
import HomeFront from "components/sections/homeFront";
import SectionPizza from "components/sections/sectionPizzas";
import SectionEmpanadas from "components/sections/sectionEmpanadas";
import SectionCombos from "components/sections/sectionCombos";
import Footer from "components/sections/footer";
import { setProductData } from "store/reducers/productSlice";

// import axios from "axios";
import { wrapper } from "store/app/store";
import getProducts from "services/fetchData";

export default function index() {
	const [showModal, setShowModal] = useState(false);

	const [currentProducto, setCurrentProducto] = useState(null);

<<<<<<< HEAD
	// useEffect(() => {
	// 	(async () => {
	// 		const result = await axios.get("/api/products");
	// 		// const res = JSON.parse(result.request.response);
	// 		// console.log(res);
	// 		localStorage.setItem("products", JSON.stringify(result.data));
	// 	})();
	// });
=======
	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/products/");
			console.log("respuesta", res);
		})();

		localStorage.setItem("products", JSON.stringify(state));
	});
>>>>>>> parent of ed5ad7b (creamos URL en base production)

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

<<<<<<< HEAD
export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
	const state = await getProducts();

=======
export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
	const baseUrl = context.req.headers.host;
	console.log(context.req.headers);
	const state = await getProducts(baseUrl);
>>>>>>> parent of ed5ad7b (creamos URL en base production)
	store.dispatch(setProductData(state));
	return {
		props: {
			// Pasa el estado hidratado como prop al componente de Next.js
			data: state,
		},
	};
});
