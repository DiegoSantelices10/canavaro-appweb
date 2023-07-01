import { model, models, Schema } from "mongoose";

const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      index: false,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, "El campo es requerido."],
      trim: true,
      maxlength: [40, "El maximo es de 40 caracteres"],
    },
    precio: {
      type: Number,
    },
    precioPizza: {
      gigante: {
        type: Number,
      },
      mediana: {
        type: Number,
      },
      chica: {
        type: Number,
      },
    },

    addEmpanadas: {
      type: String,
    },
    cantidadMaxima: {
      type: Number,
    },
    imagen: {
      url: String,
      public_id: String,
    },
    formato: {
      type: String,
    },
    addPizzas: {
      type: String,
    },
    tamanio: {
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

export default models.Producto || model("Producto", productoSchema);

// export default models.empanadas || model("empanadas", empanadasSchema);
