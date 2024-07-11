/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import CardPromotion from "components/cardPromotion";
import Layout from "components/layout";
import { useSelector, useDispatch } from "react-redux";
import Card from "components/Card";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import {
  addPromoOrderList,
  calculateSubTotal,
  calculateTotalQuantity,
  clearOrderPromo,
  setQuantityDemanded,
} from "store/reducers/orderSlice";

import { v4 as uuidv4 } from "uuid";
import { setExtras, setProductData } from "store/reducers/productSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { formatearNumero, totalExtrasProductos } from "libs/items";
import CardEfectivo from "components/cardEfectivo";


export default function Home() {
  const [renderProducts, setRenderProductos] = useState("empanadas");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCant, setTotalCant] = useState(0);
  const [docenaPrice, setDocenaPrice] = useState(0);


  const { products, extras } = useSelector(state => state.product);
  const { orderPromo } = useSelector(state => state.order);

  const idGenerator = uuidv4();

  const dispatch = useDispatch();
  const renderPromotions = () => {
    // eslint-disable-next-line dot-notation
    const combos = products
      ?.filter(item => item.nombre.includes("Combo"))
      ?.sort((a, b) => a.nombre.localeCompare(b.nombre));
    const otraPromos = products?.filter(item => item.categoria === "promociones" && !item.nombre.includes("Combo"));
    const ordenado = [...combos, ...otraPromos];
    return ordenado?.filter(item => item.available === true).map(data => <CardPromotion key={data._id} data={data} />);
  };

  const renderStore = renderProductos => {
    return products
      ?.filter(item => item.categoria === renderProductos && item.available === true)
      ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map(data => <Card key={data._id} data={data} />);
  };

  const renderEfectivo = () => {
    return products
      ?.filter(item => item.categoria === "soloEfectivo" && item.available === true)
      .map(data => (
        <CardEfectivo
          key={data._id}
          data={data}
        />
      ));
  };

  useEffect(() => {
    if (orderPromo !== null) {
      calculateEmpanadas();
    }
  }, [orderPromo]);

  useEffect(() => {
    dispatch(clearOrderPromo());
    dispatch(setQuantityDemanded(0));
    if (products?.length <= 0) {
      const res = JSON.parse(localStorage.getItem("productos"));
      dispatch(setProductData(res));
    }

    (async () => {
      const res = await axios.get("/api/promo");
      setDocenaPrice(res.data[0].precio)
    })();

    if (extras?.length <= 0) {
      const res = JSON.parse(localStorage.getItem("productos"));
      const extras = res.filter(item => item.categoria === 'extras' && item.available === true)
      dispatch(setExtras(extras))
    }
  }, []);

  const calculateEmpanadas = () => {
    const requiredQuantity = 12;
    let priceU;
    const array = [];
    let cantidadTotal = 0;

    if (orderPromo.length > 0) {
      orderPromo.map(({ cantidad, precio, precioExtra }) => {
        if (precioExtra) {
          const precioAddExtra = precio + precioExtra
          priceU = precioAddExtra;
          const listItemAmount = precioAddExtra * cantidad;
          cantidadTotal = cantidadTotal + cantidad;
          setTotalCant(cantidadTotal);
          return array.push(listItemAmount);
        }
        priceU = precio;
        const listItemAmount = precio * cantidad;
        cantidadTotal = cantidadTotal + cantidad;
        setTotalCant(cantidadTotal);
        return array.push(listItemAmount);
      });
    } else {
      setTotalCant(0);
    }

    const totalAmount = array.reduce((a, b) => {
      return a + b;
    }, 0);
    if (cantidadTotal < requiredQuantity) return setTotalPrice(totalAmount);

    if (cantidadTotal % requiredQuantity === 0) {
      const totalPrecioExtra = totalExtrasProductos(orderPromo)
      const cantDocena = cantidadTotal / requiredQuantity;
      let total = cantDocena * docenaPrice;
      total += totalPrecioExtra;
      setTotalPrice(total)
    }

    if (cantidadTotal > requiredQuantity && cantidadTotal % requiredQuantity !== 0) {
      let docenaCant = cantidadTotal / requiredQuantity;
      docenaCant = Math.floor(docenaCant)
      const resto = cantidadTotal % requiredQuantity;
      let subtotal;

      if (docenaCant > 0) {
        subtotal = docenaCant * docenaPrice;
      }
      const total = resto * priceU;
      setTotalPrice(subtotal + total);
    }
  };

  const addCartPromo = value => {
    const res = value.find(item => item.categoria === "bebidas" || item.categoria === "porciones" || item.categoria === "soloEfectivo");

    if (res) {
      setTotalCant(0);
      value.map(item => dispatch(addPromoOrderList({ ...item })));

      toast.success('Se agrego al pedido!')

      dispatch(clearOrderPromo());
      dispatch(calculateSubTotal());
      dispatch(calculateTotalQuantity());
      return;
    }

    const result = {
      _id: idGenerator,
      nombre: "Empanadas a eleccion",
      categoria: "empanadas",
      products: [...value],
      cantidad: 1,
      cant: totalCant,
      precio: totalPrice,
    };
    setTotalCant(0);
    dispatch(addPromoOrderList(result));
    toast.success("Se agrego al pedido!");

    dispatch(clearOrderPromo());
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
  };

  const clearTotal = () => {
    dispatch(clearOrderPromo());

    setTotalCant(0);
    setTotalPrice(0);
  };

  return (
    <Layout>
      <Toaster />
      <div className="pt-[70px] mx-auto w-full rounded-3xl relative">
        <div className="w-full flex items-center justify-between">
          <div>
            <p className="text-left w-full font-montserrat text-base  font-semibold">¡Arma tu pizza como quieras!</p>

          </div>
          <Link href={"/order/pizzaFree"}>
            <a
              onClick={() => clearTotal()}
              className="rounded-lg font-montserrat font-normal w-auto bg-red-600 hover:bg-red-500 whitespace-nowrap  text-white  shadow-md p-2 text-sm px-3">
              Ingresa aqui
            </a>
          </Link>
        </div>

        <>
          <h1 className="text-base font-bold font-montserrat text-neutral-800 mt-6">Nuestros combos</h1>
          <div className="py-2">
            <div className="flex overflow-x-scroll flexp h-auto p-0.5 space-x-6 w-full">
              <style jsx>
                {`
              .flexp::-webkit-scrollbar-thumb {
                background: #ffffff;
                border-radius: 20px;
              }

              .flexp::-webkit-scrollbar {
                height: 5px;
              }
            `}
              </style>
              {renderPromotions()}
            </div>
          </div>
        </>

        <>
          {products?.find(product => product.categoria === "soloEfectivo" && product.available === true)
            && (
              <div className="mt-4">
                <p className="text-base font-bold font-montserrat text-neutral-800">Promos en efectivo</p>
                <div className="flex overflow-x-scroll flexp  space-x-6 w-full py-2 px-0.5">
                  <style jsx>
                    {`
              .flexp::-webkit-scrollbar-thumb {
                background: #ffffff;
                border-radius: 20px;
              }

              .flexp::-webkit-scrollbar {
                height: 5px;
              }
            `}
                  </style>
                  {renderEfectivo()}
                </div>
              </div>
            )}

        </>


        <div className="flex overflow-x-scroll flexp justify-between space-x-2 w-full mt-4">
          <style jsx>
            {`
              .flexp::-webkit-scrollbar-thumb {
                background: #ffffff;
                border-radius: 20px;
              }

              .flexp::-webkit-scrollbar {
                height: 0px;
              }
            `}
          </style>
          <div>
            <button
              onClick={() => {
                setRenderProductos("empanadas");
                clearTotal();
              }}
              className={
                renderProducts !== "empanadas"
                  ? "w-48  font-medium font-montserrat text-sm text-gray-400"
                  : "w-48 font-semibold  text-neutral-800  text-sm font-montserrat border-b border-gray-200 tracking-wide"
              }
            >
              Canastitas & Empanadas
            </button>
          </div>
          <div>
            <button
              onClick={() => setRenderProductos("pizzas")}
              className={
                renderProducts !== "pizzas"
                  ? "w-28  font-medium font-montserrat text-sm text-gray-400"
                  : "w-28 font-semibold  text-neutral-800  text-sm font-montserrat border-b border-gray-200 tracking-wide"
              }
            >
              Pizzas
            </button>
          </div>

          <div>
            <button
              onClick={() => setRenderProductos("promociones")}
              className={
                renderProducts !== "promociones"
                  ? "w-28  font-medium font-montserrat text-sm text-gray-400"
                  : "w-28 font-semibold   text-neutral-800 text-sm font-montserrat border-b border-gray-200 tracking-wide"
              }
            >
              Promociones
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setRenderProductos("porciones");
                clearTotal();
              }}
              className={
                renderProducts !== "porciones"
                  ? "w-28  font-medium font-montserrat text-sm text-gray-400"
                  : "w-28 font-semibold   text-neutral-800 text-sm font-montserrat border-b border-gray-200 tracking-wide"
              }
            >
              Porciones
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setRenderProductos("bebidas");
                clearTotal();
              }}
              className={
                renderProducts !== "bebidas"
                  ? "w-28  font-medium font-montserrat text-sm text-gray-400"
                  : "w-28 font-semibold  text-neutral-800 text-sm font-montserrat border-b border-gray-200 tracking-wide"
              }
            >
              Bebidas
            </button>
          </div>
        </div>

        <div className="py-6">
          {
            renderProducts === "empanadas" && (
              <div className="p-2 bg-red-600 rounded-lg">
                <p className="text-sm font-medium font-montserrat text-white text-center">
                  Cada 12 empanadas o canastitas, tenes promo!
                </p>
              </div>
            )
          }

        </div>

        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 md:gap-x-4 lg:gap-x-4 mb-10">{renderStore(renderProducts)}</div>
        </div>

        <div className="relative flex justify-center">
          {(renderProducts === "empanadas" || renderProducts === "bebidas" || renderProducts === "porciones") && (
            orderPromo.length > 0 && (
              <div className="w-full fixed bottom-2 mx-auto px-3 md:w-4/5 lg:w-3/5">
                <div
                  className="flex justify-between items-center  rounded-lg mx-auto text-center   
									   w-full md:w-4/5 lg:w-3/5 p-3 bg-red-600  text-white text-base font-semibold "
                >
                  <button
                    onClick={() => addCartPromo(orderPromo)}
                    className={`${orderPromo.length < 1
                      ? "invisible"
                      : "p-2 px-3 font-medium font-montserrat bg-slate-50 rounded-lg text-neutral-800 text-sm hover:-translate-y-1 transition-all duration-500"
                      }`}
                  >
                    Agregar al carrito
                  </button>

                  <div className="flex items-center gap-x-5 text-white font-semibold">
                    <p className="font-medium text-xl">{totalPrice !== 0 && formatearNumero(totalPrice)}</p>
                    <div className=" h-10 w-10 rounded-lg bg-white flex justify-center items-center">
                      <p className="text-neutral-800 text-lg font-medium">{totalCant}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    </Layout>
  );
}
