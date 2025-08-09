export const categoriasNoDestacables = ["bebidas", "porciones", "promociones", "extras", "pizzas", "empanadas"];


export const capitalizeFirstLetter = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
};


export const ordenarPorProductOrderId = (productos) => {
    if (productos[0]?.idOrder !== "undefined") {
        return [...productos].sort((a, b) => a.idOrder - b.idOrder);
    }
    return productos;
}

export const ordenarPorProductOrderIdHome = (productos) => {

    if (productos[0]?.productOrder?._id !== undefined) {
        return [...productos]?.sort((a, b) => {
            const aOrder = a.productOrder?._id || 999999;
            const bOrder = b.productOrder?._id || 999999;
            return aOrder - bOrder;
        });
    }
    return productos;
}


export const CategoriesOrder = [
    'Combos',
    'promociones',
    'solo efectivo',
    'pizzas',
    'empanadas',
    'bebidas',
    'Postres',
    'porciones',
    'extras'
]