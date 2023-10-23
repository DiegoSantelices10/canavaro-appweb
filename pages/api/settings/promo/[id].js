/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import Promo from "models/promo";

const handler = async (req, res) => {
	const { method } = req;
	try {
		if (method === "PUT") {
			const resultPut = await Promo.findByIdAndUpdate(req.query.id, req.body);

			if (resultPut) {
				return res.status(200).json({
					success: true,
					data: resultPut,
				});
			} else {
				return res.status(404).json({
					success: false,
					message: "Promo not found",
				});
			}
		}

	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
