import Delay from "models/product";

export const updateDelay = async (req, res) => {
	const { id } = req.query;

	try {
		const delayTime = await Delay.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		return res.status(200).json({
			success: true,
			data: delayTime,
		});
	} catch (error) {
		return res.status(400).json({
			success: false,
		});
	}
};
