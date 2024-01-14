import Producto from "models/product";

export const deleteProduct = async (req, res) => {
	const { id } = req.query;
	console.log(id);
	console.log('entro aca');
	try {
		await Producto.deleteOne({ _id: id });

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
