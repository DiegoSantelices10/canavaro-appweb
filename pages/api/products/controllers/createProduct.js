import { uploadImage } from "libs/cloudinary";

export const createProduct = async (req, res, Producto, body) => {
	const { nombre, descripcion, categoria, imagen, precio, precioPizza, addEmpanadas, cantidadMaxima } = body;

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
		});
	}

	await newProduct.save();
	return res.status(201).json({
		message: "product registered",
	});
};
