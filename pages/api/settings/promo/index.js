import dbConnect from "utils/mongoose";
import Promo from "models/promo";

const handler = async (req, res) => {
  const { method } = req;

  try {
    if (method === "POST") {
      const { nombre, available } = req.body;

      const promoModel = new Promo({
        nombre,
        available
      });

      const savedPromo = await promoModel.save();
      if (savedPromo) {
        return res.status(201).json({ message: "ok" });
      } else {
        throw new Error("Error al guardar los datos");
      }
    }

    if(method === "GET") {
        try {
            const delayTime = await Promo.find();
            return res.status(200).json(delayTime);
        } catch (error) {
            return res.status(404).json({
                success: false,
            });
        }
    }
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

export default dbConnect(handler);
