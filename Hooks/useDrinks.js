import { useSelector } from "react-redux";

const { useState, useEffect } = require("react")

const useDrinks = () => {
    const [drinks, setDrinks] = useState([])
    const { products } = useSelector(state => state.product);

    useEffect(() => {
        const drinksList = products.filter(product => product.categoria === "bebidas");
        setDrinks(drinksList);
    }, [products])

    return {
        drinks
    }
}

export default useDrinks;