/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";
import Venta from "models/sale";
const cors = Cors({
	methods: ["POST"],
});

const handler = async (req, res) => {
	const { method } = req;
	try {
		await runMiddleware(req, res, cors);
		if (method === "POST") {
			const {
				cliente,
				domicilio,
				telefono,
				productos,
				comentarios,
				medioDePago,
				tipoEnvio,
				pagaCon,
				total,
				creado,
			} = req.body;

			const newSale = new Venta({
				cliente,
				domicilio,
				telefono,
				productos,
				tipoEnvio,
				comentarios,
				medioDePago,
				pagaCon,
				total,
				creado,
			});
			await newSale
				.save()
				.then(response => {
					console.log(response);
					return res.status(201).json({
						message: "ok",
						response,
					});
				})
				.catch(error => {
					console.error("Error al guardar la venta:", error);
				});
		}

		if (method === "GET") {
			const sales = await Venta.find();
			return res.status(200).json(sales);
		}
	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
