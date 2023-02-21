import axios from "axios";

const getProducts = async () => {
	const result = await axios.get(process.env.API_URL + "/api/items");
	return result.data;
};

export default getProducts;
