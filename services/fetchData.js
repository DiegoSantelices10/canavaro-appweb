export async function getProducts() {
	const res = await fetch(process.env.API_URL + '/api/items');
	const products = await res.json();
	return products;
}
