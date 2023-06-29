import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.KEY,
  secret: process.env.SECRET,
  cluster: process.env.CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  const message = req.body;

  const response = await pusher.trigger("pizzeria", "pedido-liberado", {
    id: message,
  });
  res.json({ message: "completed" }, response);
}
