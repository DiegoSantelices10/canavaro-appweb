/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import CardPromotion from "components/CardPromotion";
import Layout from "components/Layout";
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
import toast from "react-hot-toast";
import axios from "axios";
import { formatearNumero, totalExtrasProductos } from "libs/items";
import { getProducts, getPromo } from "services/fetchData";
import { setSetting } from "store/reducers/settingSlice";
import TabsCategories from "components/Tabs/TabsCategories";
import { categoriasNoDestacables, ordenarPorProductOrderIdHome } from "utils";
import { wrapper } from "store/app/store";


import PromotionBanner from "components/PromotionBanner";
import { motion } from "framer-motion";


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

    const promos = products?.filter(item => item.categoria?.toLowerCase() === "promociones");
    return promos?.filter(item => item.available === true).map(data => <CardPromotion key={data._id} data={data} />);
  };

  const renderCombos = () => {
    const filtrados = products?.filter(item => item.categoria?.toLowerCase() === 'combos' && item.available === true);
    const ordenados = ordenarPorProductOrderIdHome(filtrados);

    return ordenados.map(data => <CardPromotion key={data._id} data={data} />);
  };

  const renderStore = (renderProductos) => {
    const filtrados = products
      ?.filter(item => item.categoria?.toLowerCase() === renderProductos?.toLowerCase() && item.available === true);

    const ordenados = ordenarPorProductOrderIdHome(filtrados);

    return ordenados.map(data => <Card key={data._id} data={data} />);
  };

  const productosDestacables = products?.filter(product => {
    const category = product.categoria?.toLowerCase();
    return !categoriasNoDestacables.some(c => c.toLowerCase() === category);
  });


  useEffect(() => {
    (async () => {
      const { data, status } = await getPromo();
      if (status === 200) {
        const barra = data.find(item => item.nombre === "Promo Barra")
        const efectivo = data.find(item => item.nombre === "Promo efectivo")
        dispatch(setSetting({ promoBarra: barra, promoEfectivo: efectivo }));
        localStorage.setItem('promo efectivo', JSON.stringify(efectivo))
      }
    })()

  }, [])

  useEffect(() => {
    if (orderPromo !== null) {
      calculateEmpanadas();
    }
  }, [orderPromo]);

  useEffect(() => {

    dispatch(clearOrderPromo());
    dispatch(setQuantityDemanded(0));


    (async () => {
      const res = await axios.get("/api/promo");
      setDocenaPrice(res.data[0].precio)
    })();

    if (extras?.length <= 0) {
      const res = JSON.parse(localStorage.getItem("productos"));
      if (res) {
        const extras = res.filter(item => item.categoria?.toLowerCase() === 'extras' && item.available === true)
        dispatch(setExtras(extras))
      }
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
    const res = value.find(item => {
      const category = item.categoria?.toLowerCase();
      return category === "postres" || category === "bebidas" || category === "porciones";
    });

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


  const groupedProducts = productosDestacables
    .filter(producto => producto.available && producto.destacable)
    .reduce((acc, producto) => {
      if (!acc[producto.categoria]) {
        acc[producto.categoria] = [];
      }
      acc[producto.categoria].push(producto);
      return acc;
    }, {});


  return (
    <Layout>
      <div className="pt-24 mx-auto w-full relative">
        <PromotionBanner />

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold font-montserrat tracking-tight text-neutral-800">
              Nuestras Promociones
            </h2>
            <div className="h-1 w-12 bg-red-600 rounded-full"></div>
          </div>
          <div className="py-2">
            <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
              <style jsx global>
                {`
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                  .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                  }
                `}
              </style>
              {renderPromotions()}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-extrabold font-montserrat tracking-tight text-neutral-800">
              Nuestros Combos
            </h2>
            <div className="h-1 w-12 bg-red-600 rounded-full"></div>
          </div>
          <div className="py-2">
            <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
              {renderCombos()}
            </div>
          </div>
        </div>

        <div className="space-y-10 mt-4">
          {Object.entries(groupedProducts).map(([categoria, productosFiltrados]) => {
            return (
              <div key={categoria} className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-extrabold font-montserrat tracking-tight text-neutral-800 uppercase">
                    {categoria}
                  </h2>
                  <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2 py-1 rounded-full">
                    {productosFiltrados.length} Items
                  </span>
                </div>
                <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
                  {productosFiltrados.map((data) => (
                    <CardPromotion key={data._id} data={data} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sticky top-14 z-30 bg-white/80 backdrop-blur-md py-2 -mx-3 px-3 border-b border-neutral-100">
          <TabsCategories
            renderProducts={renderProducts}
            setRenderProductos={setRenderProductos}
            clearTotal={clearTotal} />
        </div>

        <div className="py-8">
          {
            renderProducts === "empanadas" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-lg">
                  ✨
                </div>
                <p className="text-sm font-semibold font-montserrat text-red-700">
                  ¡Promo activa! Llevando 12 empanadas o canastitas aplicamos precio especial automáticamente.
                </p>
              </motion.div>
            )
          }
          {
            renderProducts === "pizzas" && (
              <div className="w-full flex items-center justify-between bg-neutral-50 p-4 rounded-2xl border border-neutral-100 shadow-sm">
                <div>
                  <p className="text-left font-montserrat text-lg font-bold text-neutral-800">¡Armá tu pizza!</p>
                  <p className="text-xs text-neutral-500">Elegí tus ingredientes favoritos</p>
                </div>
                <Link href={"/order/pizzaFree"}>
                  <a
                    onClick={() => clearTotal()}
                    className="rounded-xl font-montserrat font-bold w-auto bg-red-600 hover:bg-red-700 transition-colors text-white shadow-lg shadow-red-200 p-3 text-sm px-6">
                    Empezar
                  </a>
                </Link>
              </div>
            )
          }
        </div>

        <div className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {renderStore(renderProducts)}
          </div>
        </div>

        <div className="relative flex justify-center">
          {(() => {
            const category = renderProducts?.toLowerCase();
            return category === "postres" || category === "empanadas" || category === "bebidas" || category === "porciones";
          })() && (
              orderPromo.length > 0 && (
                <div className="fixed bottom-8 left-0 right-0 mx-auto px-4 z-40 w-full sm:w-4/5 md:w-3/5 lg:w-1/2">
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex justify-between items-center rounded-3xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-4 bg-neutral-950/80 text-white border border-neutral-800 backdrop-blur-md"
                  >
                    <button
                      onClick={() => addCartPromo(orderPromo)}
                      className="px-6 py-3.5 font-bold font-montserrat bg-white rounded-2xl text-neutral-950 text-sm hover:bg-neutral-200 transition-all active:scale-95 shadow-lg"
                    >
                      Sumar al carrito
                    </button>

                    <div className="flex items-center gap-5">
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest mb-0.5">Subtotal</p>
                        <p className="font-extrabold text-2xl leading-none font-montserrat tracking-tight">
                          {totalPrice !== 0 && formatearNumero(totalPrice)}
                        </p>
                      </div>
                      <div className="h-14 w-14 rounded-2xl bg-neutral-800 flex justify-center items-center border border-neutral-700 shadow-inner">
                        <p className="text-white text-xl font-black">{totalCant}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

              )
            )}
        </div>

      </div>
    </Layout>

  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ res }) => {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
  const data = await getProducts();
  store.dispatch(setProductData(data));
  return {
    props: {
      data,
    },
  };
});