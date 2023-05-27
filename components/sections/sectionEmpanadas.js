import Image from "next/image";
import { Element } from "react-scroll";
import Modal from "components/modal";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SectionEmpanadas() {
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
		<Element name="empanadas" className="p-3 w-full  element font-nunito">
			{currentProducto !== null && (
				<Modal key={currentProducto._id} showModal={showModal} handleClose={handleCloseModal} producto={currentProducto}>
					{currentProducto}
				</Modal>
			)}
			<h1 className="text-center p-3 text-2xl font-extrabold">Empanadas y Canastitas</h1>
			<div className="flex justify-center h-32 items-center w-full gap-10">
				<div className="text-center h-28 w-auto flex flex-col justify-between">
					<div className="h-24 flex justify-center items-center">
						<Image src={"/images/empanada.png"} width={90} height={75} alt="empanadas" />
					</div>
				</div>
				<div className="text-center h-28 w-auto flex flex-col justify-between ">
					<div className="h-24  flex justify-center items-center ">
						<Image src={"/images/canastita.png"} width={90} height={90} alt="canastitas" />
					</div>
				</div>
			</div>
			<div className="bg-black p-2 bg-opacity-80 w-full lg:w-4/5 mx-auto text-white grid grid-cols-2 gap-2 content-center py-8">
				<p className="italic col-span-2 text-white text-center text-xs py-4">* Hacer click sobre el titulo para ver descripcion.</p>
				<h1 className="col-span-2 font-bold text-xl text-center">Canastitas</h1>
				{products
					?.filter(item => item.categoria === "empanadas")
					.map(producto => {
						return (
							!producto.cerrada && (
								<div key={producto._id} className="w-auto">
									<p
										onClick={() => handleOpenModal(producto)}
										className=" cursor-pointer text-white text-center w-4/5 md:w-3/5 mx-auto rounded-md hover:bg-slate-50 hover:text-neutral-900 transition-colors duration-500"
									>
										{producto.nombre}
									</p>
								</div>
							)
						);
					})}

				<h1 className="col-span-2 font-bold text-xl text-center">Empanadas</h1>
				{products
					?.filter(item => item.categoria === "empanadas")
					.map(producto => {
						return (
							producto.cerrada === "si" && (
								<div key={producto._id} className="w-auto">
									<p
										onClick={() => handleOpenModal(producto)}
										className=" cursor-pointer text-white text-center w-4/5 md:w-3/5 mx-auto rounded-md hover:bg-slate-50 hover:text-neutral-900 transition-colors duration-500"
									>
										{producto.nombre}
									</p>
								</div>
							)
						);
					})}
			</div>
		</Element>
	);
}
