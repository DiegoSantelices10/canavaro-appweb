/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import CardPromotion from "components/CardPromotion";
import Layout from "components/Layout";
import { useSelector, useDispatch } from "react-redux";
import Card from "components/Card";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Head from "next/head";
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


export default function Home() {
  const [renderProducts, setRenderProductos] = useState("empanadas");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCant, setTotalCant] = useState(0);
  const [docenaPrice, setDocenaPrice] = useState(0);


  const { products, extras } = useSelector(state => state.product);
  const { orderPromo } = useSelector(state => state.order);
  const { promoEfectivo } = useSelector(state => state.setting);

  const idGenerator = uuidv4();

  const dispatch = useDispatch();
  const renderPromotions = () => {
    // eslint-disable-next-line dot-notation

    const promos = products?.filter(item => item.categoria === "promociones");
    return promos?.filter(item => item.available === true).map(data => <CardPromotion key={data._id} data={data} />);
  };

  const renderCombos = () => {
    const filtrados = products?.filter(item => item.categoria === 'Combos' && item.available === true);
    const ordenados = ordenarPorProductOrderIdHome(filtrados);

    return ordenados.map(data => <CardPromotion key={data._id} data={data} />);
  };

  const renderStore = (renderProductos) => {
    const filtrados = products
      ?.filter(item => item.categoria === renderProductos && item.available === true);

    const ordenados = ordenarPorProductOrderIdHome(filtrados);

    return ordenados.map(data => <Card key={data._id} data={data} />);
  };

  const productosDestacables = products?.filter(product => !categoriasNoDestacables.includes(product.categoria));


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
    const res = value.find(item => item.categoria === "Postres" || item.categoria === "bebidas" || item.categoria === "porciones");

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
    <>
      <Head>
        <title>Pizzería Canavaro | Pedí tus Pizzas y Empanadas Online</title>
        <meta name="description" content="Pedí rápido y fácil en Pizzería Canavaro. Conocé nuestras promociones y combos de pizzas, empanadas y postres." />
        <link rel="canonical" href="https://www.canavaro.com.ar/order/home" />
      </Head>
      <Layout>
        {/* ── Banner Efectivo ── */}
        {promoEfectivo?.available && promoEfectivo?.descuento > 0 && (
          <div className="bg-[#dc2626] mt-14 px-5 py-4 flex items-center justify-between gap-4 relative overflow-hidden after:content-[''] after:absolute after:right-[70px] after:-top-[30px] after:w-[120px] after:h-[120px] after:rounded-full after:bg-white/10 after:pointer-events-none shadow-sm">
            <div className="flex flex-col gap-0.5 z-10">
              <p className="text-white font-montserrat font-bold text-lg leading-tight">
                {promoEfectivo.descuento}% OFF en efectivo
              </p>
              <p className="text-white/80 text-xs font-medium font-montserrat mt-0.5">
                Aprovechá este descuento pagando al recibir tu pedido.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 z-10 shadow-inner">
              <span className="text-3xl drop-shadow-sm">💸</span>
            </div>
          </div>
        )}
        <div className=" px-3 w-full relative pb-6">


          {/* ── Promociones ── */}
          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-montserrat font-bold text-xl text-neutral-900 whitespace-nowrap">
                Nuestras Promociones
              </h2>
              <div className="flex-1 h-[2px] bg-[#dc2626] ml-3 rounded-[2px] max-w-[40px]" />
            </div>
            <div className="flex overflow-x-auto gap-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {renderPromotions()}
            </div>
          </div>

          {/* ── Combos ── */}
          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-montserrat font-bold text-xl text-neutral-900 whitespace-nowrap">
                Nuestros Combos
              </h2>
              <div className="flex-1 h-[2px] bg-[#dc2626] ml-3 rounded-[2px] max-w-[40px]" />
            </div>
            <div className="flex overflow-x-auto gap-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {renderCombos()}
            </div>
          </div>

          {/* ── Destacados por categoría ── */}
          <div className="space-y-7 mt-7">
            {Object.entries(groupedProducts).map(([categoria, productosFiltrados]) => (
              <div key={categoria}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-montserrat font-bold text-xl text-neutral-900 whitespace-nowrap">
                    {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </h2>
                  <div className="flex-1 h-[2px] bg-[#dc2626] ml-3 rounded-[2px] max-w-[40px]" />
                </div>
                <div className="flex overflow-x-auto gap-4 pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  {productosFiltrados.map((data) => (
                    <CardPromotion key={data._id} data={data} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Tabs de categorías (sticky) ── */}
          <div className="sticky top-[44px] z-40 bg-white -mx-3 px-3 pt-3 pb-2 border-b border-gray-100 mt-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <TabsCategories
              renderProducts={renderProducts}
              setRenderProductos={setRenderProductos}
              clearTotal={clearTotal}
            />
          </div>

          {/* ── Aviso por categoría ── */}
          <div className="pt-4 pb-2">
            {renderProducts === "empanadas" && (
              <div className="bg-[#fff5f5] border border-[#fecaca] rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <div className="bg-[#dc2626] w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white text-base">✨</span>
                </div>
                <p className="text-sm font-montserrat font-semibold text-red-700 leading-snug">
                  Llevando 12 empanadas o canastitas se aplica precio especial automáticamente.
                </p>
              </div>
            )}

            {renderProducts === "pizzas" && (
              <div className="bg-gradient-to-br from-[#fef2f2] to-[#fee2e2] border border-[#fecaca] rounded-2xl p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="font-montserrat text-base font-bold text-neutral-800">
                    🍕 ¡Armá tu pizza!
                  </p>
                  <p className="text-xs text-gray-400 font-montserrat mt-0.5">
                    Elegí los gustos que más te gusten
                  </p>
                </div>
                <Link href={"/order/pizzaFree"}>
                  <a
                    onClick={() => clearTotal()}
                    className="rounded-xl font-montserrat font-semibold bg-red-600 hover:bg-red-700 whitespace-nowrap text-white text-sm py-2.5 px-5 transition-colors duration-200 shadow-sm"
                  >
                    Comenzar
                  </a>
                </Link>
              </div>
            )}
          </div>

          {/* ── Grid de productos ── */}
          <div className="mb-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 md:gap-x-4 lg:gap-x-4">
              {renderStore(renderProducts)}
            </div>
          </div>

          {/* ── Barra flotante inferior ── */}
          {(renderProducts === "Postres" || renderProducts === "empanadas" || renderProducts === "bebidas" || renderProducts === "porciones") &&
            orderPromo.length > 0 && (
              <div className="w-full fixed bottom-3 left-0 px-3 z-50 flex justify-center">
                <div className="bg-[#dc2626] shadow-[0_-4px_24px_rgba(220,38,38,0.18)] flex justify-between items-center rounded-2xl w-full max-w-lg p-3 px-4 text-white">
                  <button
                    onClick={() => addCartPromo(orderPromo)}
                    className="p-2 px-5 font-semibold font-montserrat bg-white rounded-xl text-neutral-800 text-sm hover:-translate-y-0.5 active:scale-95 transition-all duration-200 shadow-sm"
                  >
                    Agregar al carrito
                  </button>
                  <div className="flex items-center gap-x-4">
                    <p className="font-bold text-lg font-montserrat">
                      {totalPrice !== 0 && formatearNumero(totalPrice)}
                    </p>
                    <div className="h-10 w-10 rounded-xl bg-white/20 flex justify-center items-center backdrop-blur-sm">
                      <p className="text-white text-lg font-bold">{totalCant}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

        </div>
      </Layout>
    </>
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