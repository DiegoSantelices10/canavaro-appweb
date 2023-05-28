import Producto from "models/product";

export const updateProduct = async (req, res) => {
	const { id } = req.query;
	console.log(req.query);
	try {
		const products = await Producto.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		return res.status(200).json({
			success: true,
			data: products,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
		});
	}
};
