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
			console.log("entro back");
			const { cliente, direccion, telefono, productos, comentarios, medioDePago, pagaCon, total } = req.body;

			const newSale = new Venta({
				cliente,
				direccion,
				telefono,
				productos,
				comentarios,
				medioDePago,
				pagaCon,
				total,
			});
			await newSale
				.save()
				.then(() => {
					console.log("Venta guardada correctamente");
				})
				.catch(error => {
					console.error("Error al guardar la venta:", error);
				});
			return res.status(201).json({
				message: "ok",
			});
		}
	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
