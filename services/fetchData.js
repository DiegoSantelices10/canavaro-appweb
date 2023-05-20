// import axios from "axios";

// const getProducts = async () => {
// 	const result = await axios.get(process.env.API_URL + "/api/items");
// 	console.dir(result, { depth: null });
// 	const convert = result.data;
// 	return convert;
// };

// export default getProducts;

export const pedidos = [
	{
		"id": 1,
		"cliente": "Leonel Messi",
		"direccion": "Av. maipu 3627 4°A, Olivos",
		"tipoEnvio": "Envio a domicilio",
		"medioPago": "Efectivo",
		"tiempoDemora": "45 - 55min.",
		"horaPedido": "21:54hs.",
		"precioTotal": 7300,
		"productos": [
			{
				"nombre": "Muzzarella",
				"tamanio": "gigante",
				"categoria": "pizzas",
				"cantidad": 2,
				"precio": 4400,
			},

			{
				"nombre": "Combo 1",
				"tamanio": "gigante",
				"categoria": "promociones",
				"cantidad": 1,
				"precio": 2900,
			},
		],
	},

	{
		"id": 2,
		"cliente": "Martin Palermo",
		"direccion": "Gutierrez 2458, Olivos",
		"tipoEnvio": "Retira por local",
		"medioPago": "Mercado Pago",
		"tiempoDemora": "25 - 35min.",
		"horaPedido": "22:28hs.",
		"precioTotal": 2400,
		"productos": [
			{
				"nombre": "muzzarella y jamon",
				"cantidad": 3,
				"categoria": "empanadas",
				"precio": 600,
			},
			{
				"nombre": "fugazzeta",
				"categoria": "empanadas",
				"cantidad": 3,
				"precio": 600,
			},
			{
				"nombre": "panceta y cheddar",
				"categoria": "empanadas",
				"cantidad": 3,
				"precio": 600,
			},
			{
				"nombre": "carne cuchillo",
				"categoria": "empanadas",
				"cantidad": 3,
				"precio": 600,
			},
		],
	},
];

