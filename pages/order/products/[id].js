/* eslint-disable react/prop-types */

import ProductLayout from "components/productLayout";
import { convertToPath } from "libs/items";
import { getProducts } from "services/fetchData";

export default function Product({ data }) {
	return (
		<div className="min-h-screen ">
			<ProductLayout key={data._id} data={data} />
		</div>
	);
}

export async function getServerSideProps({ query }) {
	const productos = await getProducts();
	const id = query.id;
	const data = await productos.find(item => convertToPath(item.nombre) === id);
	return {
		props: {
			id,
			data,
		},
	};
}
