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
import { categoriasNoDestacables } from "utils";
import { wrapper } from "store/app/store";


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

    const promos = products?.filter(item => item.categoria === "promociones");
    return promos?.filter(item => item.available === true).map(data => <CardPromotion key={data._id} data={data} />);
  };

  const renderStore = renderProductos => {
    return products
      ?.filter(item => item.categoria === renderProductos && item.available === true)
      ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map(data => <Card key={data._id} data={data} />);
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
    <Layout>
      <div className="pt-[40px] mx-auto w-full rounded-3xl relative">

        <>
          <h1 className="text-base font-bold font-montserrat tracking-wide text-neutral-800 mt-6">Nuestras promociones</h1>
          <div className="py-2 ">
            <div className="flex overflow-x-scroll top-0 flexp h-auto p-0.5 space-x-6 w-full">
              <style jsx>
                {`
              .flexp::-webkit-scrollbar-thumb {
                background: #f4f4f4;
                border-radius: 20px;
              }

              .flexp::-webkit-scrollbar {
                height: 4px;
              }
            `}
              </style>

              {renderPromotions()}
            </div>
          </div>
        </>

        <div className="space-y-4 mt-4">
          {Object.entries(groupedProducts).map(([categoria, productosFiltrados]) => {
            return (
              <div key={categoria}>
                <p className="text-base font-bold font-montserrat tracking-wide text-neutral-800">
                  {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                </p>
                <div className="flex overflow-x-scroll flexp space-x-6 w-full py-2">
                  <style jsx>
                    {`
                .flexp::-webkit-scrollbar-thumb {
                  background: #f4f4f4;
                  border-radius: 20px;
                }
                .flexp::-webkit-scrollbar {
                  height: 4px;
                }
              `}
                  </style>
                  {productosFiltrados.map((data) => (
                    <CardPromotion key={data._id} data={data} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <TabsCategories
          renderProducts={renderProducts}
          setRenderProductos={setRenderProductos}
          clearTotal={clearTotal} />
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
          {
            renderProducts === "pizzas" && (
              <div className="w-full flex items-center justify-between">
                <div>
                  <p className="text-left w-full font-montserrat text-base font-semibold">¡Arma tu pizza!</p>
                </div>
                <Link href={"/order/pizzaFree"}>
                  <a
                    onClick={() => clearTotal()}
                    className="rounded-lg font-montserrat font-normal w-auto bg-red-600 hover:bg-red-500 whitespace-nowrap  text-white  shadow-md p-2 text-sm px-4">
                    Ingresa aqui
                  </a>
                </Link>

              </div>
            )
          }

        </div>

        <div>
          <div
            className="grid md:grid-cols-2 lg:grid-cols-2 md:gap-x-4 lg:gap-x-4 mb-10">
            {renderStore(renderProducts)}
          </div>
        </div>

        <div className="relative flex justify-center">
          {(renderProducts === "Postres" || renderProducts === "empanadas" || renderProducts === "bebidas" || renderProducts === "porciones") && (
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