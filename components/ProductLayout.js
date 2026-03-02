/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, useCallback } from "react";
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
  clearPostres,
} from "store/reducers/orderSlice";

import { useDispatch, useSelector } from "react-redux";
import ModalMessage from "./ModalMessage";
import { formatearNumero, totalExtrasProductos } from "libs/items";
import Promotion from "./Promotion";

export default function ProductLayout({
  data,
  data: { _id, nombre, descripcion, categoria, cantidadMaxima, imagen, precio, cantidadExtras, cantidadPostres },
}) {
  const { orderPromo, orderList, quantityDemanded, bebidas, quantityDemandedDrinks, postres, quantityDemandedPostres } = useSelector(state => state.order);
  const { extras } = useSelector(state => state.product);

  const [selectCombo, setSelectCombo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [extraPizza, setExtraPizza] = useState([]);
  const [info, setInfo] = useState({ title: "", description: "", status: true });
  const [isNavigating, setIsNavigating] = useState(false);

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

  // Función para determinar si el botón "Agregar al Carrito" debe mostrarse
  const canAddToCart = useCallback(() => {
    // Si ya estamos navegando, no mostrar el botón
    if (isNavigating) return false;

    if (data.addEmpanadas === 'si' && data.addExtras === 'si') {
      return quantityDemanded < 1 && quantityDemandedDrinks < 1 && orderPromo.length > 0;
    }

    if (data.addEmpanadas === 'si') {
      return quantityDemanded < 1 && orderPromo.length > 0;
    }

    if (data.addExtras === 'si') {
      return quantityDemandedDrinks < 1 && bebidas.length > 0;
    }

    if (data.addPostres === 'si') {
      return quantityDemandedPostres < 1 && postres.length > 0;
    }

    if (orderPromo.some(item => item.categoria === 'pizzas')) {
      return true;
    }

    if (quantityDemanded > 0) {
      return true;
    }

    return false;
  }, [isNavigating, data, quantityDemanded, quantityDemandedDrinks, quantityDemandedPostres, orderPromo, bebidas, postres]);

  const incrementCartPizza = data => {
    dispatch(addProductPizza(data));
  };

  const decrementCartPizza = data => {
    dispatch(decrementProductPizza(data));
  };

  const returnHome = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    dispatch(clearDrinks());
    dispatch(clearPostres());
    dispatch(clearOrderPromo());
    router.push("/order/home");
  };

  // Obtener comentarios de forma segura
  const getComentarios = () => {
    return comentarioRef.current?.value || "";
  };

  // Limpiar todo el estado de la promo
  const cleanPromoState = () => {
    dispatch(clearDrinks());
    dispatch(clearPostres());
    dispatch(clearOrderPromo());
    dispatch(setQuantityDemanded(0));
  };

  // Navegar al home de forma segura (evitar doble navegación)
  const safeNavigateHome = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    toast.success("Se agregó al pedido!");
    router.push("/order/home");
  };

  const addCartPromo = (value) => {
    // Evitar doble ejecución
    if (isNavigating) return;

    const idGenerator = uuidv4();
    const totalExtra = totalExtrasProductos(value);
    const comentarios = getComentarios();

    if (data.addEmpanadas === "si") {
      const basePromo = {
        _id: idGenerator,
        nombre,
        descripcion,
        categoria,
        comentarios,
        cantidadMaxima,
        cantidad: 1,
      };

      if (selectCombo) {
        // Promo con combo seleccionado + empanadas
        dispatch(addPromoOrderList({
          ...basePromo,
          products: [selectCombo, ...value],
          precio: precio + totalExtra,
        }));
      } else if (data.addExtras === 'si' || data.addPostres === 'si') {
        // Promo con empanadas + bebidas/postres
        dispatch(addPromoOrderList({
          ...basePromo,
          products: [
            ...value,
            ...(Array.isArray(bebidas) && bebidas.length > 0 ? bebidas : []),
            ...(Array.isArray(postres) && postres.length > 0 ? postres : []),
          ],
          cantidadPostres,
          cantidadExtras,
          precio: precio + totalExtra,
        }));
      } else {
        // Promo solo con empanadas
        dispatch(addPromoOrderList({
          ...basePromo,
          products: [...value],
          cantidadExtras,
          precio: precio + totalExtra,
        }));
      }

      // Limpiar estado y navegar
      cleanPromoState();
      safeNavigateHome();

    } else {
      // No es promo de empanadas
      if (extraPizza.length > 0) {
        value.forEach(item => {
          if (item.categoria !== 'extras') {
            dispatch(addPromoOrderList({
              ...item,
              comentarios,
              precio: item.precio + extraPizza.reduce((total, extra) => total + (extra.precio || 0), 0),
              extra: `${extraPizza.map(extra => extra.nombre).join(', ')}`
            }));
          } else {
            dispatch(addPromoOrderList({ ...item }));
          }
        });
      } else if (bebidas.length > 0 || postres.length > 0) {
        dispatch(addPromoOrderList({
          _id: idGenerator,
          nombre,
          descripcion,
          products: [
            ...(Array.isArray(bebidas) && bebidas.length > 0 ? bebidas : []),
            ...(Array.isArray(postres) && postres.length > 0 ? postres : []),
          ],
          cantidadPostres,
          categoria,
          comentarios,
          cantidadExtras,
          precio: precio + totalExtra,
          cantidad: 1,
        }));
      } else {
        value.forEach(item => dispatch(addPromoOrderList({
          ...item,
          comentarios,
        })));
      }

      // Limpiar estado y navegar
      cleanPromoState();
      safeNavigateHome();
    }
  };

  const handleCloseModal = () => {
    if (isNavigating) return;
    setShowModal(false);
    // addCartPromo ya se encarga de limpiar estado y navegar
    addCartPromo(orderPromo);
  };

  const addExtra = (item) => {
    setExtraPizza(prev => [...prev, item]);
  };

  const openModal = () => {
    if (isNavigating) return;

    if (extras && extras.length > 0 && orderPromo.length === 1) {
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
  };

  return (
    <div className="relative  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-1/2">
      <Toaster />

      {showModal && (
        <ModalMessage
          showModal={showModal}
          handleClose={handleCloseModal}
          addExtra={addExtra}
          orderPromo={orderPromo}
          extraPizza={extraPizza}
          info={info}
          extras={extras || []}
          setShowModal={setShowModal}
        />
      )}
      <div className="w-full relative h-80 overflow-hidden rounded-b-xl">
        {/* Fondo blureado */}
        <img
          src={imagen?.url || "/images/sin-imagen-center.png"}
          alt={`fondo-${nombre}`}
          className="absolute top-0 left-0 w-full h-full object-cover filter blur-md scale-110 z-0"
        />

        {/* Imagen principal */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <img
            src={imagen?.url || "/images/sin-imagen-center.png"}
            className="object-contain max-h-full"
            alt={nombre}
          />
        </div>
      </div>

      <button
        onClick={returnHome}>
        <FiChevronsLeft className="absolute z-50 text-neutral-800 bg-slate-50  rounded-md shadow p-1 top-6 left-6" size={30} />
      </button>

      <div className="w-full p-4 relative  z-40">
        <div className="flex flex-col w-full ">
          <div className="w-full  p-2 rounded-lg shadow">
            <h1 className="font-bold font-montserrat text-neutral-800">{nombre}</h1>
            <p className=" font-medium text-sm  text-gray-400 font-montserrat">{descripcion}</p>
            <p className=" font-medium font-montserrat text-sm text-gray-400">{formatearNumero(precio)}</p>
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
      <div className="fixed bottom-3 z-50 mx-auto flex justify-center w-full sm:w-4/5 md:w-3/5 lg:w-1/2 px-4">
        <button
          className={`${canAddToCart()
            ? "flex justify-center gap-3 text-center font-montserrat rounded-lg w-full p-4 bg-red-600 hover:-translate-y-1 transition-all duration-500 text-white text-base font-medium"
            : "invisible"
            } `}
          onClick={() => {
            openModal();
          }}
          disabled={isNavigating}
        >
          Agregar al Carrito
          <FiShoppingCart size={23} />{" "}
        </button>
      </div>
    </div>
  );
}