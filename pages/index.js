/* eslint-disable react/no-unknown-property */
import React, { useEffect, useState } from "react";
import Header from "components/header";
import HomeFront from "components/sections/homeFront";
import SectionPizza from "components/sections/sectionPizzas";
import SectionEmpanadas from "components/sections/sectionEmpanadas";
import SectionCombos from "components/sections/sectionCombos";
import Footer from "components/sections/footer";
import { getProductos } from "store/reducers/productSlice";
import { useDispatch } from "react-redux";

export default function index() {
	const [showModal, setShowModal] = useState(false);

	const [currentProducto, setCurrentProducto] = useState(null);
	const dispatch = useDispatch();

	const handleOpenModal = producto => {
		setCurrentProducto(producto);
		setShowModal(true);
	};
	useEffect(() => {
		dispatch(getProductos());
	});
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
				<SectionPizza handleOpen={handleOpenModal} handleClose={handleCloseModal} showModal={showModal} currentProducto={currentProducto} />
				<SectionEmpanadas handleOpen={handleOpenModal} handleClose={handleCloseModal} showModal={showModal} currentProducto={currentProducto} />
				<SectionCombos handleOpen={handleOpenModal} handleClose={handleCloseModal} showModal={showModal} currentProducto={currentProducto} />
				<Footer />
			</main>
		</div>
	);
}

// export const getServerSideProps = async () => {
// 	const { DEV_URL, PROD_URL } = process.env;

// 	const respuesta = await axios.get(
// 		`${process.env.NODE_ENV === "development" ? DEV_URL : PROD_URL}` + "/api/products"
// 	);

// 	return {
// 		props: {
// 			// Pasa el estado hidratado como prop al componente de Next.js
// 			data: respuesta.data,
// 		},
// 	};
// };

// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
// 	const state = await getProducts();

// 	store.dispatch(setProductData(state));
// 	return {
// 		props: {
// 			// Pasa el estado hidratado como prop al componente de Next.js
// 			data: state,
// 		},
// 	};
// });
