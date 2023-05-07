import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const conn = {
  isConnected: false,
};

const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect(MONGODB_URI);

  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
};

export default dbConnect;
