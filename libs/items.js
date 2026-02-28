export async function getPathsFromTitle(items) {
	return items.map(product => ({
		params: {
			id: convertToPath(product?.nombre),
		},
	}));
}

export async function getItemData(id, products) {
	const product = products?.find(e => e.id === id);
	return {
		id,
		data: product,
	};
}

export function convertToPath(title) {
	return title.toLowerCase().replace(/\s/g, "-");
}


export const formatearNumero = (numero) => {
	return numero?.toLocaleString('es-AR', {
		style: 'currency',
		currency: 'ARS',
		minimumFractionDigits: 0,
	});
};


export const totalExtrasProductos = (extras) => {
	if (!Array.isArray(extras)) return 0;
	return extras.reduce((total, item) => {
		const precioExtra = item?.precioExtra || 0;
		const cantidad = item?.cantidad || 0;
		return total + (precioExtra * cantidad);
	}, 0);
}