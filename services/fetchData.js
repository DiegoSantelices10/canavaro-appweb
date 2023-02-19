import axios from 'axios';

const getProducts = async () => {
	const { data } = await axios.get(process.env.API_URL + '/api/items');
	return data;
};

export default getProducts;
