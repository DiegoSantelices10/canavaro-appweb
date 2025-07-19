import { model, models, Schema } from "mongoose";

const productoSchema = new Schema(
  {
    productOrder: {
      id: { type: Number },
    },
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
      trim: true,
      maxlength: [40, "El maximo es de 40 caracteres"],
    },
    precio: {
      type: Number,
    },
    precioExtra: {
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
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    formato: {
      type: String,
    },
    destacable: {
      type: Boolean
    },
    cantidadExtras: {
      type: Number,
    },
    addPizzas: {
      type: String,
    },
    addExtras: {
      type: String,
    },
    tamanio: {
      type: String,
    },
    isCantidad: {
      type: String,
    },
    available: {
      type: Boolean,
    },
    extras: {
      type: Array,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

export default models.Producto || model("Producto", productoSchema);

// export default models.empanadas || model("empanadas", empanadasSchema);
