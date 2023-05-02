import Image from "next/image";
import { Element } from "react-scroll";
import Modal from "components/modal";
import { useState } from "react";

export default function sectionEmpanadas() {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};
	return (
		<Element name="empanadas" className="p-3 w-full  element font-nunito">
			<Modal show={showModal} handleClose={handleCloseModal}>
				<p className="text-lg font-semibold">Contenido del modal</p>
			</Modal>
			<h1 className="text-center p-3 text-2xl font-extrabold">Empanadas y Canastitas</h1>
			<div className="flex justify-center h-32 items-center w-full gap-10">
				<div className="text-center h-28 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/empanada.png"} width={90} height={75} />
					</div>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between ">
					<div className="h-24  flex justify-center items-center ">
						<Image src={"/images/canastita.png"} width={90} height={90} />
					</div>
				</div>
			</div>
			<div className="bg-black p-2 bg-opacity-80 w-full lg:w-4/5 mx-auto text-white grid grid-cols-2 gap-2 content-center ">
				<p className="italic col-span-2 text-white text-center text-xs py-3">
					* Hacer click sobre el titulo para ver descripcion.
				</p>
				<h1 className="col-span-2 font-bold text-lg text-center">Canastitas</h1>
				<p onClick={handleOpenModal} className="cursor-pointer text-white text-center">
					Panceta y Cheddar
				</p>
				<p className="text-white text-center">Panceta y Provolone</p>
				<p className="text-white text-center">Jamon y Muzzarella</p>
				<p className="text-white text-center">Provolone</p>
				<p className="text-white text-center">Roquefort y Jamon</p>
				<p className="text-white text-center">Palmitos y Jamon</p>
				<p className="text-white text-center">Jamon y Morron</p>
				<p className="text-white text-center">Jamon y Anana</p>
				<p className="text-white text-center">Jamon y Huevo</p>
				<p className="text-white text-center">Napolitana</p>
				<p className="text-white text-center">Super Napo</p>
				<p className="text-white text-center">Calabresa</p>
				<p className="text-white text-center">Panceta</p>
				<p className="text-white text-center">Panceta y Ciruela</p>
				<p className="text-white text-center">Verdura</p>
				<p className="text-white text-center">Verdeo</p>
				<p className="text-white text-center">Verdeo y Provolone</p>
				<p className="text-white text-center">Zapallo</p>
				<p className="text-white text-center">Fugazzeta</p>
				<p className="text-white text-center">Caprese</p>
				<p className="text-white text-center">Humita</p>
				<p className="text-white text-center">Anchoas</p>
				<p className="text-white text-center">4 Quesos</p>
				<p className="text-white text-center">Crudo y Rucula</p>
				<p className="text-white text-center">Champignones</p>
				<p className="text-white text-center">Pizzita</p>
				<h1 className="col-span-2 font-bold text-lg text-center">Empanadas</h1>
				<p className="text-white text-center">Santiagueña</p>
				<p className="text-white text-center">Mendocina</p>
				<p className="text-white text-center">Tucumana</p>
				<p className="text-white text-center">Pollo</p>
				<h1 className="col-span-2 font-bold text-lg text-center">Empanadas Fritas</h1>
				<p className="text-white text-center">Carne Picada</p>
				<p className="text-white text-center">Pollo</p>
				<p className="col-span-2 text-white text-center">Jamon y Muzzarella</p>
			</div>
		</Element>
	);
}
