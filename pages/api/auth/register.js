import User from "models/user";
import dbConnect from "utils/mongoose";
import bcrypt from "bcrypt";
const handler = async (req, res) => {
  const { method } = req;

  try {
    if (method === "POST") {
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 12);
      console.log("haspass", hashedPassword);
      const userModel = new User({
        username,
        password: hashedPassword,
      });

      const savedUser = await userModel.save();
      console.log(savedUser);
      if (savedUser) {
        return res.status(201).json({ message: "ok" });
      } else {
        throw new Error("Error al guardar los datos");
      }
    }
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

export default dbConnect(handler);
