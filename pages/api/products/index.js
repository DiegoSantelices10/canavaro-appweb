import dbConnect from "utils/mongoose";
import Producto from "models/product";
import { uploadImage } from "libs/cloudinary";
dbConnect();

export default async function handler(req, res) {
	const { method, body } = req;
	switch (method) {
		case "GET":
			try {
				const products = await Producto.find();
				return res.status(200).json(products);
			} catch (error) {
				return res.status(400).json({ msg: error.message });
			}
		case "POST":
			try {
				const { id, nombre, descripcion, categoria, imagen, precio, addEmpanadas, cantidadMaxima } = body;
				let imageCloud;
				if (imagen) {
					const result = await uploadImage(imagen);
					imageCloud = {
						url: result.secure_url,
						public_id: result.public_id,
					};
				}
				let newProduct = null;
				if (categoria === "promociones") {
					newProduct = new Producto({
						id,
						nombre,
						descripcion,
						categoria,
						imagen: imageCloud,
						cantidadMaxima,
						precio,
						addEmpanadas,
					});
				} else {
					newProduct = new Producto({
						id,
						nombre,
						descripcion,
						categoria,
						imagen: imageCloud,
						precio,
					});
				}

				console.log("producto nuevo!", newProduct);

				await newProduct.save();
				return res.status(200).json(newProduct);
			} catch (error) {
				return res.status(400).json({ msg: error.message });
			}
		default:
			return res.status(400).json({ msg: "el metodo no es soportado" });
	}
}
