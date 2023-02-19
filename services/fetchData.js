import axios from 'axios';

const getProducts = async () => {
	const products = await axios.get(process.env.API_URL + '/api/items');
	return products.data;
};

export default getProducts;
