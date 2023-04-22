import React from "react";
import { Element } from "react-scroll";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function sectionPizza() {
	const { products } = useSelector(state => state.product);

	const { pizzas } = products;

	return (
		<Element name="pizzas" className="p-3  w-full h-screen element font-nunito">
			<h1 className="text-center  p-1 text-2xl font-extrabold">Nuestras Pizzas</h1>
			<div className="flex justify-center h-32 items-center w-full gap-10">
				<div className="text-center h-28 w-auto flex flex-col justify-between ">
					<div className="h-24  flex justify-center items-center ">
						<Image src={"/images/pizza-vector-negro.png"} width={60} height={60} />
					</div>
					<p className="font-bold text-lg">Gigante</p>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/pizza-vector-negro.png"} width={55} height={55} />
					</div>
					<p className="font-bold text-lg">Mediana</p>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/pizza-vector-negro.png"} width={50} height={50} />
					</div>
					<p className="font-bold text-lg">Chica</p>
				</div>
			</div>
			<div
				className="bg-black p-3 bg-opacity-80 w-full text-white grid grid-cols-2 gap-2 content-center py-7
			"
			>
				{pizzas?.map(producto => {
					return (
						<div key={producto.id}>
							<p className="text-white text-center">{producto.nombre}</p>
						</div>
					);
				})}
				<p className="text-white text-center">Muzzarella con Albahaca</p>
				<p className="text-white text-center">Muzzarella con Provenzal</p>
				<p className="text-white text-center">Muzzarella Doble</p>
				<p className="text-white text-center">Muzzarella con Huevo</p>
				<p className="text-white text-center">Muzzarella con Anchoas</p>
				<p className="text-white text-center">Napolitana con Jamon</p>
				<p className="text-white text-center">Super Napolitana</p>
				<p className="text-white text-center">Jamon y Huevo</p>
				<p className="text-white text-center">Jamon y Anana</p>
				<p className="text-white text-center">Roquefort y Jamon</p>
				<p className="text-white text-center">Calabresa</p>
				<p className="text-white text-center">Palmitos</p>
				<p className="text-white text-center">Palmitos con Jamon</p>
				<p className="text-white text-center">Palmitos Canavaro</p>
				<p className="text-white text-center">Panceta y Provolone</p>
				<p className="text-white text-center">Panceta con Huevo</p>
				<p className="text-white text-center">Panceta con Cheddar</p>
				<p className="text-white text-center">Crudo y Rucula</p>
				<p className="text-white text-center">4 Quesos</p>
				<p className="text-white text-center">Vegetariana</p>
			</div>
		</Element>
	);
}
