import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiChevronsLeft } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Checkout() {
	const { direccion } = useSelector(state => state.user);
	const [type, setType] = useState("efectivo");

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
					<h2 className="font-nunito font-extrabold text-base">Direccion de entrega</h2>
					<p> {direccion}</p>
				</div>
				<div className="py-2">
					<input
						type="text"
						className="border border-slate-300 rounded-md w-full p-2"
						placeholder="Instrucciones de entrega"
					/>
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
							onClick={() => setType("tarjeta")}
							className={
								type === "tarjeta"
									? "w-1/3 rounded-md flex items-center justify-center gap-2 bg-slate-800 text-white font-light p-3"
									: "w-1/3 rounded-md   text-slate-500 border border-slate-300 font-light p-3"
							}
						>
							Tarjeta
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
					<p className="font-semibold">Subtotal</p>
					<h3 className="text-xl">$ 3400</h3>
				</div>

				<div className="px-3 w-full">
					<button className="text-center rounded-md w-full p-4 text-white font-semibold bg-red-600">
						Confirmar pedido
					</button>
				</div>
			</div>
		</div>
	);
}
