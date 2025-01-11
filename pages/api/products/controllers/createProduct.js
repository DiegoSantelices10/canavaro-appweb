import { uploadImage } from "libs/cloudinary";
import Producto from "models/product";

export const createProduct = async (req, res) => {
  const producto = req.body;


  try {
    let newProduct;
    if (producto.imagen) {
      const result = await uploadImage(producto.imagen);
      const imageCloud = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      newProduct = new Producto({
        imagen: imageCloud,
        producto,
      })
      await newProduct
        .save()
        .then(() => {
          return res.status(201).json({ message: "ok" });
        })
        .catch(error => {
          alert("Error al crear el producto:", error);
        });
    }

    newProduct = new Producto({ ...producto });

    await newProduct
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
