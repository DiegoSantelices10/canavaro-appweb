import { useSelector } from "react-redux";

const { useState, useEffect } = require("react")


const useCategories = () => {
    const [categories, setCategories] = useState([])
    const { products } = useSelector(state => state.product);

    const renderCategory = () => {
        const categories = [...new Set(products?.map(producto => producto.categoria))];
        setCategories(categories);
    }

    useEffect(() => {
        renderCategory();
    }, [products])

    return {
        categories
    }
}

export default useCategories;