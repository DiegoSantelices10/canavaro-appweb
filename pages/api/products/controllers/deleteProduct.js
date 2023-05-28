import Producto from "models/product";

export const deleteProduct = async (req, res) => {
	const { id } = req.query;
	try {
		await Producto.deleteOne(id);

		return res.status(200).json({
			success: true,
			data: id,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
		});
	}
};
