import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
	cluster: process.env.CLUSTER,
	encrypted: true,
});

export default pusher;
