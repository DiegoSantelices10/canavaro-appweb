import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    maxlength: [120, "El maximo es de 40 caracteres"],
  },
  password: {
    type: String,
    maxlength: [120, "El maximo es de 40 caracteres"],
  },
});

export default models.User || model("User", userSchema);
