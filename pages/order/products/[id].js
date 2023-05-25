/* eslint-disable react/prop-types */

import ProductLayout from "components/productLayout";
import getProducts from "services/fetchData";

export default function Product({ data }) {
	console.log(data);
	return (
		<div className="min-h-screen ">
			<ProductLayout key={data._id} data={data} />
		</div>
	);
}

export async function getServerSideProps({ query }) {
	const productos = await getProducts();
	const id = query.id;
	const data = productos.find(item => item._id === id);
	return {
		props: {
			id,
			data,
		},
	};
}
