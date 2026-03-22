import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
    calculateSubTotal,
    calculateTotalQuantity,
} from "store/reducers/orderSlice";
import { useEffect, useState } from "react";
import axios from "axios";

import { getProducts } from "services/fetchData";
import { formatearNumero } from "libs/items";
import Delete02Icon from "public/images/delete-02-stroke-rounded";

export default function Calcular({ data }) {
    const dispatch = useDispatch();

    // Categories
    const uniqueCategories = [...new Set(data.filter(i => i.available).map(i => i.categoria.toLowerCase()))];

    // Tabs
    const [activeTab, setActiveTab] = useState("pizzas"); 

    // Pizzas state
    const [select, setSelect] = useState("gigante");
    const [radioSelect, setRadioSelect] = useState({});
    const [pizzaFraccionesTotal, setPizzaFraccionesTotal] = useState(0);

    // Empanadas state
    const [empanadasCount, setEmpanadasCount] = useState({});
    
    // Otros state (bebidas, postres, etc.)
    const [otrosCount, setOtrosCount] = useState({});

    // Totals
    const [subtotal, setSubtotal] = useState(0);
    const [totalPrecioPedido, setTotalPrecioPedido] = useState(0);

    // Promos
    const [docenaPrice, setDocenaPrice] = useState(0);
    const [promo18Price, setPromo18Price] = useState(0);
    const [baseEmpanadaPrice, setBaseEmpanadaPrice] = useState(3500);

    // Init promos and base prices
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/api/promo");
                if (res.data && res.data.length > 0) {
                    setDocenaPrice(res.data[0].precio);
                }
            } catch (err) {
                console.error("Error fetching docena", err);
            }
        })();

        const promo18 = data.find(p => p.nombre === "Promo 18" && p.categoria === "promociones");
        if (promo18) setPromo18Price(promo18.precio);

        const empanada = data.find(p => p.categoria === "empanadas");
        if (empanada) setBaseEmpanadaPrice(empanada.precio);
    }, [data]);

    useEffect(() => {
        dispatch(calculateSubTotal());
        dispatch(calculateTotalQuantity());
    }, [dispatch]);

    // Subtotal recalculation
    useEffect(() => {
        let currentSubtotal = 0;

        if (activeTab === "pizzas") {
            if (pizzaFraccionesTotal === 1) {
                let totalPrecio = 0;
                let cantidad = 0;
                Object.values(radioSelect).forEach(objeto => {
                    totalPrecio += objeto.precioPizza[select];
                    cantidad++;
                });
                currentSubtotal = totalPrecio / cantidad;
            } else {
                currentSubtotal = 0;
            }
        } 
        else if (activeTab === "empanadas") {
            const totalE = Object.values(empanadasCount).reduce((acc, q) => acc + q, 0);
            
            if (totalE > 0) {
                const p18 = promo18Price || 48500;
                const p12 = docenaPrice || 35000;
                const p1 = baseEmpanadaPrice;

                // Greedy combination
                const greedy = (Math.floor(totalE / 18) * p18) + (Math.floor((totalE % 18) / 12) * p12) + ((totalE % 18) % 12) * p1;
                // Without 18s combination
                const no18 = (Math.floor(totalE / 12) * p12) + ((totalE % 12) * p1);
                
                currentSubtotal = Math.min(greedy, no18);
            }
        }
        else if (activeTab !== "pizzas" && activeTab !== "empanadas") {
            let configTotal = 0;
            Object.entries(otrosCount).forEach(([id, qty]) => {
                const prod = data.find(p => p._id === id && p.categoria.toLowerCase() === activeTab);
                if (prod && qty > 0) {
                    configTotal += (prod.precio * qty);
                }
            });
            currentSubtotal = configTotal;
        }

        setSubtotal(currentSubtotal);
    }, [pizzaFraccionesTotal, radioSelect, select, empanadasCount, otrosCount, activeTab, docenaPrice, promo18Price, baseEmpanadaPrice, data]);


    // -- Pizza Logic --
    useEffect(() => {
        const sumaFracciones = Object.values(radioSelect).reduce((total, fracc) => {
            const fracciones = fracc.fraccion;
            const [numerador, denominador] = fracciones.split("/");
            const valorDecimal = parseInt(numerador) / parseInt(denominador);
            return total + valorDecimal;
        }, 0);
        setPizzaFraccionesTotal(sumaFracciones);
    }, [radioSelect]);

    const onChangePizzaSize = e => setSelect(e.target.value);

    const handleChangePizzaFraccion = (item, value) => {
        const { _id, nombre, precioPizza } = item;
        setRadioSelect(prev => ({
            ...prev,
            [_id]: { _id, nombre, precioPizza, fraccion: value }
        }));
    };

    const clearPizzaFraccion = _id => {
        setRadioSelect(prev => {
            const newState = { ...prev };
            delete newState[_id];
            return newState;
        });
    };

    const productTotalMessage = () => {
        if (pizzaFraccionesTotal === 0) return "Selecciona tus mitades";
        if (pizzaFraccionesTotal === 0.25) return "Te falta 3/4 de pizza";
        if (pizzaFraccionesTotal === 0.5) return "Te falta 1/2 de pizza";
        if (pizzaFraccionesTotal === 0.75) return "Te falta 1/4 de pizza";
        if (pizzaFraccionesTotal === 1) return "¡Pizza Completa!";
        if (pizzaFraccionesTotal > 1) return "Límite excedido";
    };

    // -- Empanadas & Otros Logic --
    const handleChangeEmpanadaQty = (_id, val) => {
        const value = parseInt(val) || 0;
        setEmpanadasCount(prev => ({
            ...prev,
            [_id]: value >= 0 ? value : 0
        }));
    };

    const handleChangeOtrosQty = (_id, val) => {
        const value = parseInt(val) || 0;
        setOtrosCount(prev => ({
            ...prev,
            [_id]: value >= 0 ? value : 0
        }));
    };

    // -- Global Add/Clear --
    const handleAddSubtotalToPedido = () => {
        setTotalPrecioPedido(pre => pre + subtotal);
        if (activeTab === "pizzas") setRadioSelect({});
        else if (activeTab === "empanadas") setEmpanadasCount({});
        else {
            setOtrosCount(prev => {
                const newState = { ...prev };
                Object.keys(newState).forEach(id => {
                    const prod = data.find(p => p._id === id);
                    if (prod && prod.categoria.toLowerCase() === activeTab) {
                        delete newState[id];
                    }
                });
                return newState;
            });
        }
    };

    const limpiarPedidoYActual = () => {
        setTotalPrecioPedido(0);
        setRadioSelect({});
        setEmpanadasCount({});
        setOtrosCount({});
    };

    const isSubtotalValid = () => {
        if (activeTab === "pizzas") return pizzaFraccionesTotal === 1;
        if (activeTab === "empanadas") return Object.values(empanadasCount).some(q => q > 0);
        
        let isValid = false;
        Object.entries(otrosCount).forEach(([id, qty]) => {
            const prod = data.find(p => p._id === id);
            if (prod && prod.categoria.toLowerCase() === activeTab && qty > 0) {
                isValid = true;
            }
        });
        return isValid;
    };

    return (
        <div className="mx-auto w-full bg-slate-50 min-h-screen text-slate-800 font-montserrat">
            <div className="w-full h-auto p-4 md:p-8 max-w-7xl mx-auto">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Calculadora de Pedidos</h1>
                    <p className="text-slate-500 text-sm">Agrega productos para calcular el precio total del pedido.</p>
                </header>

                {/* Sticky Top Bar Totalizer */}
                <div className="w-full sticky top-4 z-50 bg-white flex flex-col md:flex-row items-center justify-between rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 md:p-6 mb-8 gap-4">
                    <div className="flex gap-8 justify-between w-full md:w-auto md:flex-1">
                        <div className="flex flex-col">
                            <h2 className="font-semibold text-xs tracking-wider uppercase text-slate-400">Subtotal Selección</h2>
                            <p className="font-bold text-2xl text-slate-800">{formatearNumero(subtotal)}</p>
                        </div>
                        <div className="flex flex-col border-l border-slate-200 pl-8">
                            <h2 className="font-semibold text-xs tracking-wider uppercase text-sky-500">Total Pedido</h2>
                            <p className="font-bold text-3xl text-sky-600 drop-shadow-sm">{formatearNumero(totalPrecioPedido)}</p>
                        </div>
                        <div className="flex items-center ml-auto md:ml-4">
                            <button
                                className="p-3 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-full transition-all"
                                onClick={limpiarPedidoYActual}
                                title="Limpiar todo"
                            >
                                <Delete02Icon color="currentColor" />
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3">
                        {activeTab === "pizzas" && (
                            <div className={`px-4 py-2.5 rounded-xl font-bold text-sm text-center transition-colors ${
                                pizzaFraccionesTotal === 1 ? "bg-emerald-100 text-emerald-700" : "bg-orange-50 text-orange-600"
                            }`}>
                                {productTotalMessage()}
                            </div>
                        )}
                        <button
                            disabled={!isSubtotalValid()}
                            className={`flex justify-center items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95
                                ${isSubtotalValid() 
                                    ? "bg-sky-600 text-white shadow-sky-600/20 hover:bg-sky-700" 
                                    : "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed"}`}
                            onClick={handleAddSubtotalToPedido}
                        >
                            Sumar al Total
                            <FiShoppingCart size={18} />
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
                    {/* Tabs */}
                    <div className="flex flex-wrap pb-4 mb-6 gap-3 border-b border-slate-100">
                        {uniqueCategories.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm capitalize whitespace-nowrap transition-all ${
                                    activeTab === tab
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* PIZZAS */}
                    {activeTab === "pizzas" && (
                        <div className="animate-fade-in">
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                {["chica", "mediana", "gigante"].map(size => (
                                    <label key={size} className="cursor-pointer">
                                        <input
                                            type="radio"
                                            value={size}
                                            name="pizzaSize"
                                            onChange={onChangePizzaSize}
                                            checked={select === size}
                                            className="peer sr-only"
                                        />
                                        <div className="px-6 py-3 rounded-xl border-2 border-slate-100 text-slate-500 font-semibold uppercase text-sm peer-checked:border-sky-500 peer-checked:bg-sky-50 peer-checked:text-sky-700 transition-all">
                                            {size}
                                        </div>
                                    </label>
                                ))}
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {data
                                    .filter(item => item.categoria === "pizzas" && item.available && item.nombre !== "Fugazzeta rellena")
                                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                                    .map(item => (
                                        <div key={item._id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                                            <div className="text-center mb-4">
                                                <h3 className="font-bold text-slate-700 text-sm leading-tight uppercase mb-1 line-clamp-2">{item.nombre}</h3>
                                                <p className="font-semibold text-sky-600 text-sm">{formatearNumero(item.precioPizza[select])}</p>
                                            </div>
                                            
                                            <div className="mt-auto w-full">
                                                <div className="flex justify-center gap-2 mb-2 w-full">
                                                    {select === "gigante" && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleChangePizzaFraccion(item, "1/4")}
                                                            className={`flex-1 py-1.5 rounded-lg text-sm font-black transition-all ${
                                                                radioSelect[item._id]?.fraccion === "1/4"
                                                                ? "bg-sky-500 text-white shadow-md shadow-sky-500/30 border-transparent transform scale-105"
                                                                : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 hover:text-slate-700"
                                                            }`}
                                                        >
                                                            1/4
                                                        </button>
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleChangePizzaFraccion(item, "1/2")}
                                                        className={`flex-1 py-1.5 rounded-lg text-sm font-black transition-all ${
                                                            radioSelect[item._id]?.fraccion === "1/2"
                                                            ? "bg-sky-500 text-white shadow-md shadow-sky-500/30 border-transparent transform scale-105"
                                                            : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 hover:text-slate-700"
                                                        }`}
                                                    >
                                                        1/2
                                                    </button>
                                                </div>
                                                {radioSelect[item._id]?.fraccion ? (
                                                    <button
                                                        onClick={() => clearPizzaFraccion(item._id)}
                                                        className="w-full py-1.5 mt-2 rounded-lg text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                                                    >
                                                        Deshacer
                                                    </button>
                                                ) : <div className="h-8 mt-2" />}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* EMPANADAS */}
                    {activeTab === "empanadas" && (
                        <div className="animate-fade-in">
                            <div className="bg-sky-50 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between border border-sky-100">
                                <div className="mb-2 sm:mb-0 text-center sm:text-left">
                                    <h3 className="font-bold text-sky-800">Promociones Automáticas</h3>
                                    <p className="text-sm text-sky-600">Se aplica el mejor precio disponible entre Docena ({formatearNumero(docenaPrice)}) y Promo 18 ({formatearNumero(promo18Price)}).</p>
                                </div>
                                <div className="bg-white px-6 py-2 rounded-xl shadow-sm border border-sky-100">
                                    <span className="text-sm font-semibold text-slate-500 mr-2">Total Llevando:</span>
                                    <span className="font-bold text-xl text-sky-700">{Object.values(empanadasCount).reduce((acc, q) => acc + q, 0)}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-8 bg-white border border-slate-100 rounded-3xl shadow-sm">
                                <h2 className="text-xl font-bold text-slate-800 mb-6 font-montserrat tracking-tight">Total de Empanadas</h2>
                                <div className="relative flex items-center max-w-xs w-full">
                                    <button 
                                        onClick={() => handleChangeEmpanadaQty("total", (empanadasCount.total || 0) - 1)}
                                        className="absolute left-2 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 font-bold text-2xl hover:bg-slate-200 transition-colors"
                                    >-</button>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={empanadasCount.total || ""}
                                        onChange={e => handleChangeEmpanadaQty("total", e.target.value)}
                                        placeholder="0"
                                        className="w-full text-center font-bold text-5xl py-6 bg-slate-50 border-2 border-slate-200 rounded-3xl focus:outline-none focus:ring-4 focus:ring-sky-500/20 focus:border-sky-500 no-spinners transition-all"
                                    />
                                    <button 
                                        onClick={() => handleChangeEmpanadaQty("total", (empanadasCount.total || 0) + 1)}
                                        className="absolute right-2 w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 font-bold text-2xl hover:bg-slate-200 transition-colors"
                                    >+</button>
                                </div>
                                <p className="mt-6 text-sm text-slate-500 text-center font-medium">
                                    Ingresá la cantidad total para calcular el precio
                                </p>
                            </div>
                        </div>
                    )}

                    {/* OTHER DYNAMIC CATEGORIES */}
                    {activeTab !== "pizzas" && activeTab !== "empanadas" && (
                        <div className="animate-fade-in">
                            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {data
                                    .filter(item => item.categoria.toLowerCase() === activeTab && item.available)
                                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                                    .map(item => (
                                        <div key={item._id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between items-center group hover:border-sky-200 transition-colors">
                                            <div className="text-center mb-4">
                                                <h3 className="font-bold text-slate-700 text-sm leading-tight uppercase mb-1 line-clamp-2">{item.nombre}</h3>
                                                <p className="font-semibold text-sky-600 text-sm">{formatearNumero(item.precio)}</p>
                                            </div>
                                            
                                            <div className="w-full mt-auto">
                                                <div className="relative flex items-center w-full">
                                                    <button 
                                                        onClick={() => handleChangeOtrosQty(item._id, (otrosCount[item._id] || 0) - 1)}
                                                        className="absolute left-1 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 font-bold hover:bg-slate-200"
                                                    >-</button>
                                                    <input 
                                                        type="number" 
                                                        min="0"
                                                        value={otrosCount[item._id] || ""}
                                                        onChange={e => handleChangeOtrosQty(item._id, e.target.value)}
                                                        placeholder="0"
                                                        className="w-full text-center font-bold text-lg py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent no-spinners"
                                                    />
                                                    <button 
                                                        onClick={() => handleChangeOtrosQty(item._id, (otrosCount[item._id] || 0) + 1)}
                                                        className="absolute right-1 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 font-bold hover:bg-slate-200"
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sub-style for hiding number inputs arrows */}
            <style jsx global>{`
                .no-spinners::-webkit-inner-spin-button, 
                .no-spinners::-webkit-outer-spin-button { 
                    -webkit-appearance: none; 
                    margin: 0; 
                }
                .no-spinners {
                    -moz-appearance: textfield;
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .hide-scroll-bar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scroll-bar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
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