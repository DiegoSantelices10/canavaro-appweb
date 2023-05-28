import Producto from "models/product";

export const getProducts = async (req, res) => {
	try {
		const products = await Producto.find();
		return res.status(200).json(products);
	} catch (error) {
		return res.status(404).json({
			success: false,
		});
	}
};

export const getProductId = async (req, res) => {
	const { id } = req.query;
	try {
		const products = await Producto.findById({ _id: id });
		return res.status(200).json(products);
	} catch (error) {
		return res.status(404).json({
			success: false,
		});
	}
};
