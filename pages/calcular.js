/* eslint-disable react/prop-types */
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
    calculateSubTotal,
    calculateTotalQuantity,
} from "store/reducers/orderSlice";
import { useEffect, useState } from "react";

import { getProducts } from "services/fetchData";
import { formatearNumero } from "libs/items";
import Delete02Icon from "public/images/delete-02-stroke-rounded";
import RadioButton from "components/radioButton";

export default function Calcular({ data }) {
    const [select, setSelect] = useState("gigante");
    const [radioSelect, setRadioSelect] = useState([]);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [totalPrecioPedido, setTotalPrecioPedido] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        checkSuma(radioSelect);
    }, [radioSelect]);

    useEffect(() => {
        dispatch(calculateSubTotal());
        dispatch(calculateTotalQuantity());
    }, [dispatch]);

    useEffect(() => {
        precioCalculado();
    }, [total]);


    const onChangeValue = e => {
        const value = e.target.value;
        setSelect(value);
    };

    const handleChangeRadioButton = (item, value) => {
        const { _id, nombre, precioPizza } = item;
        radioSelect[_id] = { _id, nombre, precioPizza, "fraccion": value };
        setRadioSelect({ ...radioSelect });
    };

    const clearFraction = _id => {
        const result = Object.values(radioSelect)?.find(prod => prod._id === _id);
        if (result.fraccion === "cuarto") setTotal(total - 1);
        if (result.fraccion === "mediana") setTotal(total - 2);

        const res = Object.values(radioSelect)?.filter(pro => pro._id !== _id);
        const response = res.reduce((acc, user) => {
            acc[user._id] = user;
            return acc;
        }, {});
        setRadioSelect(response);
    };

    const precioCalculado = () => {
        if (total === 1) {
            let totalPrecio = 0;
            let cantidad = 0;
            Object.values(radioSelect).forEach(objeto => {
                totalPrecio += objeto.precioPizza[select];
                cantidad++;
            });
            const promedio = totalPrecio / cantidad;
            setSubtotal(promedio);
        } else {
            setSubtotal(0)
        }
    }


    const checkSuma = radioArray => {
        const sumaFracciones = Object.values(radioArray).reduce((total, fracc) => {
            const fracciones = fracc.fraccion;
            const [numerador, denominador] = fracciones.split("/");
            const valorDecimal = parseInt(numerador) / parseInt(denominador);
            return total + valorDecimal;
        }, 0);
        setTotal(sumaFracciones);
    };

    const productTotal = () => {

        if (total === 0) return <h1 className="font-montserrat">Arma tu pizza</h1>;
        if (total === 0.25) return <h1 className="font-montserrat">Te falta 3/4 de pizza</h1>;
        if (total === 0.5) return <h1 className="font-montserrat">Te falta 1/2 de pizza</h1>;
        if (total === 0.75) return <h1 className="font-montserrat">Te falta 1/4 de pizza</h1>;
        if (total === 1) return <h1 className="font-montserrat">¡ Pizza Completa !</h1>;
        if (total > 1) return <h1 className="font-montserrat">Completa correctamente</h1>;
    };

    const addCartPromo = () => {
        setTotalPrecioPedido(pre => pre + subtotal);
        setRadioSelect([]);
    };

    const limpiarCarrito = () => {
        setTotalPrecioPedido(0)
    }


    return (
        <div className="mx-auto w-full bg-gray-900">
            <div className="w-full h-auto">
                <div className="flex flex-col p-2 lg:gap-8 gap-4 w-full">
                    <div className="w-full sticky top-0 bg-slate-900 flex flex-col md:flex-row  items-center justify-around rounded-md shadow-gray-600 shadow p-2 py-4">
                        <div className="flex gap-4 justify-around w-full md:w-1/2">
                            <div className="flex flex-col text-center">
                                <h1 className="font-semibold text-base text-white font-montserrat">Subtotal</h1>
                                <p className=" font-normal text-lg  text-gray-400 font-montserrat">{formatearNumero(subtotal)}</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <h1 className="font-semibold text-base text-white font-montserrat">Total</h1>
                                <p className=" font-normal text-lg  text-gray-400 font-montserrat">{formatearNumero(totalPrecioPedido)}</p>
                            </div>
                            <button
                                className="bg-gray-800 rounded-full px-3"
                                onClick={() => limpiarCarrito()}
                            >
                                {<Delete02Icon color={"white"} />}
                            </button>

                        </div>
                        <div className="w-full md:w-1/2 flex gap-2 mt-2 md:mt-0">
                            <div
                                className={
                                    total === 1
                                        ? "bg-green-500 font-montserrat rounded-md  w-1/2 text-sm text-white p-2  text-center font-semibold"
                                        : "bg-red-600 w-1/2 font-montserrat rounded-md text-white text-sm p-2  text-center font-semibold"
                                }
                            >
                                {productTotal()}
                            </div>
                            {total === 1 && (
                                <div className="mx-auto border-gray-200 w-1/2">
                                    <button
                                        className={`${total === 1
                                            ? "flex justify-center items-center gap-3 py-2 text-center rounded-md w-full bg-red-600 mx-auto  hover:-translate-y-1 transition-all font-montserrat duration-500 text-white text-sm font-semibold "
                                            : "invisible"
                                            }`}
                                        onClick={() => {
                                            addCartPromo();
                                        }}
                                    >
                                        Agregar al Carrito
                                        <FiShoppingCart size={16} />{" "}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="block lg:flex">
                        <div className="flex justify-center gap-10 font-montserrat  w-full font-bold py-4 lg:py-0">
                            <div className="grid content-center gap-2">
                                <input
                                    id="chica"
                                    type="radio"
                                    value="chica"
                                    name="chica"
                                    onChange={onChangeValue}
                                    checked={select === "chica"}
                                    className="mx-auto p-4 rounded-lg focus:ring-0 focus:text-red-600 hover:text-red-600 checked:text-red-600"
                                />
                                <h3 className="font-semibold font-montserrat text-white text-sm">Chica</h3>
                            </div>
                            <div className="grid content-center gap-2">
                                <input
                                    id="mediana"
                                    type="radio"
                                    value="mediana"
                                    name="mediana"
                                    onChange={onChangeValue}
                                    checked={select === "mediana"}
                                    className="mx-auto p-4 rounded-lg focus:ring-0 focus:text-red-600 hover:text-red-600 checked:text-red-600"
                                />
                                <h3 className="font-semibold text-center text-white text-sm">Mediana</h3>
                            </div>
                            <div className="grid content-center gap-2">
                                <input
                                    id="gigante"
                                    type="radio"
                                    value="gigante"
                                    name="gigante"
                                    onChange={onChangeValue}
                                    checked={select === "gigante"}
                                    className="mx-auto p-4 rounded-lg focus:ring-0 focus:text-red-600 hover:text-red-600 checked:text-red-600"
                                />
                                <h3 className="font-semibold text-white text-sm">Gigante</h3>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-wrap  justify-between gap-y-4 items-center w-full">
                        {data.filter((item) => item.categoria === 'pizzas' && item.available === true && item.nombre !== "Fugazzeta rellena")
                            .sort((a, b) => a.nombre.localeCompare(b.nombre))
                            .map((item) => (

                                <div key={item._id} className="w-[205px] shadow-gray-600 shadow-inner rounded-lg border-gray-400">
                                    <h2 className=" font-medium font-montserrat text-white text-center text-xs mt-4 uppercase ">{item.nombre}</h2>
                                    <h2 className=" font-medium font-montserrat text-gray-400 text-center text-xs uppercase ">{formatearNumero(item.precioPizza[select])}</h2>

                                    <div className="w-auto text-center text-base mt-2">
                                        <div className="flex w-full justify-center items-center gap-2">
                                            {select === "gigante" && (
                                                <div className="">
                                                    <RadioButton
                                                        value="1/4"
                                                        name={item.nombre}
                                                        selected={radioSelect[item._id]?.fraccion === "1/4"}
                                                        onChange={(value) => handleChangeRadioButton(item, value)}
                                                        label="1/4"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <RadioButton
                                                    value="1/2"
                                                    name={item.nombre}
                                                    selected={radioSelect[item._id]?.fraccion === "1/2"}
                                                    onChange={(value) => handleChangeRadioButton(item, value)}
                                                    label="1/2"
                                                />
                                            </div>
                                        </div>
                                        {radioSelect[item._id]?.fraccion ? (
                                            <button
                                                onClick={() => clearFraction(item._id)}
                                                className="text-gray-400 py-2 text-xs text-center font-semibold"
                                            >
                                                Deshacer
                                            </button>
                                        ) : (
                                            <div className="py-4"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

            </div>
        </div>
    );
}


export async function getServerSideProps() {
    const data = await getProducts();
    return {
        props: {
            data,
        },
    };
}