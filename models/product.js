import { model, models, Schema } from "mongoose";

const productoSchema = new Schema(
	{
		nombre: {
			type: String,
			required: [true, "El campo es requerido."],
			trim: true,
			maxlength: [120, "El maximo es de 40 caracteres"],
		},
		descripcion: {
			type: String,
			required: [true, "El campo es requerido."],
			trim: true,
			maxlength: [150, "El maximo es de 40 caracteres"],
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
			validate: {
				validator: function (value) {
					// Validar que addEmpanadas sea requerido solo para la categoría "Promoción"
					return this.categoria !== "promociones" || (this.categoria === "promociones" && typeof value === "string");
				},
				message: "El campo addEmpanadas es requerido para la categoría Promoción.",
			},
		},
		cantidadMaxima: {
			type: Number,
			validate: {
				validator: function (value) {
					// Validar que addEmpanadas sea requerido solo para la categoría "Promoción"
					return this.categoria !== "promociones" || (this.categoria === "promociones" && typeof value === "number");
				},
				message: "El campo addEmpanadas es requerido para la categoría Promoción.",
			},
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
