import { useSelector } from "react-redux";
import { getProductsFront } from "services/fetchData";

const { useState, useEffect } = require("react")


const useCategories = () => {
    const [categories, setCategories] = useState([])
    const [productsList, setProductsList] = useState([]);
    const { products } = useSelector(state => state.product);


    const renderCategory = async () => {
        let cat = []
        if (products?.lenght > 0) {
            cat = [...new Set(products?.map(producto => producto.categoria))];
        } else {
            const res = await getProductsFront();

            setProductsList(res)
            cat = [...new Set(res.map(producto => producto.categoria))];
        }
        setCategories(cat);
    }

    useEffect(() => {
        renderCategory();
    }, [products])

    return {
        categories,
        productsList
    }
}

export default useCategories;