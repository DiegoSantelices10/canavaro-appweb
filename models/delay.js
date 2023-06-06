import { model, models, Schema } from "mongoose";

const delaySchema = new Schema(
	{
		tipoEnvio: {
			type: String,
			maxlength: [120, "El maximo es de 40 caracteres"],
		},
		demora: {
			type: String,
			maxlength: [120, "El maximo es de 40 caracteres"],
		},
		demoraActual: {
			type: String,
			maxlength: [120, "El maximo es de 40 caracteres"],
		},
		tipo: {
			type: String,
			maxlength: [120, "El maximo es de 40 caracteres"],
		},
	},
	{
		timestamp: true,
		versionKey: false,
	}
);

export default models.Delay || model("Delay", delaySchema);
