
import { useState, useEffect } from "react";
import CardPromotion from "components/cardPromotion";
import Layout from "components/layout";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "services/fetchData";
import { setProductData } from "store/reducers/productSlice";
import Card from "components/Card";
import { ToastContainer } from "react-toastify";

import { TbPlayerTrackNext } from "react-icons/tb";
import Link from "next/link";
import {
	addPromoOrderList,
	calculateSubTotal,
	calculateTotalQuantity,
	clearOrderPromo,
} from "store/reducers/orderSlice";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
	const [renderProducts, setRenderProductos] = useState("pizzas");
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
		return products["promociones"]?.map(data => <CardPromotion key={data.id} data={data} />);
	};

	const renderStore = renderProductos => {
		return products[`${renderProductos}`]?.map(data => <Card key={data.id} data={data} />);
	};
	useEffect(() => {
		dispatch(setProductData(getProducts));
	}, []);

	useEffect(() => {
		calculateEmpanadas();
	}, [orderPromo]);

	const calculateEmpanadas = () => {
		const requiredQuantity = 12;
		let priceU;
		const array = [];
		let cantidadTotal = 0;
		orderPromo.map(item => {
			const { precio, cantidad } = item;
			priceU = precio;
			const listItemAmount = precio * cantidad;
			cantidadTotal = cantidadTotal + cantidad;
			setTotalCant(cantidadTotal);
			return array.push(listItemAmount);
		});

		const totalAmount = array.reduce((a, b) => {
			return a + b;
		}, 0);

		if (cantidadTotal < requiredQuantity) return setTotalPrice(totalAmount);

		if (cantidadTotal === requiredQuantity && cantidadTotal % requiredQuantity === 0) setDocenaPrice(totalPrice);

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
		const result = {
			id: idGenerator,
			nombre: "Empanadas a eleccion",
			products: { ...value },
			cantidad: 1,
			cant: totalCant,
			precio: totalPrice,
		};
		setTotalCant(0);
		dispatch(addPromoOrderList(result));
		dispatch(clearOrderPromo());
		dispatch(calculateSubTotal());
		dispatch(calculateTotalQuantity());
	};

	return (
		<Layout title={nombre}>
			<ToastContainer />
			<div className="py-4 mt-14 mx-auto w-full ">
				<h1 className="text-lg  font-extrabold text-gray-800 px-3 pb-1">Promociones</h1>
				<hr className="pb-3" />
				<div className="flex overflow-x-scroll flexp   space-x-6 w-full p-3">
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
				<div className="pt-5">
					<Link href={"/order/pizzaFree"}>
						<a>
							<div className="w-full bg-red-500 p-2 flex items-center justify-between">
								<TbPlayerTrackNext className="text-white" size={25} />
								<p className="text-white font-nunito italic font-black">¡ ARMA TU PIZZA COMO QUIERAS !</p>
								<TbPlayerTrackNext className="text-white" size={25} />
							</div>
						</a>
					</Link>
				</div>
				<div className="flex justify-center items-center w-full gap-3 py-6 text-sm ">
					<button
						onClick={() => setRenderProductos("pizzas")}
						className={
							renderProducts !== "pizzas"
								? "w-32 rounded-3xl font-medium text-gray-400"
								: "w-32 font-bold bg-gray-300 text-white rounded-3xl"
						}
					>
						Pizzas
					</button>
					<button
						onClick={() => setRenderProductos("empanadas")}
						className={
							renderProducts !== "empanadas"
								? "w-32 rounded-3xl font-medium text-gray-400"
								: "w-32 font-bold bg-gray-300 text-white rounded-3xl"
						}
					>
						Empanadas
					</button>
					<button
						onClick={() => setRenderProductos("promociones")}
						className={
							renderProducts !== "promociones"
								? "w-32 rounded-3xl font-medium text-gray-400"
								: "w-32 font-bold bg-gray-300 text-white rounded-3xl"
						}
					>
						Promociones
					</button>
				</div>

				<div>
					<h1 className="text-lg  font-extrabold text-gray-800 px-3 pb-1">
						{renderProducts[0].toUpperCase() + renderProducts.substring(1)}
					</h1>
					<hr className="pb-3" />
					<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-1">{renderStore(renderProducts)}</div>
				</div>
				{renderProducts === "empanadas" && (
					<div className="bg-white w-full fixed bottom-0 p-3  sm:w-4/5 md:w-4/5 lg:w-3/5">
						<button
							onClick={() => addCartPromo(orderPromo)}
							className="flex justify-between items-center gap-3 mx-auto text-center rounded-md 
									   w-full md:w-1/2 lg:w-1/2 p-3 bg-red-500 hover:bg-red-600 hover:-translate-y-1 
									   transition-all duration-500 text-white text-base font-semibold "
						>
						Agregar al Carrito
							
							<div className="flex items-center gap-x-5 text-white font-semibold">
								<p className="font-semibold text-xl">$ {totalPrice}</p>
								<div className=" h-10 w-10 rounded-full bg-white flex justify-center items-center">
									<p className="text-red-500 text-lg font-bold">{totalCant}</p>
								</div>
							</div>
						</button>
					</div>
				)}
			</div>
		</Layout>
	);
}