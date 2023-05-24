import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Variable global para almacenar el estado de la conexión
let isConnected = false;

const dbConnect = handler => async (req, res) => {
	if (isConnected) {
		return handler(req, res);
	}

	try {
		const db = await connect(MONGODB_URI);
		isConnected = db.connections[0].readyState;
		return handler(req, res);
	} catch (error) {
		return res.status(500).json({ error: "Error al conectar a la base de datos" });
	}
};

export default dbConnect;
