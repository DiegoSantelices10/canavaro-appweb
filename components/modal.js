/* eslint-disable react/prop-types */
import Image from "next/image";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
// eslint-disable-next-line react/prop-types
const Modal = ({ handleClose, showModal, currentPedido }) => {
	const showHideClassName = showModal ? "fixed z-40 inset-0 overflow-y-auto" : "hidden";

	console.log("children", currentPedido);
	console.log("modal", showModal);
	return (
		<div className={showHideClassName}>
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div className="fixed inset-0 transition-opacity" aria-hidden="true">
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
					&#8203;
				</span>
				<div className="inline-block align-bottom w-full  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					{/* <div className="bg-black  bg-opacity-80 text-white font-nunito font-semibold px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="relative overflow-hidden h-full   mx-auto  ">
							{showModal && (
								<Image
									src={imagen?.url}
									layout="responsive"
									width={60}
									height={60}
									objectFit="cover"
									objectPosition="center"
									className="rounded-md"
									alt={nombre}
								/>
							)}

							<button onClick={handleClose}>
								<AiOutlineClose className="absolute text-slate-800 bg-slate-50 bg-opacity-40 rounded-full p-1 top-4 left-4" size={30} />
							</button>
						</div>
						<div className="w-full">
							<h2 className="text-xl">{nombre}</h2>
							<p className="font-light  text-sm text-gray-300 pb-3">{descripcion}</p>
							<div className="flex w-full justify-between font-normal gap-1">
								<p>Chica $ {precioPizza?.chica}</p> |<p>Mediana $ {precioPizza?.mediana}</p> |<p>Gigante $ {precioPizza?.gigante}</p>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default Modal;
