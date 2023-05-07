/* eslint-disable react/prop-types */
import { getItemData, getPathsFromTitle } from "libs/items";
import ProductLayout from "components/productLayout";
import { productos } from "services/fetchData";
export default function Product({ productInfo: { data }, id }) {
	return (
		<div className="min-h-screen ">
			<ProductLayout key={data.id} data={data} idName={id} />
		</div>
	);
}

export async function getStaticPaths() {
	const res = await getPathsFromTitle(productos);
	console.log(res[0], res[1], res[2]);
	const paths = res;
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
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
