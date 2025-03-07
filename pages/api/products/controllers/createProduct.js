import { uploadImage } from "libs/cloudinary";
import Producto from "models/product";

export const createProduct = async (req, res) => {
  const producto = req.body;

  try {
    if (producto.imagen) {
      const result = await uploadImage(producto.imagen);
      const imageCloud = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      const newProduct = new Producto({
        ...producto,
        imagen: {
          url: imageCloud.url,
          public_id: imageCloud.public_id
        },
      })

      return await newProduct
        .save()
        .then(() => {
          return res.status(201).json({ message: "ok" });
        })
        .catch(error => {
          alert("Error al crear el producto:", error);
        });

    }

    const newProduct = new Producto({
      ...producto
    });

    return await newProduct
      .save()
      .then(() => {
        return res.status(201).json({ message: "ok" });
      })
      .catch(error => {
        alert("Error al crear el producto:", error);
      });

  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};
