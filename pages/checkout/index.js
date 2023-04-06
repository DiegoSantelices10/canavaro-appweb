import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiChevronsLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setCheckout } from "store/reducers/orderSlice";

export default function Checkout() {
	const { direccion, nombre, telefono } = useSelector(state => state.user);
	const { totalAmount, orderList } = useSelector(state => state.order);

	const [orderToMake, setOrderToMake] = useState({});
	const [type, setType] = useState("efectivo");
	const [instructions, setInstructions] = useState("efectivo");

	const dispatch = useDispatch();

	useEffect(() => {
		if (direccion !== "") {
			setOrderToMake({
				nombre,
				telefono,
				enviar: direccion,
				comentarios: instructions,
				orderList,
				medioDePago: type,
				totalAmount,
			});
		} else {
			setOrderToMake({
				nombre,
				telefono,
				enviar: "Retira por local",
				orderList,
				medioDePago: type,
				totalAmount,
			});
		}
	}, [type]);

	const confirmedOrder = () => {
		dispatch(setCheckout(orderToMake));
	};

	const handleChange = e => {
		setInstructions(e.target.value);
	};

	return (
		<div className=" mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 h-full  rounded-t-3xl py-4">
			<div className="px-3">
				<div className="flex items-center gap-3 py-4">
					<Link href={"/cart"}>
						<a>
							<FiChevronsLeft className=" text-slate-800 bg-slate-50 rounded-full p-1 top-4 left-4" size={30} />
						</a>
					</Link>
					<h2 className="font-poppins font-extrabold text-lg">Tu pedido</h2>
				</div>
			</div>

			<div className="p-3 py-5">
				<div>
					{direccion ? (
						<>
							<h2 className="font-nunito font-extrabold text-base">Direccion de envio</h2>
							<p>{direccion} </p>
							<div className="py-2">
								<input
									onChange={handleChange}
									type="text"
									className="border border-slate-300 rounded-md w-full p-2"
									placeholder="Instrucciones de entrega"
								/>
							</div>
						</>
					) : (
						<>
							<h2 className="font-nunito font-extrabold text-base">Retira por local</h2>
							<p>Nombre: {nombre} </p>
						</>
					)}
				</div>
			</div>
			<hr />
			<div className="p-3 py-5">
				<h2 className="font-nunito font-extrabold text-base">Tiempo de entrega</h2>
				<p className="px-1"> 45 - 55 min</p>
			</div>
			<hr />
			<div className="p-3 py-5">
				<h2 className="font-nunito font-extrabold text-base">Medio de pago</h2>
				<div>
					<div className="flex justify-center  w-full gap-3 py-2 text-sm ">
						<button
							onClick={() => setType("efectivo")}
							className={
								type === "efectivo"
									? "w-1/3 rounded-md flex items-center justify-center gap-2 bg-slate-800 text-white font-light p-3"
									: "w-1/3 rounded-md   text-slate-500 border border-slate-300 font-light p-3"
							}
						>
							Efectivo
						</button>
						<button
							onClick={() => setType("mercadoPago")}
							className={
								type === "mercadoPago"
									? "w-1/3 rounded-md flex items-center justify-center gap-2 bg-slate-800 text-white font-light p-3"
									: "w-1/3 rounded-md   text-slate-500 border border-slate-300 font-light p-3"
							}
						>
							Mercado pago
						</button>
					</div>
					<div className="py-2">
						{type === "efectivo" && (
							<input
								id="efectivo"
								type="text"
								className="border border-slate-300 rounded-md w-full p-2"
								placeholder="Cuanto de cambio ?"
							/>
						)}
						{type === "mercadoPago" && (
							<div className="flex justify-center w-full">
								<Image src="/images/logoMP.jpg" width={100} height={100} />
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="fixed bottom-3 w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white">
				<div className="flex justify-between items-center p-3">
					<p className="text-lg font-semibold">Subtotal</p>
					<h3 className="text-xl font-bold">$ {totalAmount}</h3>
				</div>

				<div className="px-3 w-full">
					<button
						onClick={confirmedOrder}
						className="text-center rounded-md w-full p-4 text-white font-semibold bg-red-600"
					>
						Confirmar pedido
					</button>
				</div>
			</div>
		</div>
	);
}
