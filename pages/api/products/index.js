/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import Producto from "models/product";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";
import { getProducts } from "./controllers/getProducts";
import { createProduct } from "./controllers/createProduct";

const cors = Cors({
	methods: ["POST", "GET"],
});

const handler = async (req, res) => {
	const { method, body } = req;
	try {
		await runMiddleware(req, res, cors);
		switch (method) {
			case "GET":
				await getProducts(req, res);
				break;
			case "POST":
				await createProduct(req, res, Producto, body);
				break;
		}
	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
