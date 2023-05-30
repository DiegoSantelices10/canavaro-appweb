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
