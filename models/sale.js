import { model, models, Schema } from "mongoose";
const saleSchema = new Schema(
  {
    cliente: {
      type: String,
      trim: true,
      maxlength: [80, "El maximo es de 40 caracteres"],
    },
    domicilio: {
      type: String,
      trim: true,
      maxlength: [80, "El maximo es de 40 caracteres"],
    },
    telefono: {
      type: String,
      trim: true,
      maxlength: [40, "El maximo es de 40 caracteres"],
    },
    productos: {
      type: Array,
      required: [true, "El campo es requerido."],
    },
    comentarios: {
      type: String,
    },

    medioDePago: {
      type: String,
    },
    pagaCon: {
      type: Number,
    },
    tipoEnvio: {
      type: String,
    },
    total: {
      type: Number,
    },
    hora: {
      type: String,
    },
    fecha: {
      type: String,
    },
    liberado: {
      type: Boolean,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

export default models.Venta || model("Venta", saleSchema);

// export default models.empanadas || model("empanadas", empanadasSchema);
