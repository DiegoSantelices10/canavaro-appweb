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

export async function getStaticPaths() {
	const productos = await getProducts();
	const res = await getPathsFromTitle(productos);
	return {
		paths: res,
		fallback: false,
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
