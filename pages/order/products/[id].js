/* eslint-disable react/prop-types */
import { getItemData, getPathsFromTitle } from "libs/items";
import ProductLayout from "components/productLayout";

import { wrapper } from "store/app/store";

export default function Product({ productInfo: { data }, id }) {
	return (
		<div className="min-h-screen ">
			<ProductLayout key={data.id} data={data} idName={id} />
		</div>
	);
}

export const getStaticPaths = wrapper.getStaticProps(store => async () => {
	const productos = store.getState().product.products;
	const res = await getPathsFromTitle(productos);
	console.log("res", res);
	const paths = res;
	return {
		paths,
		fallback: false,
	};
});

export const getStaticProps = wrapper.getStaticProps(store => async ({ params }) => {
	const productos = store.getState().product.products;

	const id = params._id;
	const obj = await getItemData(id, productos);
	const productInfo = Object.assign({}, obj);
	return {
		props: {
			id,
			productInfo,
		},
	};
});
