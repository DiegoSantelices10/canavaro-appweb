import { uploadImage } from "libs/cloudinary";
import Producto from "models/product";

export const updateProduct = async (req, res) => {
	const { id } = req.query;
	const { imagen } = req.body;

	try {
		let imageCloud;
		if (imagen) {
			const result = await uploadImage(imagen);
			imageCloud = {
				url: result.secure_url,
				public_id: result.public_id,
			};
		}
		const producto = { ...req.body, imagen: imageCloud };
		const products = await Producto.findByIdAndUpdate(id, producto, {
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
