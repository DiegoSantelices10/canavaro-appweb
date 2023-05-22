export async function getPathsFromTitle(items) {
	return items.map(product => ({
		params: {
			id: convertToPath(product?.nombre),
		},
	}));
}

export async function getItemData(id, products) {
	const product = products?.find(e => convertToPath(e.nombre) === id);
	return {
		id,
		data: product,
	};
}

export function convertToPath(title) {
	return title.toLowerCase().replace(/\s/g, "-");
}
