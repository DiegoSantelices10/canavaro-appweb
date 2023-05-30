import { model, models, Schema } from "mongoose";

const delaySchema = new Schema({
	tipoEnvio: {
		type: String,
		maxlength: [120, "El maximo es de 40 caracteres"],
	},
	demora: {
		type: String,
		maxlength: [120, "El maximo es de 40 caracteres"],
	},
});

export default models.Delay || model("Delay", delaySchema);

// export default models.empanadas || model("empanadas", empanadasSchema);
