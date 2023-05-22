/* eslint-disable react/prop-types */
import { getItemData, getPathsFromTitle } from "libs/items";
import ProductLayout from "components/productLayout";
import getProducts from "services/fetchData";

export default function Product({ productInfo: { data } }) {
	return (
		<div className="min-h-screen ">
			<ProductLayout key={data._id} data={data} />
		</div>
	);
}
export function getDatosFromLocalStorage() {
	if (typeof window !== "undefined") {
		const datos = localStorage.getItem("datos");
		return datos ? JSON.parse(datos) : [];
	}
	return [];
}

export async function getStaticPaths() {
	const productos = await getProducts();
	const res = await getPathsFromTitle(productos);
	return {
		paths: res,
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const productos = await getProducts();
	const id = params.id;
	const obj = await getItemData(id, productos);
	const productInfo = Object.assign({}, obj);
	return {
		props: {
			id,
			productInfo,
		},
	};
}
