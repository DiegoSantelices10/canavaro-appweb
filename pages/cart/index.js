import Link from "next/link";
import { FiChevronsLeft, FiEdit } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdOutlineEmojiPeople } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Cart() {
	const { orderList, totalAmount } = useSelector(state => state.order);
	const [order, setOrder] = useState([]);
	const [type, setType] = useState("delivery");

	useEffect(() => {
		setOrder(orderList);
	}, [orderList]);

	return (
		<div className="font-poppins mx-auto w-full h-full  rounded-t-3xl py-4">
			<div className="px-3">
				<div className="flex items-center gap-3 py-4">
					<Link href={"/home"}>
						<a>
							<FiChevronsLeft className=" text-slate-800 bg-slate-50 rounded-full p-1 top-4 left-4" size={30} />
						</a>
					</Link>
					<h2 className="font-poppins font-semibold text-base">Tu pedido</h2>
				</div>
				<div>
					<div className="px-2 rounded-lg border-2 border-gray-200">
						<div className="flex justify-center   w-full gap-3 py-3 text-sm f">
							<button
								onClick={() => setType("retiro")}
								className={
									type === "retiro"
										? "w-1/2 rounded-md flex items-center justify-center gap-2 bg-slate-800 text-white font-light p-3"
										: "w-1/2 rounded-md flex items-center justify-center gap-2 bg-gray-300 text-white font-light p-3"
								}
							>
								<MdOutlineDeliveryDining size={20} />
								Delivery
							</button>
							<button
								onClick={() => setType("delivery")}
								className={
									type === "delivery"
										? "w-1/2 rounded-md flex items-center justify-center gap-2 bg-slate-800 text-white font-light p-3"
										: "w-1/2 rounded-md flex items-center justify-center gap-2 bg-gray-300 text-white font-light p-3"
								}
							>
								<MdOutlineEmojiPeople size={20} />
								Retiro
							</button>
						</div>
						<div className="flex flex-col justify-center items-center gap-2">
							{type !== "delivery" && (
								<input
									type="text"
									className="border border-slate-300 rounded-md w-full p-2"
									placeholder="Ingresa tu direccion"
								/>
							)}
							<h1 className="font-light">Te llega en</h1>
							<strong>45 - 60 min</strong>
						</div>
					</div>
				</div>
			</div>
			<div className="py-4 w-full">
				<hr className="py-1 bg-gray-200" />
			</div>
			{order.map(item => {
				return (
					<div key={item.id}>
						<div className="mb-2 p-3  bg-white">
							<div className="flex justify-between items-center gap-x-2">
								<div className="w-full self-start">
									<a className="font-semibold text-sm text-gray-800">
										{item.nombre}
										<span className="text-gray-400 font-light"> x {item.cantidad}</span>
									</a>
									<p className="text-gray-400 text-xs">
										{item.descripcion || item.tamanio.charAt(0).toUpperCase() + item.tamanio.slice(1)}
									</p>
									<p className="font-semibold text-sm text-gray-800">$ {item.precio * item.cantidad}</p>
								</div>
								<FiEdit size={30} className="text-red-700" />
							</div>
						</div>
						<hr />
					</div>
				);
			})}

			<div className="fixed bottom-1 w-full bg-white">
				<div className="flex justify-between items-center p-3">
					<p className="font-semibold">Subtotal</p>
					<h3 className="text-xl">$ {totalAmount}</h3>
				</div>
				<div className="px-3 w-full">
					<button className="text-center rounded-md w-full p-4 text-white font-semibold bg-red-600">
						Continuar con el pago
					</button>
				</div>
			</div>
		</div>
	);
}
