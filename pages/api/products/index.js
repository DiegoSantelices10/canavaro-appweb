/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";
import { getProducts } from "./controllers/getProducts";
import { createProduct } from "./controllers/createProduct";
import { updatePrices } from "./controllers/updatePrices";
const cors = Cors({
	methods: ["POST", "GET", "PUT"],
});

const handler = async (req, res) => {
	const { method } = req;
	try {
		await runMiddleware(req, res, cors);
		switch (method) {
			case "GET":
				await getProducts(req, res);
				break;
			case "POST":
				await createProduct(req, res);
				break;
			case "PUT":
				await updatePrices(req, res)
		}
	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
