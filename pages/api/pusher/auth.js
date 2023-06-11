import Pusher from "pusher";

export const pusher = new Pusher({
	appId: process.env.APP_ID,
	key: process.env.KEY,
	secret: process.env.SECRET,
	cluster: process.env.CLUSTER,
	useTLS: true,
});

export default function handler(req, res) {
	const socketId = req.body.socket_id;
	const channelName = req.body.channel_name;
	try {
		const authData = pusher.authorizeChannel(socketId, channelName);
		res.send(authData);
	} catch (error) {
		console.error("Error en la autenticación:", error);
		res.status(500).send("Error interno del servidor");
	}
}
