import Modal from "components/modal";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Element } from "react-scroll";
export default function sectionCombos() {
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
		<Element name="combos" className="p-3 w-full  element">
			{currentProducto !== null && (
				<Modal key={currentProducto._id} showModal={showModal} handleClose={handleCloseModal} producto={currentProducto}>
					{currentProducto}
				</Modal>
			)}
			<h1 className="text-center p-3 text-2xl lg:text-3xl font-extrabold">Nuestros Combos</h1>
			<div className="flex justify-center h-32 items-center w-full gap-10">
				<div className="text-center h-28 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/empanada.png"} width={90} height={75} alt="empanada" />
					</div>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between ">
					<div className="h-24  flex justify-center items-center ">
						<Image src={"/images/pizza-vector-negro.png"} width={70} height={70} alt="pizza" />
					</div>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between ">
					<div className="h-24  flex justify-center items-center ">
						<Image src={"/images/canastita.png"} width={90} height={90} alt="canastita" />
					</div>
				</div>
			</div>
			<div className="bg-black bg-opacity-80 w-full lg:w-4/5 mx-auto text-white block md:grid md:grid-cols-3   py-2 pt-4 ">
				<p className="italic col-span-3 text-white text-center text-xs pb-2">* Hacer click sobre el titulo para ver descripcion.</p>

				{products
					?.filter(item => item.nombre.includes("Combo"))
					.map(producto => {
						return (
							<div key={producto._id} className="text-center my-10">
								<p
									onClick={() => handleOpenModal(producto)}
									className="w-1/2 col-span-3 md:text-3xl text-xl font-bold cursor-pointer text-white text-center  md:w-3/5 mx-auto rounded-md hover:bg-slate-50 hover:text-neutral-900 transition-colors duration-500"
								>
									{producto.nombre}
								</p>
								<p className="text-sm ">Pizza {producto.tamanio.charAt(0).toUpperCase() + producto.tamanio.slice(1)}</p>
								<p className="text-sm lg:text-md px-8">{producto.descripcion}</p>
							</div>
						);
					})}
			</div>
		</Element>
	);
}
