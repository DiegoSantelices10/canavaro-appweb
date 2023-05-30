/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";
import { getDelayTime } from "./controllers/getDelay";
import Delay from "models/delay";
const cors = Cors({
	methods: ["GET", "POST"],
});

const handler = async (req, res) => {
	const { method } = req;
	try {
		await runMiddleware(req, res, cors);
		if (method === "GET") {
			await getDelayTime(req, res);
		}

		if (method === "POST") {
			const newDelay = new Delay({
				tipoEnvio: req.body.tipoEnvio,
				demora: req.body.demora,
			});
			newDelay.save();
			return res.status(201).json({
				message: "ok",
			});
		}
	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
