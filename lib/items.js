import { getProducts } from 'services/fetchData';

export async function getPathsFromTitle() {
	const items = await getProducts();

	return Object.values(items).map(item =>
		item.map(product => ({
			params: {
				id: convertToPath(product.nombre),
			},
		}))
	);
}

export async function getItemData(id, products) {
	const product = Object.values(products)
		.map(item => item.find(e => convertToPath(e.nombre) === id))
		.filter(i => i !== undefined);
	return {
		id,
		data: product,
	};
}

export function convertToPath(title) {
	return title.toLowerCase().replace(/\s/g, '-');
}
