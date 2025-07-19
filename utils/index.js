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
    if (productos[0]?.idOrder !== "undefined") {
        return [...productos]?.sort((a, b) => a.productOrder.id - b.productOrder.id);
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