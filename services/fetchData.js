import axios from "axios";

export const getProducts = async () => {
	const { DEV_URL, PROD_URL, NODE_ENV } = process.env;

	try {
		const response = await fetch(`${NODE_ENV === "production" ? PROD_URL : DEV_URL}/api/products`);
		if (!response.ok) {
			throw new Error("Error al obtener los productos");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getProductId = async id => {
	try {
		const response = await axios.get(`/api/products/${id}`);
		console.log(response);
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const pedidos = [
	{
		"_id": 1,
		"cliente": "Leonel Messi",
		"direccion": "Av. maipu 3627 4°A, Olivos",
		"tipoEnvio": "Envio a domicilio",
		"medioPago": "Efectivo",
		"tiempoDemora": "45 - 55min.",
		"horaPedido": "21:54hs.",
		"precioTotal": 7300,
		"productos": [
			{ "id": 1, "nombre": "Muzzarella", "tamanio": "gigante", "categoria": "pizzas", "cantidad": 2, "precio": 4400 },

			{ "id": 2, "nombre": "Combo 1", "tamanio": "gigante", "categoria": "promociones", "cantidad": 1, "precio": 2900 },
		],
	},

	{
		"_id": 2,
		"cliente": "Martin Palermo",
		"direccion": "Gutierrez 2458, Olivos",
		"tipoEnvio": "Retira por local",
		"medioPago": "Mercado Pago",
		"tiempoDemora": "25 - 35min.",
		"horaPedido": "22:28hs.",
		"precioTotal": 2400,
		"productos": [
			{ "id": 1, "nombre": "muzzarella y jamon", "cantidad": 3, "categoria": "empanadas", "precio": 600 },
			{ "id": 2, "nombre": "fugazzeta", "categoria": "empanadas", "cantidad": 3, "precio": 600 },
			{ "id": 3, "nombre": "panceta y cheddar", "categoria": "empanadas", "cantidad": 3, "precio": 600 },
			{ "id": 4, "nombre": "carne cuchillo", "categoria": "empanadas", "cantidad": 3, "precio": 600 },
		],
	},
];
