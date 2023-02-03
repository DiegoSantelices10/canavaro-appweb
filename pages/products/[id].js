import { getItemData, getPathsFromTitle } from 'lib/items';
import React, { useEffect } from 'react';
import ProductLayout from 'components/productLayout';

export default function Product({ productInfo: { data }, id }) {
	return (
		<div className="min-h-screen ">
			{data.map(item => (
				<ProductLayout key={item.id} data={item} idName={id} />
			))}
		</div>
	);
}

export async function getStaticPaths() {
	const res = await getPathsFromTitle();
	const paths = res[0].concat(res[1], res[2]);
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const id = params.id;

	const obj = await getItemData(id);
	const productInfo = Object.assign({}, obj);
	return {
		props: {
			id,
			productInfo,
		},
	};
}
