import { serialize } from "cookie";

const handler = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/admin",
    })
  );

  return res.status(200).json({
    message: "Logout successful",
  });
};

export default handler;