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
} from "store/reducers/orderSlice";

import { v4 as uuidv4 } from "uuid";
import { setProductData } from "store/reducers/productSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


export default function Home() {
  const [renderProducts, setRenderProductos] = useState("empanadas");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCant, setTotalCant] = useState(0);
  const [docenaPrice, setDocenaPrice] = useState(0);


  const { products } = useSelector(state => state.product);
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

  useEffect(() => {
    if (orderPromo !== null) {
      calculateEmpanadas();
    }
  }, [orderPromo]);

  useEffect(() => {
    if (products?.length <= 0) {
      const res = JSON.parse(localStorage.getItem("productos"));
      dispatch(setProductData(res));
    }

   (async () => {
    const res = await axios.get("/api/promo");
    setDocenaPrice(res.data[0].precio)
   })(); 
  }, []);


  const calculateEmpanadas = () => {
    const requiredQuantity = 12;
    let priceU;
    const array = [];
    let cantidadTotal = 0;

    if (orderPromo.length > 0) {
      orderPromo.map(({ cantidad, precio }) => {
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
     const cantDocena = cantidadTotal / requiredQuantity;
     const total = cantDocena * docenaPrice;
      setTotalPrice(total)
      // const totalDescuento = totalAmount - totalAmount * 0.10;
      // const totalRedondeado = Math.ceil(totalDescuento / 100) * 100;
      // if (cantidadTotal === requiredQuantity) setDocenaPrice(totalRedondeado);
      // setTotalPrice(totalRedondeado);
    }

    if (cantidadTotal > requiredQuantity && cantidadTotal % requiredQuantity !== 0) {
      let docenaCant = cantidadTotal / requiredQuantity;
      docenaCant = Math.floor(docenaCant)
      const resto = cantidadTotal % requiredQuantity;
      let subtotal;

      if(docenaCant > 0) {
        subtotal = docenaCant * docenaPrice;
      }
      const total = resto * priceU;
      // const cociente = Math.floor(cantidadTotal / requiredQuantity);
      // const result = cociente * docenaPrice;
      // const resto = cantidadTotal % requiredQuantity;
      // const total = result + resto * priceU;
      setTotalPrice(subtotal + total);
    }
  };

  const addCartPromo = value => {
    const res = value.find(item => item.categoria === "bebidas");

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
      <Toaster/>
      <div className="py-4 mt-14 mx-auto w-full ">
        <h1 className="text-lg  font-bold font-poppins text-neutral-800 px-3 pb-1 ">Nuestros combos</h1>
        <div className="flex overflow-x-scroll flexp h-60   space-x-6 w-full p-2">
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
        <div className="my-6">
          <div className="w-full  p-3 flex items-center justify-between">
            <p className="text-left w-full font-poppins text-base  font-semibold">¡ Arma tu pizza como quieras !</p>
            <Link href={"/order/pizzaFree"}>
              <a className="rounded-md font-nunito font-semibold w-auto bg-red-600 hover:bg-white hover:text-sky-800 whitespace-nowrap  text-white  shadow-md p-2 text-sm px-4">
                Ingresa aqui
              </a>
            </Link>
          </div>
        </div>
        <div className="flex overflow-x-scroll flexp justify-between space-x-2 w-full p-2 my-2">
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
                  ? "w-56  font-medium font-poppins text-gray-400"
                  : "w-56 font-medium bg-white text-neutral-800 font-poppins border-b border-gray-300 tracking-wide"
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
                  ? "w-32  font-medium font-poppins text-gray-400"
                  : "w-32 font-medium bg-white text-neutral-800 font-poppins border-b border-gray-300 tracking-wide"
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
                  ? "w-32  font-medium font-poppins text-gray-400"
                  : "w-32 font-medium  bg-white text-neutral-800 font-poppins border-b border-gray-300 tracking-wide"
              }
            >
              Promociones
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
                  ? "w-32  font-medium font-poppins text-gray-400"
                  : "w-32 font-medium  bg-white text-neutral-800 font-poppins border-b border-gray-300 tracking-wide"
              }
            >
              Bebidas
            </button>
          </div>
        </div>

        <div className="pt-3">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-1 mb-16">{renderStore(renderProducts)}</div>
        </div>
        {(renderProducts === "empanadas" || renderProducts === "bebidas") && (
          <div className="w-full px-2 fixed bottom-2    sm:w-4/5 md:w-4/5 lg:w-3/5">
            <div
              className="flex justify-between items-center gap-3 rounded-xl mx-auto text-center   
									   w-full md:w-1/2 lg:w-3/5 p-4 bg-red-600  text-white text-base font-semibold "
            >
              <button
                onClick={() => addCartPromo(orderPromo)}
                className={`${
                  orderPromo.length < 1
                    ? "invisible"
                    : "p-3 px-4 font-semibold font-nunito bg-slate-50 rounded-md text-neutral-800 text-sm hover:-translate-y-1 transition-all duration-500"
                }`}
              >
                Agregar al carrito
              </button>

              <div className="flex items-center gap-x-5 text-white font-semibold pr-4">
                <p className="font-semibold text-xl">$ {totalPrice}</p>
                <div className=" h-10 w-10 rounded-lg bg-white flex justify-center items-center">
                  <p className="text-neutral-800 text-lg font-bold">{totalCant}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
