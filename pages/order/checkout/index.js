import axios from "axios";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { clearOrderList } from "store/reducers/orderSlice";
import moment from "moment-timezone";
export default function Checkout() {
	const user = useSelector(state => state.user);
	const { totalAmount, orderList, demora } = useSelector(state => state.order);

	const dispatch = useDispatch();
	const router = useRouter();

	return (
		<div className=" mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 h-full  rounded-t-3xl py-4">
			<div className="px-3">
				<div className="flex items-center gap-3 py-4">
					<Link href={"/order/cart"}>
						<a>
							<FiChevronsLeft
								className=" text-slate-800 bg-slate-50 rounded-full p-1 top-4 left-4"
								size={30}
							/>
						</a>
					</Link>
					<h2 className="font-poppins font-extrabold text-lg">Tu pedido</h2>
				</div>
			</div>

			<Formik
				initialValues={{
					cliente: user?.nombre || "",
					domicilio: user?.direccion || "",
					telefono: user?.telefono || "",
					productos: orderList || {},
					comentarios: "",
					medioDePago: "efectivo" || "",
					pagaCon: 0,
					total: totalAmount || "",
				}}
				onSubmit={async values => {
					const hora = moment.tz("America/Argentina/Buenos_Aires").format("HH:mm");

					if (values.domicilio !== "") {
						const res = await axios.post("/api/sales/", {
							...values,
							tipoEnvio: "Envio a domicilio",
							creado: hora,
							liberado: false,
						});
						if (res.data.message === "ok") {
							const response = await axios.post("/api/pusher", res.data.response);
							if (response.status === 200) {
								dispatch(clearOrderList());
								router.push("checkout/successful");
							}
						}
					} else {
						const res = await axios.post("/api/sales/", {
							...values,
							tipoEnvio: "Retira por local",
							creado: hora,
							liberado: false,
						});
						if (res.data.message === "ok") {
							const response = await axios.post("/api/pusher", res.data.response);
							if (response.status === 200) {
								dispatch(clearOrderList());
								router.push("checkout/successful");
							}
						}
					}
				}}
			>
				{({ values }) => {
					return (
						<div className="h-full">
							<Form>
								<div className="p-3 py-5">
									<div>
										{user.direccion !== "" ? (
											<>
												<h2 className="font-nunito font-extrabold text-base">
													Direccion de envio
												</h2>
												<p>{user.direccion} </p>
											</>
										) : (
											<>
												<h2 className="font-nunito font-extrabold text-base">
													Retira por local
												</h2>
												<p>Nombre: {user.nombre} </p>
											</>
										)}
									</div>
								</div>
								<hr />
								<div className="p-3 py-5">
									<h2 className="font-nunito font-extrabold text-base">
										{user.direccion !== "" ? "Tiempo de entrega" : "Retiralo en"}
									</h2>
									<p className="px-1">{demora}</p>
								</div>
								<hr />
								<div className="p-3 py-5">
									<h2 className="font-nunito font-extrabold text-base pb-1">
										Comentarios adicionales
									</h2>
									<Field
										id="comentarios"
										name="comentarios"
										className="border border-slate-300 rounded-md w-full p-2"
									/>
								</div>
								<div className="p-3 py-5 h-full">
									<h2 className="font-nunito font-extrabold text-base">Medio de pago</h2>
									<div>
										<div
											role="group"
											aria-labelledby="my-radio-group"
											className="w-full text-base  text-slate-400 flex justify-center items-center h-10 gap-10"
										>
											<label>
												<Field
													type="radio"
													name="medioDePago"
													value="efectivo"
													className="mx-5 p-2 rounded-md"
												/>
												Efectivo
											</label>
											<label>
												<Field
													type="radio"
													name="medioDePago"
													value="mercadoPago"
													className="mx-5 p-2 rounded-md"
												/>
												Mercado Pago
											</label>
										</div>
										<div className="py-2">
											{values.medioDePago === "efectivo" && (
												<Field
													id="pagaCon"
													name="pagaCon"
													className="border border-slate-300 rounded-md w-full p-2"
													placeholder="¿Con cuanto vas a pagar?"
												/>
											)}
											{values.medioDePago === "mercadoPago" && (
												<div className="flex justify-center w-full">
													<Image
														src="/images/logoMP.jpg"
														width={100}
														height={100}
														alt="logoMP"
													/>
												</div>
											)}
										</div>
									</div>
								</div>

								<div className="fixed bottom-3 w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white">
									<div className="flex justify-between items-center p-3 font-poppins">
										<p className="text-lg font-semibold">Subtotal</p>
										<h3 className="text-xl ">$ {totalAmount}</h3>
									</div>

									<div className="px-3 w-full">
										<button
											type="submit"
											className="text-center rounded-md w-full p-4 text-white font-bold bg-red-600 hover:bg-red-500 hover:-translate-y-1 transition-all duration-500"
										>
											Confirmar pedido
										</button>
									</div>
								</div>
							</Form>
						</div>
					);
				}}
			</Formik>
		</div>
	);
}
