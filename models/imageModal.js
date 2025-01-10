import { model, models, Schema } from "mongoose";

const imageModalSchema = new Schema(
    {
        nombre: {
            type: String,
        },
        imagen: {
            url: String,
            public_id: String,
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

export default models.ImageModal || model("ImageModal", imageModalSchema);

