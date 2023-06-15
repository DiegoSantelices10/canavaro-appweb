/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import CardPromotion from "components/cardPromotion";
import Layout from "components/layout";
import { useSelector, useDispatch } from "react-redux";
import Card from "components/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import {
	addPromoOrderList,
	calculateSubTotal,
	calculateTotalQuantity,
	clearOrderPromo,
} from "store/reducers/orderSlice";

import { v4 as uuidv4 } from "uuid";
import { setProductData } from "store/reducers/productSlice";

export default function Home() {
	const [renderProducts, setRenderProductos] = useState("empanadas");
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalCant, setTotalCant] = useState(0);
	const [docenaPrice, setDocenaPrice] = useState(0);

	const { nombre } = useSelector(state => state.user);
	const { products } = useSelector(state => state.product);
	const { orderPromo } = useSelector(state => state.order);

	const idGenerator = uuidv4();

	const dispatch = useDispatch();
	const renderPromotions = () => {
		// eslint-disable-next-line dot-notation
		return products
			?.filter(item => item.categoria === "promociones" && item.available === true)
			.map(data => <CardPromotion key={data._id} data={data} />);
	};

	const renderStore = renderProductos => {
		return products
			?.filter(item => item.categoria === renderProductos && item.available === true)
			.map(data => <Card key={data._id} data={data} />);
	};

	useEffect(() => {
		if (orderPromo !== null) {
			calculateEmpanadas();
		}
	}, [orderPromo]);

	useEffect(() => {
		if (products?.length <= 0) {
			const res = JSON.parse(localStorage.getItem("productos"));
			dispatch(setProductData(res));
		}
	}, []);

	const calculateEmpanadas = () => {
		const requiredQuantity = 12;
		let priceU;
		const array = [];
		let cantidadTotal = 0;

		if (orderPromo.length > 0) {
			orderPromo.map(({ cantidad, precio }) => {
				priceU = precio;
				const listItemAmount = precio * cantidad;
				cantidadTotal = cantidadTotal + cantidad;
				setTotalCant(cantidadTotal);
				return array.push(listItemAmount);
			});
		} else {
			setTotalCant(0);
		}

		const totalAmount = array.reduce((a, b) => {
			return a + b;
		}, 0);

		if (cantidadTotal < requiredQuantity) return setTotalPrice(totalAmount);

		if (cantidadTotal === requiredQuantity && cantidadTotal % requiredQuantity === 0)
			setDocenaPrice(totalPrice);

		if (cantidadTotal > requiredQuantity && cantidadTotal % requiredQuantity !== 0) {
			const cociente = Math.floor(cantidadTotal / requiredQuantity);
			const result = cociente * docenaPrice;
			const resto = cantidadTotal % requiredQuantity;
			const total = result + resto * priceU;
			setTotalPrice(total);
		}

		if (cantidadTotal % requiredQuantity === 0) {
			const totalDescuento = totalAmount - totalAmount * 0.1;
			const totalRedondeado = Math.ceil(totalDescuento / 100) * 100;
			setTotalPrice(totalRedondeado);
		}
	};

	const addCartPromo = value => {
		const res = value.find(item => item.categoria === "bebidas");

		if (res) {
			setTotalCant(0);
			value.map(item => dispatch(addPromoOrderList({ ...item })));

			toast.error("Se agrego al carrito!", {
				icon: false,
				theme: "dark",
			});
			dispatch(clearOrderPromo());
			dispatch(calculateSubTotal());
			dispatch(calculateTotalQuantity());
			return;
		}
		const result = {
			_id: idGenerator,
			nombre: "Empanadas a eleccion",
			products: [...value],
			cantidad: 1,
			cant: totalCant,
			precio: totalPrice,
		};
		setTotalCant(0);
		dispatch(addPromoOrderList(result));
		toast.error("Se agrego al carrito!", {
			icon: false,
			theme: "dark",
		});
		dispatch(clearOrderPromo());
		dispatch(calculateSubTotal());
		dispatch(calculateTotalQuantity());
	};
	const clearTotal = () => {
		dispatch(clearOrderPromo());

		setTotalCant(0);
		setTotalPrice(0);
	};

	return (
		<Layout title={nombre}>
			<ToastContainer />
			<div className="py-4 mt-14 mx-auto w-full ">
				<h1 className="text-lg  font-extrabold text-gray-800 px-3 pb-1">Promociones</h1>
				<hr className="pb-3" />
				<div className="flex overflow-x-scroll flexp h-60   space-x-6 w-full p-3">
					<style jsx>
						{`
							.flexp::-webkit-scrollbar-thumb {
								background: #e4e4e4;
								border-radius: 20px;
							}

							.flexp::-webkit-scrollbar {
								height: 5px;
							}
						`}
					</style>
					{renderPromotions()}
				</div>
				<div className="my-5">
					<div className="w-full bg-red-500 p-2 flex items-center justify-between">
						<p className="text-white font-nunito  font-extrabold">
							¡ ARMA TU PIZZA COMO QUIERAS !
						</p>
						<Link href={"/order/pizzaFree"}>
							<a className="rounded-md font-bold bg-white p-2 text-xs px-3">
								INGRESA AQUI
							</a>
						</Link>
					</div>
				</div>
				<div className="flex overflow-x-scroll flexp justify-between space-x-2 w-full p-2 my-2">
					<style jsx>
						{`
							.flexp::-webkit-scrollbar-thumb {
								background: #ffffff;
								border-radius: 20px;
							}

							.flexp::-webkit-scrollbar {
								height: 0px;
							}
						`}
					</style>
					<div>
						<button
							onClick={() => {
								setRenderProductos("empanadas");
								clearTotal();
							}}
							className={
								renderProducts !== "empanadas"
									? "w-52 rounded-3xl font-semibold text-gray-400"
									: "w-52 font-bold bg-gray-300 text-white rounded-3xl"
							}
						>
							Canastitas & Empanadas
						</button>
					</div>
					<div>
						<button
							onClick={() => setRenderProductos("pizzas")}
							className={
								renderProducts !== "pizzas"
									? "w-32 rounded-3xl font-semibold text-gray-400"
									: "w-32 font-bold bg-gray-300 text-white rounded-3xl"
							}
						>
							Pizzas
						</button>
					</div>

					<div>
						<button
							onClick={() => setRenderProductos("promociones")}
							className={
								renderProducts !== "promociones"
									? "w-32 rounded-3xl font-semibold text-gray-400"
									: "w-32 font-bold bg-gray-300 text-white rounded-3xl"
							}
						>
							Promociones
						</button>
					</div>
					<div>
						<button
							onClick={() => {
								setRenderProductos("bebidas");
								clearTotal();
							}}
							className={
								renderProducts !== "bebidas"
									? "w-32 rounded-3xl font-semibold text-gray-400"
									: "w-32 font-bold bg-gray-300 text-white rounded-3xl"
							}
						>
							Bebidas
						</button>
					</div>
				</div>

				<div>
					<h1 className="text-lg  font-extrabold text-gray-800 px-3 pb-1">
						{renderProducts[0].toUpperCase() + renderProducts.substring(1)}
					</h1>
					<hr className="pb-3" />
					<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-1 mb-16">
						{renderStore(renderProducts)}
					</div>
				</div>
				{(renderProducts === "empanadas" || renderProducts === "bebidas") && (
					<div className="bg-white w-full fixed bottom-0 p-3  sm:w-4/5 md:w-4/5 lg:w-3/5">
						<div
							className="flex justify-between items-center gap-3 mx-auto text-center rounded-md 
									   w-full md:w-1/2 lg:w-3/5 p-3 bg-red-500 text-white text-base font-semibold "
						>
							<button
								onClick={() => addCartPromo(orderPromo)}
								className={`${
									orderPromo.length < 1
										? "invisible"
										: "p-3 font-bold bg-slate-50 rounded-md text-black text-xs hover:-translate-y-1 transition-all duration-500"
								}`}
							>
								AGREGAR AL CARRITO
							</button>

							<div className="flex items-center gap-x-5 text-white font-semibold">
								<p className="font-semibold text-xl">$ {totalPrice}</p>
								<div className=" h-10 w-10 rounded-full bg-white flex justify-center items-center">
									<p className="text-red-500 text-lg font-bold">{totalCant}</p>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</Layout>
	);
}
