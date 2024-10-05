export const categoriasNoDestacables = ["bebidas", "porciones", "promociones", "extras", "pizzas", "empanadas"];


export const capitalizeFirstLetter = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
};