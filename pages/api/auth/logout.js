import { serialize } from "cookie";

const handler = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/admin",
    })
  );

  return res.status(200).json({
    message: "ok",
  });
};

export default handler;
