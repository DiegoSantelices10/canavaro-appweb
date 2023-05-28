/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";
import { getProductId } from "./controllers/getProducts";
import { updateProduct } from "./controllers/updateProduct";
import { deleteProduct } from "./controllers/deleteProduct";
const cors = Cors({
	methods: ["POST", "GET"],
});

const handler = async (req, res) => {
	const { method } = req;
	try {
		await runMiddleware(req, res, cors);
		switch (method) {
			case "GET":
				await getProductId(req, res);
				break;
			case "PUT":
				await updateProduct(req, res);
				break;
			case "DELETE":
				await deleteProduct(req, res);
				break;
		}
	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
