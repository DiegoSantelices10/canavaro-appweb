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
	return extras.reduce((total, empanada) => {
		if (empanada.precioExtra > 0 || empanada.precioExtra !== undefined) {
			return total + (empanada.precioExtra * empanada.cantidad);
		} else {
			return total;
		}
	}, 0);
}