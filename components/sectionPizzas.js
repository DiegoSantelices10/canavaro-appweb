import React from "react";
import { Element } from "react-scroll";
import Image from "next/image";

export default function sectionPizza() {
	return (
		<Element name="pizzas" className="p-3 text-white w-full h-screen element font-nunito">
			<h1 className="text-center p-3 text-2xl font-semibold">Nuestras Pizzas</h1>

			<div className="flex justify-center h-32 items-center w-full gap-10">
				<div className="text-center h-32 w-auto flex flex-col justify-between ">
					<div className="h-24  flex justify-center items-center">
						<Image src={"/images/pizza-vector.png"} width={60} height={60} />
					</div>
					<p className="font-semibold text-base">Gigante</p>
				</div>
				<div className="text-center h-32 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/pizza-vector.png"} width={55} height={55} />
					</div>
					<p className="font-semibold text-base">Mediana</p>
				</div>
				<div className="text-center h-32 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/pizza-vector.png"} width={50} height={50} />
					</div>
					<p className="font-semibold text-base">Chica</p>
				</div>
			</div>
		</Element>
	);
}
