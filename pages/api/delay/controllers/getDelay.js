import Delay from "models/delay";

export const getDelayTime = async (req, res) => {
	try {
		const delayTime = await Delay.find();
		return res.status(200).json(delayTime);
	} catch (error) {
		return res.status(404).json({
			success: false,
		});
	}
};

export const getDelayId = async (req, res) => {
	const { id } = req.query;
	try {
		const delay = await Delay.findById({ _id: id });
		return res.status(200).json(delay);
	} catch (error) {
		return res.status(404).json({
			success: false,
		});
	}
};
