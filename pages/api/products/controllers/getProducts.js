import Producto from "models/product";

export const getProducts = async (req, res) => {
	const products = await Producto.find();
	return res.status(200).json(products);
};
