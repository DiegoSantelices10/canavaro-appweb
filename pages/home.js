/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import CardPromotion from "components/cardPromotion";

import Layout from "components/layout";
import { useSelector, useDispatch } from "react-redux";
// import { wrapper } from "store/app/store";
import { getProducts } from "services/fetchData";
import { setProductData } from "store/reducers/productSlice";
import Card from "components/Card";
import { ToastContainer } from "react-toastify";

import { TbPlayerTrackNext } from "react-icons/tb";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function Home() {
	const [renderProducts, setRenderProductos] = useState("pizzas");
	const [totalPrice, setTotalPrice] = useState(0);
	const { nombre } = useSelector(state => state.user);
	const { products } = useSelector(state => state.product);
	const { orderPromo } = useSelector(state => state.order);

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
		console.log(totalPrice);
		calculateEmpanadas();
	}, [orderPromo]);

	const calculateEmpanadas = () => {
		const array = [];
		let cantidadTotal = 0;
		orderPromo.map(item => {
			const { precio, cantidad } = item;
			const listItemAmount = precio * cantidad;
			cantidadTotal = cantidadTotal + cantidad;
			return array.push(listItemAmount);
		});

		const totalAmount = array.reduce((a, b) => {
			return a + b;
		}, 0);

		if (cantidadTotal % 12 === 0) {
			const descuento = totalPrice * 0.1;
			const totalDescuento = totalAmount - descuento;
			const totalRedondeado = Math.ceil(totalDescuento / 100) * 100;
			console.log(totalRedondeado);
		}

		console.log(totalAmount);
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
					<Link href={"/pizzaFree"}>
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
				<div className="bg-white w-full fixed bottom-0 p-4  sm:w-4/5 md:w-3/5 lg:w-2/5">
					<button
						className="flex justify-center gap-3 text-center rounded-md w-full p-4 bg-red-600 hover:bg-red-500 hover:-translate-y-1 
						transition-all duration-500 text-white text-base font-semibold "
					>
						Agregar al Carrito
						<FiShoppingCart size={23} />{" "}
					</button>
				</div>
			</div>
		</Layout>
	);
}

// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
// 	const res = getProducts;
// 	store.dispatch(setProductData(res));
// });
