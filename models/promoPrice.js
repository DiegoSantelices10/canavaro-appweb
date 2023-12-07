import { model, models, Schema } from "mongoose";

const promoPriceSchema = new Schema(
  { 
    nombre: {
    type: String,
  },
    categoria: {
      type: String,
    },
    precio: {
        type: Number,
      }
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

export default models.PromoPrice || model("PromoPrice", promoPriceSchema);

// export default models.empanadas || model("empanadas", empanadasSchema);
