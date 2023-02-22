/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import CardPromotion from "components/cardPromotion";

import Layout from "components/layout";
import { useSelector } from "react-redux";
import { wrapper } from "store/app/store";
import { getProducts } from "services/fetchData";
import { setProductData } from "store/reducers/productSlice";
import Card from "components/Card";

export default function Home() {
	const [renderProducts, setRenderProductos] = useState("pizzas");
	const { nombre } = useSelector(state => state.user);
	const { products } = useSelector(state => state.product);

	const renderPromotions = () => {
		// eslint-disable-next-line dot-notation
		return products["promociones"]?.map(data => <CardPromotion key={data.id} data={data} />);
	};

	const renderStore = renderProductos => {
		return products[`${renderProductos}`]?.map(data => <Card key={data.id} data={data} />);
	};

	return (
		<Layout title={nombre}>
			<div className=" p-4 mt-14 mx-auto w-full bg-zinc-50 ">
				<h1 className="text-sm font-bold text-gray-800 py-2">Promociones</h1>
				<hr className="pb-5" />
				<div className="flex overflow-x-scroll flexp   space-x-6 w-full pt-1 pb-4 pl-1">
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
				<div className="flex justify-center items-center w-full gap-3 py-6 text-sm f">
					<button
						onClick={() => setRenderProductos("pizzas")}
						className={
							renderProducts !== "pizzas"
								? "w-32 rounded-3xl font-medium"
								: "w-32 font-medium bg-gray-300 text-white rounded-3xl"
						}
					>
						Pizzas
					</button>
					<button
						onClick={() => setRenderProductos("empanadas")}
						className={
							renderProducts !== "empanadas"
								? "w-32 rounded-3xl font-medium"
								: "w-32 font-medium bg-gray-300 text-white rounded-3xl"
						}
					>
						Empanadas
					</button>
					<button
						onClick={() => setRenderProductos("promociones")}
						className={
							renderProducts !== "promociones"
								? "w-32 rounded-3xl font-medium"
								: "w-32 font-medium bg-gray-300 text-white rounded-3xl"
						}
					>
						Promociones
					</button>
				</div>

				<div>
					<h1 className="text-sm font-bold text-gray-800 py-2">
						{renderProducts[0].toUpperCase() + renderProducts.substring(1)}
					</h1>
					<hr className="py-2" />
					<div className="grid md:grid-cols-2 lg:grid-cols-2 gap-2">{renderStore(renderProducts)}</div>
				</div>
			</div>
		</Layout>
	);
}

export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
	const res = getProducts;
	store.dispatch(setProductData(res));
});
