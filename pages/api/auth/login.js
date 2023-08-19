import User from "models/user";
import dbConnect from "utils/mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const handler = async (req, res) => {
  const { method } = req;
  try {
    if (method === "POST") {
      const { username, password } = req.body;
      const generateToken = payload => {
        // Genera un token JWT con los datos del usuario
        const token = jwt.sign(payload, "canavaro", { expiresIn: "1h" });
        return token;
      };

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
      const token = generateToken({
        userd: user._id,
        username: user.username,
        password: user.password,
      });

      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 21600, // Tiempo de expiración de la cookie en segundos
          path: "/admin", // Ruta de la cookie, ajusta según tus necesidades
        })
      );

      return res.status(201).json({ token, user: user.username });
    }
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

export default dbConnect(handler);
