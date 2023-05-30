/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";
import { updateDelay } from "./controllers/updateDelay";
const cors = Cors({
	methods: ["PUT"],
});

const handler = async (req, res) => {
	const { method } = req;
	try {
		await runMiddleware(req, res, cors);
		if (method === "PUT") {
			await updateDelay(req, res);
		}
	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
