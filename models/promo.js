import { model, models, Schema } from "mongoose";

const promoSchema = new Schema(
  { 
    nombre: {
    type: String,
  },
    available: {
      type: Boolean,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

export default models.Promo || model("Promo", promoSchema);

// export default models.empanadas || model("empanadas", empanadasSchema);
