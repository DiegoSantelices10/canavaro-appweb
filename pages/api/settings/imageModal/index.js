import { uploadImage } from "libs/cloudinary";
import ImageModal from "models/imageModal";
import dbConnect from "utils/mongoose";

const handler = async (req, res) => {
    const { method } = req;

    try {
        if (method === "POST") {
            const { imagen, available } = req.body;
            const result = await uploadImage(imagen);
            const imageCloud = {
                url: result.secure_url,
                public_id: result.public_id,
            };

            const newImageModal = new ImageModal({
                imagen: imageCloud,
                available
            });

            const savedImageModal = await newImageModal.save();
            if (savedImageModal) {
                return res.status(201).json({ message: "ok" });
            } else {
                throw new Error("Error al guardar los datos");
            }
        }

        if (method === "GET") {
            try {
                const image = await ImageModal.find();
                return res.status(200).json(image);
            } catch (error) {
                return res.status(404).json({
                    success: false,
                });
            }
        }
    } catch (error) {
        return res.status(400).json({ success: false });
    }
};

export default dbConnect(handler);