export const productos = [
	{
		"id": 1,
		"nombre": "Muzzarella",
		"descripcion": "Muzzarella con aceitunas",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084210211_f3e458f01a_m.jpg",
		"precio": {
			"gigante": 1550,
			"mediana": 1280,
			"chica": 1100,
		},
	},
	{
		"id": 2,
		"nombre": "Jamon y Morrones",
		"descripcion": "Muzzarella, Jamon y Morron rojo",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084418617_4409f4484d_m.jpg",
		"precio": {
			"gigante": 2300,
			"mediana": 1700,
			"chica": 1500,
		},
	},
	{
		"id": 3,
		"nombre": "Napolitana con Jamon",
		"descripcion": "Muzzarella, Jamon, Tomate, Provolone y Provenzal",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084418322_0b46e97696_m.jpg",
		"precio": {
			"gigante": 1800,
			"mediana": 1500,
			"chica": 1200,
		},
	},
	{
		"id": 4,
		"nombre": "Panceta",
		"descripcion": "Muzzarella, Panceta y Provolone",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084210136_3d3cde77b7_m.jpg",
		"precio": {
			"gigante": 2200,
			"mediana": 1900,
			"chica": 1500,
		},
	},
	{
		"id": 5,
		"nombre": "Caprese",
		"descripcion": "Muzzarella, Tomate y Albahaca",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084418357_397e7e5ab5_m.jpg",
		"precio": {
			"gigante": 2100,
			"mediana": 1800,
			"chica": 1300,
		},
	},
	{
		"id": 6,
		"nombre": "Provolone Con Jamon",
		"descripcion": "Muzzarella, Jamon y provolone",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084418122_af641d871a_m.jpg",
		"precio": {
			"gigante": 2000,
			"mediana": 1700,
			"chica": 1300,
		},
	},
	{
		"id": 7,
		"nombre": "Provenzal",
		"descripcion": "Muzzarella y Provenzal",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084418242_b5503b8fdf_m.jpg",
		"precio": {
			"gigante": 1800,
			"mediana": 1590,
			"chica": 1299,
		},
	},
	{
		"id": 8,
		"nombre": "Fugazzeta",
		"descripcion": "Muzzarella, Cebolla y Provolone",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084419067_7d49c04d7b_m.jpg",
		"precio": {
			"gigante": 2400,
			"mediana": 1900,
			"chica": 1500,
		},
	},
	{
		"id": 9,
		"nombre": "Panceta con Verdeo",
		"descripcion": "Muzzarella, Panceta y Cebolla de Verdeo",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084210156_bf589452e3_m.jpg",
		"precio": {
			"gigante": 2000,
			"mediana": 1800,
			"chica": 1400,
		},
	},
	{
		"id": 10,
		"nombre": "Anchoas",
		"descripcion": "Muzzarella, Salsa de Tomate y Anchoas",
		"categoria": "pizzas",
		"imagen": "https://live.staticflickr.com/65535/49084419107_257f0d1190_m.jpg",
		"precio": {
			"gigante": 2200,
			"mediana": 1500,
			"chica": 1300,
		},
	},
	{
		"id": 11,
		"nombre": "Jamon y Muzzarella",
		"descripcion": "Muzzarella y Jamon",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/44a4bf9e7d787ba034e8a2781f13ab48/jamon_y_queso.jpg",
		"precio": 360,
	},
	{
		"id": 12,
		"nombre": "4 Quesos",
		"descripcion": "Muzzarella, Provolone, Roquefort y Parmesano",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/41be50161209cb17119d5e6c663ed141/cuatro_quesos.jpg",
		"precio": 360,
	},
	{
		"id": 13,
		"nombre": "Salchicha y Cheddar",
		"descripcion": "Muzzarella, Salchicha y Cheddar",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/52bcf7fad1b9fcf455c87758f9a8665f/salchicha3.jpg",
		"precio": 360,
	},
	{
		"id": 14,
		"nombre": "Humita",
		"descripcion": "Muzzarella, Choclo y Salsa Blanca",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/609e8327a9b6524178f65b8b/6be027176731a5976db5c8af7acbe9ed/choclo.jpg",
		"precio": 360,
	},
	{
		"id": 15,
		"nombre": "Calabaza",
		"descripcion": "Muzzarella, Pure de Calabaza y Parmesano",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/02d69229d55ed4219768b6f49c44ab4b/calabaza.jpg",
		"precio": 360,
	},
	{
		"id": 16,
		"nombre": "Provolone",
		"descripcion": "Muzzarella, Jamon y Provolone",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/6aee5e961d0161c8036be698c53c5f2d/provolone.jpg",
		"precio": 360,
	},
	{
		"id": 17,
		"nombre": "Pollo",
		"descripcion": "Pollo, Cebolla, Morron Rojo y Verde",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/53b0e793401d347e0896f0f629f3cbd3/pollo.jpg",
		"precio": 360,
	},
	{
		"id": 18,
		"nombre": "Roquefort",
		"descripcion": "Muzzarella, Jamon y Roquefort",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/0c3d2abc6a162dc634ab0b0361ea7bba/jamon_y_roque.jpg",
		"precio": 360,
	},
	{
		"id": 19,
		"nombre": "Caprese",
		"descripcion": "Muzzarella, Tomate y Albahaca",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/e1fe55840a702b0895b0e2aab33f3d51/jamon_y_tomate.jpg",
		"precio": 360,
	},
	{
		"id": 20,
		"nombre": "Carne con Aceitunas",
		"descripcion": "Carne picada, Cebolla y Aceitunas trozadas",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/2b3a6bf78bdaaaee0663371c1b2e3c58/aceituna.jpg",
		"precio": 360,
	},
	{
		"id": 21,
		"nombre": "Jamon y Huevo",
		"descripcion": "Muzzarella, Jamon y Huevo",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/2e84de791da45b9b21cef468e732ec97/jamon_y_huevo2.jpg",
		"precio": 360,
	},
	{
		"id": 22,
		"nombre": "Carne Cuchillo",
		"descripcion": "Carne cortada a cuchillo, Verdeo, Huevo y Cebolla",
		"categoria": "empanadas",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/60673d5397d4314e5b5ad443/e73ab2ef5091c7f45ee8dcf016d23642/carne_cuchillo.jpg",
		"precio": 360,
	},
	{
		"id": 23,
		"nombre": "Promo empanadas",
		"descripcion": "12 empanadas a elección",
		"cantidadMaxima": 12,
		"categoria": "promociones",
		"imagen":
			"https://cdn.discordapp.com/attachments/1072242342200877147/1072248326461862038/miniatura_docena.jpg",
		"precio": 2600,
		"addEmpanadas": true,
	},
	{
		"id": 24,
		"nombre": "Promo XL empanadas",
		"descripcion": "18 empanadas a elección",
		"cantidadMaxima": 18,
		"categoria": "promociones",
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/609e8327a9b6524178f65b8b/8b401131be66ac23de662a0f92d6f59e/Promo_Pack_18_empanadas.png",
		"precio": 3850,
		"addEmpanadas": true,
	},
	{
		"id": 25,
		"nombre": "Combo 1",
		"gustos": "Pizza de 2 gustos",
		"descripcion": "Jamón - Napolitana",
		"categoria": "promociones",
		"imagen": "https://live.staticflickr.com/65535/49084418322_0b46e97696_m.jpg",
		"precio": 1880,
		"addEmpanadas": false,
	},
	{
		"id": 26,
		"nombre": "Combo 2",
		"gustos": "Pizza de 4 gustos",
		"descripcion": "Muzzarella - Napolitana - Jamón - Fugazzeta",
		"categoria": "promociones",
		"imagen": "https://live.staticflickr.com/65535/49084418322_0b46e97696_m.jpg",
		"precio": 1880,
		"addEmpanadas": false,
	},
	{
		"id": 27,
		"nombre": "Combo 3",
		"gustos": "de 4 gusto",
		"descripcion": "Calabresa - Fuga de la casa - Jamón y Morron - Super Napolitana",
		"categoria": "promociones",
		"imagen": "https://live.staticflickr.com/65535/49084418322_0b46e97696_m.jpg",
		"precio": 2180,
		"addEmpanadas": false,
	},
	{
		"id": 28,
		"nombre": "Combo 4",
		"descripcion": "Combo 1 o 2 + 6 empanadas",
		"categoria": "promociones",
		"cantidadMaxima": 6,
		"imagen": "https://live.staticflickr.com/65535/49084418862_9fdf0824bf_m.jpg",
		"precio": 3000,
		"addEmpanadas": true,
	},
	{
		"id": 29,
		"nombre": "Combo 5",
		"descripcion": "Combo 1 o 2 + 12 empanadas",
		"categoria": "promociones",
		"cantidadMaxima": 12,
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/609e8327a9b6524178f65b8b/a77e93aa1f9ed408b6ff5c00f67e6a87/Promo_familia.png",
		"precio": 4100,
		"addEmpanadas": true,
	},
	{
		"id": 30,
		"nombre": "Combo 6",
		"descripcion": "Combo 3 + 12 empanadas",
		"categoria": "promociones",
		"cantidadMaxima": 12,
		"imagen":
			"https://trello-attachments.s3.amazonaws.com/5bf725780020b2756689dca0/609e8327a9b6524178f65b8b/a77e93aa1f9ed408b6ff5c00f67e6a87/Promo_familia.png",
		"precio": 4400,
		"addEmpanadas": true,
	},
];
