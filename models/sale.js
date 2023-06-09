import { model, models, Schema } from "mongoose";

const saleSchema = new Schema(
	{
		cliente: {
			type: String,
			required: [true, "El campo es requerido."],
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
			required: [true, "El campo es requerido."],
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
		total: {
			url: Number,
		},
		createdAt: { type: Date, default: Date.now },
	},
	{
		timestamp: true,
		versionKey: false,
	}
);

export default models.Venta || model("Venta", saleSchema);

// export default models.empanadas || model("empanadas", empanadasSchema);
