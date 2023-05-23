import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const conn = {
	isConnected: false,
};

const dbConnect = handler => async (req, res) => {
	if (conn.isConnected) {
		return handler(req, res);
	}

	const db = await connect(MONGODB_URI);

	conn.isConnected = db.connections[0].readyState;
	console.log(db.connection.db.databaseName);
	return handler(req, res);
};

export default dbConnect;
