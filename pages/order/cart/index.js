/* eslint-disable react/prop-types */
import Link from "next/link";
import { FiChevronsLeft } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdOutlineEmojiPeople, MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { calculateSubTotal, calculateTotalQuantity, removeItemCart } from "store/reducers/orderSlice";
import { addAddress } from "store/reducers/userSlice";
import axios from "axios";

export default function Cart({ data }) {
	const { orderList, totalAmount } = useSelector(state => state.order);
	const [order, setOrder] = useState([]);
	const [type, setType] = useState("domicilioActual");
	const [tipoDemora, setTipoDemora] = useState(null);

	const dispatch = useDispatch();

	useEffect(() => {
		setOrder(orderList);
		dispatch(calculateSubTotal());
		dispatch(calculateTotalQuantity());
	}, [dispatch, orderList]);

	useEffect(() => {
		const demo = data?.filter(item => item.tipo);
		setTipoDemora(demo);

		dispatch(addAddress(""));
	}, []);
	const deleteItem = _id => {
		dispatch(removeItemCart(_id));
	};

	const handleChange = e => {
		dispatch(addAddress(e.target.value));
	};

	const handleChangeType = type => {
		if (tipoDemora !== null) {
			const { demoraActual } = tipoDemora.find(item => item.tipo === type);
			return demoraActual;
		}
	};
	return (
		<div className="font-poppins mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 h-full  rounded-t-3xl py-4">
			<div className="px-3">
				<div className="flex items-center gap-3 py-4">
					<Link href={"/order/home"}>
						<a>
							<FiChevronsLeft className=" text-slate-800 bg-slate-50 rounded-full p-1 top-4 left-4" size={30} />
						</a>
					</Link>
					<h2 className="font-poppins font-extrabold text-lg">Tu pedido</h2>
				</div>
				<div>
					<div className="px-2 rounded-lg border-2 border-gray-200">
						<div className="flex justify-center  w-full gap-3 py-3 text-sm ">
							<button
								onClick={() => setType("domicilioActual")}
								className={
									type === "domicilioActual"
										? "w-1/2 rounded-md flex items-center justify-center gap-2 bg-slate-800 text-white font-light p-3"
										: "w-1/2 rounded-md flex items-center justify-center gap-2 bg-gray-300 text-white font-light p-3"
								}
							>
								<MdOutlineDeliveryDining size={20} />
								Delivery
							</button>
							<button
								onClick={() => setType("localActual")}
								className={
									type === "localActual"
										? "w-1/2 rounded-md flex items-center justify-center gap-2 bg-slate-800 text-white font-light p-3"
										: "w-1/2 rounded-md flex items-center justify-center gap-2 bg-gray-300 text-white font-light p-3"
								}
							>
								<MdOutlineEmojiPeople size={20} />
								Retiro
							</button>
						</div>
						<div className="flex flex-col justify-center items-center gap-2">
							{type === "domicilioActual" && (
								<input
									id="address"
									name="address"
									onChange={handleChange}
									type="text"
									className="border border-slate-300 rounded-md w-full p-2"
									placeholder="Ingresa tu direccion, Barrio"
								/>
							)}
							<h1 className="font-light">Te llega en</h1>
							<strong>{handleChangeType(type)}</strong>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-20">
				{order.map((item, index) => {
					return (
						<div key={index} className="font-nunito">
							<div className="mb-2 p-3  bg-white">
								<div className="flex justify-between items-center gap-x-2">
									<div className="w-full self-start">
										<a className="font-bold  text-gray-800">
											{item.nombre}
											<span className="text-gray-400 font-light"> x {item.cant ? item.cant : item.cantidad}</span>
										</a>
										<p className="text-gray-400 text-sm">
											{item?.descripcion || item?.tamanio?.charAt(0).toUpperCase() + item?.tamanio?.slice(1) || ""}
										</p>
										<p className="font-semibold text-sm text-gray-800">$ {item.precio * item.cantidad}</p>
									</div>
									<button onClick={() => deleteItem(item._id)}>
										<MdDeleteOutline size={30} className="text-red-700" />
									</button>
								</div>
							</div>
							<hr />
						</div>
					);
				})}
			</div>
			<div className="font-nunito fixed bottom-3 w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white">
				<div className="flex justify-between items-center p-3 font-poppins">
					<div>
						<p className="font-bold text-xl">Subtotal</p>
						<h3 className="text-xl">$ {totalAmount}</h3>
					</div>
					<Link href="/order/checkout">
						<a className="text-center font-nunito rounded-md w-auto p-4 text-white font-bold bg-red-600 hover:bg-red-500 hover:-translate-y-1 transition-all duration-500">
							Continuar el pago
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = async () => {
	const { DEV_URL, PROD_URL, NODE_ENV } = process.env;

	const { data } = await axios.get(`${NODE_ENV === "production" ? PROD_URL : DEV_URL}` + "/api/delay");
	// console.log("data", data);
	return {
		props: {
			// Pasa el estado hidratado como prop al componente de Next.js
			data,
		},
	};
};
