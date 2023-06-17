/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";
import Sale from "models/sale";

const cors = Cors({
	methods: ["PUT"],
});

const handler = async (req, res) => {
	const { method, query, body } = req;
	try {
		await runMiddleware(req, res, cors);
		if (method === "PUT") {
			const sale = await Sale.findByIdAndUpdate(query.id, body, {
				new: true,
				runValidators: true,
			});

			return res.status(200).json({
				success: true,
				data: sale,
			});
		}
	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
