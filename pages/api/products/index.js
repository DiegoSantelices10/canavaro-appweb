/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import Producto from "models/product";
import { uploadImage } from "libs/cloudinary";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";

const cors = Cors({
	methods: ["POST", "GET"],
});

const handler = async (req, res) => {
	const { method, body } = req;
	try {
		await runMiddleware(req, res, cors);
		switch (method) {
			case "GET":
				const products = await Producto.find({});
				return res.status(200).json(products);
			case "POST":
				const {
					id,
					nombre,
					descripcion,
					categoria,
					imagen,
					precio,
					precioPizza,
					addEmpanadas,
					cantidadMaxima,
				} = body;

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
				}
				if (categoria === "pizzas") {
					newProduct = new Producto({
						id,
						nombre,
						descripcion,
						categoria,
						imagen: imageCloud,
						precio: precioPizza,
					});
				}
				if (categoria === "empanadas") {
					newProduct = new Producto({
						id,
						nombre,
						descripcion,
						categoria,
						imagen: imageCloud,
						precio,
					});
				}

				await newProduct.save();
				return res.status(200).json(newProduct);

			default:
				return res.status(400).json({ msg: "el metodo no es soportado" });
		}
	} catch (error) {
		return res.status(400).json({ msg: "el metodo no es soportado" });
	}
};

export default dbConnect(handler);
