import dbConnect from "utils/mongoose";
import Product from "models/product";
import { uploadImage } from "libs/cloudinary";
dbConnect();

export default async function handler(req, res) {
	const { method, body } = req;

	switch (method) {
		case "GET":
			try {
				const products = await Product.find();
				return res.status(200).json(products);
			} catch (error) {
				return res.status(400).json({ msg: error.message });
			}
		case "POST":
			try {
				const { nombre, precio, descripcion, categoria, imagen } = body;
				let imageCloud;
				if (imagen) {
					const result = await uploadImage(imagen);
					imageCloud = {
						url: result.secure_url,
						public_id: result.public_id,
					};
				}

				const newProduct = new Product({
					nombre,
					precio,
					descripcion,
					categoria,
					imagen: imageCloud,
				});

				console.log(newProduct);

				await newProduct.save();
				return res.status(200).json(newProduct);
			} catch (error) {
				return res.status(400).json({ msg: error.message });
			}
		default:
			return res.status(400).json({ msg: "el metodo no es soportado" });
	}
}
