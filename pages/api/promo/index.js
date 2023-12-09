/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";
import PromoPrice from "models/promoPrice";

const cors = Cors({
	methods: ["GET", "PUT"],
});

const handler = async (req, res) => {
	const { method } = req;
    const {_id, precio } = req.body;
	try {
		await runMiddleware(req, res, cors);
		switch (method) {
			case "GET":
                try {
                    const promo = await PromoPrice.find();
                    return res.status(200).json(promo);
                } catch (error) {
                    return res.status(404).json({
                        success: false,
                    });
                }
			case "PUT":
                try {
                    const products = await PromoPrice.findByIdAndUpdate(_id, { precio }, {
                        new: true,
                        runValidators: true,
                    });
                    return res.status(200).json({
                        success: true,
                        data: products,
                    });
                } catch (error) {
                    return res.status(404).json({
                        success: false,
                    });
                }
		}
	} catch (error) {
		return await res.status(500).json({ error });
	}
};

export default dbConnect(handler);
