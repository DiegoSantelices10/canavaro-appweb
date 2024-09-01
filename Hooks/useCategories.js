import { useSelector } from "react-redux";

const { useState, useEffect } = require("react")


const useCategories = () => {
    const [categories, setCategories] = useState([])
    const { products } = useSelector(state => state.product);

    const reorderCategories = (categories) => {
        const promoCategory = categories.filter(category => category.includes("Promo"));
        const otherCategories = categories.filter(category => !category.includes("Promo"));

        return [...promoCategory, ...otherCategories];
    };
    const renderCategory = () => {
        const categories = [...new Set(products?.map(producto => producto.categoria))];

        const reOrder = reorderCategories(categories);

        setCategories(reOrder);
    }

    useEffect(() => {
        renderCategory();
    }, [products])

    return {
        categories
    }
}

export default useCategories;