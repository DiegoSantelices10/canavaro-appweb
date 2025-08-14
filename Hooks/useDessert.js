import { useSelector } from "react-redux";

const { useState, useEffect } = require("react")

const useDessert = () => {
    const [dessert, setDessert] = useState([])
    const { products } = useSelector(state => state.product);

    useEffect(() => {

        const dessertList = products.filter(product => product.categoria === "Postres");

        setDessert(dessertList);
    }, [products])

    return {
        dessert
    }
}

export default useDessert;