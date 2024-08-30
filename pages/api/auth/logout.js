import { deleteCookie } from "cookies-next";

const handler = async (req, res) => {
  // res.setHeader(
  //   "Set-Cookie",
  //   serialize("token", "", {
  //     httpOnly: true,
  //     sameSite: "strict",
  //     maxAge: 0,
  //     path: "/admin",
  //   })
  // );
  try {
    deleteCookie("token", { req, res });
    return res.status(200).json({
      message: "ok",
    });
  } catch (error) {
    return res.status(400).json({ success: false });
  }



};

export default handler;
