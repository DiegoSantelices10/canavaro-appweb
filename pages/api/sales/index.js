/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import { runMiddleware } from "middleware/runMiddleware";
import Cors from "cors";
import Venta from "models/sale";
import moment from "moment-timezone";
const cors = Cors({
  methods: ["POST"],
});

const handler = async (req, res) => {
  const { method } = req;
  const fechaActual = moment.tz("America/Argentina/Buenos_Aires").format("DD/MM");
  try {
    await runMiddleware(req, res, cors);
    if (method === "POST") {
      const {
        cliente,
        domicilio,
        telefono,
        productos,
        comentarios,
        medioDePago,
        tipoEnvio,
        pagaCon,
        total,
        hora,
        fecha,
      } = req.body;

      const newSale = new Venta({
        cliente,
        domicilio,
        telefono,
        productos,
        tipoEnvio,
        comentarios,
        medioDePago,
        pagaCon,
        total,
        hora,
        fecha,
      });
      await newSale
        .save()
        .then(response => {
          return res.status(201).json({
            message: "ok",
            response,
          });
        })
        .catch(error => {
          console.error("Error al guardar la venta:", error);
        });
    }

    if (method === "GET") {
      const sales = await Venta.find({
        fecha: {
          $regex: `^${fechaActual}`,
        },
      });
      return res.status(200).json(sales);
    }
  } catch (error) {
    return await res.status(500).json({ error });
  }
};

export default dbConnect(handler);
