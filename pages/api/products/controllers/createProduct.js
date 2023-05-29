import { uploadImage } from "libs/cloudinary";
import Producto from "models/product";

export const createProduct = async (req, res) => {
	const { nombre, descripcion, categoria, imagen, precio, precioPizza, addEmpanadas, cantidadMaxima, formato, addPizzas, tamanio } = req.body;
	try {
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
				nombre,
				descripcion,
				categoria,
				imagen: imageCloud,
				cantidadMaxima,
				precio,
				addEmpanadas,
				addPizzas,
				tamanio,
			});
		}
		if (categoria === "pizzas") {
			newProduct = new Producto({
				nombre,
				descripcion,
				categoria,
				imagen: imageCloud,
				precioPizza,
			});
		}
		if (categoria === "empanadas") {
			newProduct = new Producto({
				nombre,
				descripcion,
				categoria,
				imagen: imageCloud,
				precio,
				formato,
			});
		}
		if (categoria === "bebidas") {
			newProduct = new Producto({
				nombre,
				descripcion,
				categoria,
				imagen: imageCloud,
				precio,
			});
		}

		await newProduct.save();
		return res.status(201).json({
			message: "ok",
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
		});
	}
};
