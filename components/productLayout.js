/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import PizzaInfo from "./pizzaInfo";
import Promotion from "./promotion";
import { v4 as uuidv4 } from "uuid";


import { Toaster, toast } from "react-hot-toast";

import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";


import {
  addProductPizza,
  calculateSubTotal,
  calculateTotalQuantity,
  addPromoOrderList,
  clearOrderPromo,
  decrementProductPizza,
  setQuantityDemanded,
} from "store/reducers/orderSlice";

import { useDispatch, useSelector } from "react-redux";
import ModalMessage from "./modalMessage";
import { formatearNumero, totalExtrasProductos } from "libs/items";
export default function ProductLayout({
  data,
  data: { _id, nombre, descripcion, categoria, cantidadMaxima, imagen, tamanio, precio },
}) {
  const { orderPromo, orderList, quantityDemanded } = useSelector(state => state.order);
  const { extras } = useSelector(state => state.product);

  const [selectCombo, setSelectCombo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [extraPizza, setExtraPizza] = useState([]);
  const [info, setInfo] = useState({ title: "", description: "", status: true });

  const comentarioRef = useRef();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
  }, [orderList, dispatch]);

  const productQuantity = _id => {
    const pre = orderPromo.find(item => item._id === _id);
    return pre?.cantidad ? pre.cantidad : 0;
  };

  const result = () => {
    if (data.addEmpanadas === 'si') {
      console.log('empanadas', data.addEmpanadas);
      if (quantityDemanded < 1 && orderPromo.length > 0) {
        return true;
      }
      return false;
    }
    if (orderPromo.some(item => item.categoria === 'pizzas')) {
      console.log('pizzas');
      return true;
    }

    if (quantityDemanded > 0) {
      return true;
    }
    return false;
  };


  const incrementCartPizza = data => {
    dispatch(addProductPizza(data));
  };

  const decrementCartPizza = data => {
    dispatch(decrementProductPizza(data));
  };

  const returnHome = () => {
    dispatch(clearOrderPromo());
    router.push("/order/home");
  };

  const addCartPromo = value => {
    const idGenerator = uuidv4();
    const totalExtra = totalExtrasProductos(value)
    if (data.addEmpanadas === "si") {
      if (selectCombo) {
        const promo = {
          _id: idGenerator,
          nombre,
          descripcion,
          products: [selectCombo, ...value],
          categoria,
          comentarios: comentarioRef.current.value,
          cantidadMaxima,
          precio: precio + totalExtra,
          cantidad: 1,
        };
        dispatch(addPromoOrderList(promo));
        toast.success("Se agrego al pedido!");
      } else {
        const promo = {
          _id: idGenerator,
          nombre,
          descripcion,
          products: [...value],
          categoria,
          comentarios: comentarioRef.current.value,
          cantidadMaxima,
          precio: precio + totalExtra,
          cantidad: 1,
        };
        dispatch(addPromoOrderList(promo));
        toast.success("Se agrego al pedido!");
      }
    } else {
      value.map(item => {
        if (item.categoria !== 'extras') {
          dispatch(addPromoOrderList({
            ...item,
            _id: idGenerator,
            comentarios: comentarioRef.current.value,
            precio: item.precio + extraPizza.reduce((total, extra) => total + extra.precio, 0),
            extra: `${extraPizza.map(extra => extra.nombre).join(', ')}`
          }))
        }
        if (item.categoria === 'extras') {
          return (
            dispatch(addPromoOrderList({
              ...item,
            }))
          )
        }
        return null;
      }

      );
      toast.success("Se agrego al pedido!");
    }

    dispatch(clearOrderPromo());
    dispatch(setQuantityDemanded(0));
    router.push("/order/home");
  };

  const handleCloseModal = () => {
    addCartPromo(orderPromo);
    setShowModal(false);
    dispatch(clearOrderPromo());
    router.push("/order/home");
  };

  const addExtra = (item) => {
    setExtraPizza([...extraPizza, item]);
  }

  const openModal = () => {
    if (extras.length > 0 && orderPromo.length === 1) {
      if (orderPromo[0].cantidad === 1) {
        setInfo({
          title: "Agrega extras a tu pizza",
        });
        setShowModal(true);
      } else {
        addCartPromo(orderPromo);
      }
    } else {
      addCartPromo(orderPromo);
    }
  }
  return (
    <div className="relative min-h-screen  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-5/12 ">
      {showModal && (
        <ModalMessage
          showModal={showModal}
          handleClose={handleCloseModal}
          addExtra={addExtra}
          orderPromo={orderPromo}
          extraPizza={extraPizza}
          info={info}
          extras={extras}
          setShowModal={setShowModal}
        />
      )}
      <Toaster />
      <Image
        src={imagen?.url || "/images/sin-imagen-id.png"}
        layout="responsive"
        className="-z-10"
        objectFit="contain"
        objectPosition="top"
        width={300}
        height={300}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={nombre} />

      <button
        onClick={returnHome}>
        <FiChevronsLeft className="absolute text-neutral-800 bg-slate-50  rounded-md shadow p-1 top-6 left-6" size={30} />
      </button>
      <div className="w-full h-auto bg-white rounded-t-3xl -mt-52 sm:-mt-72 md:-mt-80 lg:-mt-80 p-4">
        <div className="flex flex-col w-full ">
          <div className="w-full ">
            <h1 className="font-bold text-lg font-poppins text-zinc-800">{nombre}</h1>
            <p className=" font-normal text-sm  text-gray-400 font-poppins">{descripcion}</p>
            {categoria === "promociones" && (
              <p className=" font-normal font-poppins text-sm text-gray-400">{formatearNumero(precio)}</p>
            )}
            <hr className="mt-4" />
          </div>
          <div className="text-sm font-semibold text-left my-1 z-20 ">
            {categoria === "pizzas" ? (
              <div className=" flex flex-col gap-y-2  justify-evenly">
                <PizzaInfo
                  data={data}
                  incrementCart={incrementCartPizza}
                  decrementCart={decrementCartPizza}
                  cart={orderPromo}
                />
              </div>
            ) : (
              <Promotion
                setSelectCombo={setSelectCombo}
                data={data}
                quantity={productQuantity}
                cantMax={cantidadMaxima}
              />
            )}
          </div>
        </div>

        <div className="font-normal text-left text-sm pb-24 pt-5 max-h-full">
          <label className="pb-1 font-poppins font-medium text-sm text-gray-600">
            Comentarios
            <input
              id="comentarios"
              name="comentarios"
              type="text"
              ref={comentarioRef}
              className="border border-gray-300 rounded-xl w-full p-2"
            />
          </label>
        </div>
      </div>

      <div className=" w-full fixed bottom-0 p-4 z-20  sm:w-4/5 md:w-3/5 lg:w-2/5">
        <button
          className={`${result() > 0
            ? "flex justify-center gap-3 text-center font-poppins rounded-2xl w-full p-4 bg-red-600 hover:-translate-y-1 transition-all duration-500 text-white text-base font-semibold"
            : "invisible"
            } `}
          onClick={() => {
            openModal();
          }}
        >
          Agregar al Carrito
          <FiShoppingCart size={23} />{" "}
        </button>
      </div>
    </div>
  );
}
