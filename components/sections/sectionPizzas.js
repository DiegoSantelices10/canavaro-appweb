/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Element } from "react-scroll";
import Image from "next/image";
import { useSelector } from "react-redux";
import Modal from "components/modal";

export default function SectionPizza() {
	const [showModal, setShowModal] = useState(false);
	const [currentProducto, setCurrentProducto] = useState({});

	const { products } = useSelector(state => state.product);

	const handleOpenModal = producto => {
		setCurrentProducto(producto);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setCurrentProducto(null);
		setShowModal(false);
	};
	return (
		<Element name="pizzas" className="p-3 mt-10  w-full  element font-nunito">
			{currentProducto !== null && (
				<Modal key={currentProducto._id} showModal={showModal} handleClose={handleCloseModal} producto={currentProducto}>
					{currentProducto}
				</Modal>
			)}
			<h1 className="text-center  p-1 text-2xl lg:text-3xl font-extrabold">Nuestras Pizzas</h1>
			<div className="flex justify-center h-32 items-center w-full gap-10">
				<div className="text-center h-28 w-auto flex flex-col justify-between ">
					<div className="h-24  flex justify-center items-center ">
						<Image src={"/images/pizza-vector-negro.png"} width={60} height={60} alt="gigante" />
					</div>
					<p className="font-bold text-lg">Gigante</p>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/pizza-vector-negro.png"} width={55} height={55} alt="mediana" />
					</div>
					<p className="font-bold text-lg">Mediana</p>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/pizza-vector-negro.png"} width={50} height={50} alt="chica" />
					</div>
					<p className="font-bold text-lg">Chica</p>
				</div>
			</div>
			<div
				className="bg-black p-2 bg-opacity-80 w-full lg:w-4/5 mx-auto 
							text-white grid grid-cols-2 gap-2 content-center pb-6 pt-4 "
			>
				<p className="italic col-span-2 text-white text-center text-xs pb-4">* Hacer click sobre el titulo para ver descripcion.</p>
				{products
					?.filter(item => item.categoria === "pizzas")
					.map(producto => {
						return (
							<div key={producto._id} className="w-auto">
								<p
									onClick={() => handleOpenModal(producto)}
									className=" cursor-pointer text-white text-center w-full md:w-3/5 mx-auto rounded-md hover:bg-slate-50 hover:text-neutral-900 transition-colors duration-500"
								>
									{producto.nombre}
								</p>
							</div>
						);
					})}
			</div>
		</Element>
	);
}
