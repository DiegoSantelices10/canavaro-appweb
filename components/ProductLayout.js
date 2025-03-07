/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import PizzaInfo from "./PizzaInfo";
import { v4 as uuidv4 } from "uuid";


import { toast, Toaster } from "react-hot-toast";

import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";


import {
  addProductPizza,
  calculateSubTotal,
  calculateTotalQuantity,
  addPromoOrderList,
  clearOrderPromo,
  decrementProductPizza,
  setQuantityDemanded,
  clearDrinks,
} from "store/reducers/orderSlice";

import { useDispatch, useSelector } from "react-redux";
import ModalMessage from "./ModalMessage";
import { formatearNumero, totalExtrasProductos } from "libs/items";
import Promotion from "./Promotion";

export default function ProductLayout({
  data,
  data: { _id, nombre, descripcion, categoria, cantidadMaxima, imagen, tamanio, precio, cantidadExtras },
}) {
  const { orderPromo, orderList, quantityDemanded, bebidas, quantityDemandedDrinks } = useSelector(state => state.order);
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
    if (data.addEmpanadas === 'si' && data.addExtras === 'si') {
      if (quantityDemanded < 1 && quantityDemandedDrinks < 1 && orderPromo.length > 0) {
        return true;
      }
      return false;
    }

    if (data.addEmpanadas === 'si') {
      if (quantityDemanded < 1 && orderPromo.length > 0) {
        return true;
      }
      return false;
    }

    if (data.addExtras === 'si') {
      if (quantityDemandedDrinks < 1 && bebidas.length > 0) {
        return true;
      }
      return false;
    }



    if (orderPromo.some(item => item.categoria === 'pizzas')) {
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
    dispatch(clearDrinks());
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
        toast.success("Se agrego al pedido!");
        dispatch(addPromoOrderList(promo));
        router.push("/order/home");
      } else if (data.addExtras === 'si') {
        const promo = {
          _id: idGenerator,
          nombre,
          descripcion,
          products: [...value, ...bebidas],
          categoria,
          cantidadExtras,
          comentarios: comentarioRef.current.value,
          cantidadMaxima,
          precio: precio + totalExtra,
          cantidad: 1,
        };
        toast.success("Se agrego al pedido!");
        dispatch(addPromoOrderList(promo));
        router.push("/order/home");
      } else {
        const promo = {
          _id: idGenerator,
          nombre,
          descripcion,
          products: [...value],
          categoria,
          cantidadExtras,
          comentarios: comentarioRef.current.value,
          cantidadMaxima,
          precio: precio + totalExtra,
          cantidad: 1,
        };
        toast.success("Se agrego al pedido!");
        dispatch(addPromoOrderList(promo));
        router.push("/order/home");
      }
    } else {

      if (extraPizza.length > 0) {
        value.map(item => {
          if (item.categoria !== 'extras') {
            dispatch(addPromoOrderList({
              ...item,
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
        router.push("/order/home");
      } else if (bebidas.length > 0) {
        const promo = {
          _id: idGenerator,
          nombre,
          descripcion,
          products: [...bebidas],
          categoria,
          comentarios: comentarioRef.current.value,
          cantidadExtras,
          precio: precio + totalExtra,
          cantidad: 1,
        };
        toast.success("Se agrego al pedido!");
        dispatch(addPromoOrderList(promo));
        router.push("/order/home");
      } else {
        value.map(item => dispatch(addPromoOrderList({ ...item })))
        toast.success("Se agrego al pedido!");
        router.push("/order/home");
      }

      dispatch(clearDrinks());
      dispatch(clearOrderPromo());
      dispatch(setQuantityDemanded(0));
    }
  }

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
      if (orderPromo[0].cantidad === 1 && data.addExtras !== 'si') {
        setInfo({
          title: "Extras a tu pizza",
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
    <div className="relative  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5">
      <Toaster />

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
      <img
        src={imagen?.url || "/images/sin-imagen-id.png"}
        className="z-0 inset-0  bg-green-300 object-contain"
        alt={nombre}
      />

      <button
        onClick={returnHome}>
        <FiChevronsLeft className="absolute text-neutral-800 bg-slate-50  rounded-md shadow p-1 top-6 left-6" size={30} />
      </button>

      <div className="w-full bg-white rounded-t-3xl p-4 relative -mt-20 z-40">
        <div className="flex flex-col w-full ">
          <div className="w-full ">
            <h1 className="font-semibold text-lg font-montserrat text-zinc-800">{nombre}</h1>
            <p className=" font-normal text-sm  text-gray-400 font-montserrat">{descripcion}</p>
            <p className=" font-normal font-montserrat text-sm text-gray-400">{formatearNumero(precio)}</p>
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
          <label className="pb-1 font-montserrat font-medium text-sm text-gray-600">
            Comentarios
            <input
              id="comentarios"
              name="comentarios"
              type="text"
              ref={comentarioRef}
              className="border border-gray-200 rounded-lg w-full p-2"
            />
          </label>
        </div>
      </div>
      <div className="fixed bottom-3 z-50 mx-auto flex justify-center w-full sm:w-4/5 md:w-3/5 lg:w-2/5 px-4">
        <button
          className={`${result() > 0
            ? "flex justify-center gap-3 text-center font-montserrat rounded-lg w-full p-4 bg-red-600 hover:-translate-y-1 transition-all duration-500 text-white text-base font-medium"
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