/* eslint-disable no-fallthrough */
/* eslint-disable no-case-declarations */
import dbConnect from "utils/mongoose";
import { updateImage } from "libs/cloudinary";
import ImageModal from "models/imageModal";

const handler = async (req, res) => {
    const { method, body, query } = req;

    try {
        if (method === "PUT") {

            const image = await updateImage(body.imagen.url);

            const imageCloud = {
                url: image.secure_url,
                public_id: image.public_id,
            };

            const newImageModal = {
                imagen: imageCloud,
                available: body.available,
            };

            const resultPut = await ImageModal.findByIdAndUpdate(query.id, newImageModal);

            if (resultPut) {
                return res.status(200).json({
                    success: true,
                    data: resultPut,
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Promo not found",
                });
            }
        }

    } catch (error) {
        return await res.status(500).json({ error });
    }
};

export default dbConnect(handler);
