import Producto from "models/product";

export const updatePrices = async (req, res) => {
    const updateData = req.body;
    try {
        if(Array.isArray(updateData)) {
            const updateOperations = updateData.map(productData => {
                const { _id, precioPizza } = productData;
    
                return {
                    updateMany: {
                        filter: { _id }, // Suponiendo que _id es el ID del producto
                        update: { $set: { 'precioPizza.gigante': precioPizza.gigante, 'precioPizza.mediana': precioPizza.mediana, 'precioPizza.chica': precioPizza.chica } }
                    }
                };
            });
    
            const response = await Producto.bulkWrite(updateOperations);
            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "Productos actualizados exitosamente",
                });
            }
        } else {
                const updateOperation = {
                    updateMany: {
                        filter: { categoria: 'empanadas' },
                        update: { $set: { 'precio': updateData.precio } }
                    }
                };
                const response = await Producto.bulkWrite([updateOperation]);
                if (response) {
                    return res.status(200).json({
                        success: true,
                        message: "Precio de empanadas actualizado exitosamente",
                    });
        }
    }
    } catch (error) {
        console.error("Error al actualizar los productos:", error);
        return res.status(400).json({
            success: false,
            message: "Ocurrió un error al actualizar los productos",
        });
    }
};
