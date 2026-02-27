/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import PizzaInfo from "./PizzaInfo";
import { v4 as uuidv4 } from "uuid";
import { toast, Toaster } from "react-hot-toast";
import { FiShoppingCart, FiChevronLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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
  data: { _id, nombre, descripcion, categoria, cantidadMaxima, imagen, precio, cantidadExtras, cantidadPostres, addEmpanadas, addExtras, addPostres },
}) {
  const { orderPromo, quantityDemanded, quantityDemandedDrinks, quantityDemandedPostres, bebidas, postres } = useSelector(state => state.order);
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
  }, [orderPromo, bebidas, postres, dispatch]);

  const result = () => {
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
    if (orderPromo.some(item => item.categoria?.toLowerCase() === 'pizzas')) {
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
    const totalExtra = totalExtrasProductos(value);

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
        toast.success("¡Agregado al pedido!");
        dispatch(addPromoOrderList(promo));
        router.push("/order/home");
      } else {
        const promo = {
          _id: idGenerator,
          nombre,
          descripcion,
          products: [
            ...value,
            ...(Array.isArray(bebidas) && bebidas.length > 0 ? bebidas : []),
            ...(Array.isArray(postres) && postres.length > 0 ? postres : []),
          ],
          categoria,
          cantidadPostres,
          cantidadExtras,
          comentarios: comentarioRef.current.value,
          cantidadMaxima,
          precio: precio + totalExtra,
          cantidad: 1,
        };
        toast.success("¡Agregado al pedido!");
        dispatch(addPromoOrderList(promo));
        router.push("/order/home");
      }
    } else {
      if (extraPizza.length > 0) {
        value.map(item => {
          if (item.categoria?.toLowerCase() !== 'extras') {
            dispatch(addPromoOrderList({
              ...item,
              comentarios: comentarioRef.current.value,
              precio: item.precio + extraPizza.reduce((total, extra) => total + extra.precio, 0),
              extra: `${extraPizza.map(extra => extra.nombre).join(', ')}`
            }))
          } else {
            dispatch(addPromoOrderList({ ...item }));
          }
          return null;
        });
        toast.success("¡Agregado al pedido!");
        router.push("/order/home");
      } else if (bebidas.length > 0 || postres.length > 0) {
        const promo = {
          _id: idGenerator,
          nombre,
          descripcion,
          products: [
            ...(Array.isArray(bebidas) && bebidas.length > 0 ? bebidas : []),
            ...(Array.isArray(postres) && postres.length > 0 ? postres : []),
          ],
          cantidadPostres,
          categoria,
          comentarios: comentarioRef.current.value,
          cantidadExtras,
          precio: precio + totalExtra,
          cantidad: 1,
        };
        toast.success("¡Agregado al pedido!");
        dispatch(addPromoOrderList(promo));
        router.push("/order/home");
      } else {
        value.map(item => dispatch(addPromoOrderList({
          ...item,
          comentarios: comentarioRef.current.value,
        })))
        toast.success("¡Agregado al pedido!");
        router.push("/order/home");
      }

      dispatch(clearDrinks());
      dispatch(clearPostres());
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
        setInfo({ title: "Extras a tu pizza" });
        setShowModal(true);
      } else {
        addCartPromo(orderPromo);
      }
    } else {
      addCartPromo(orderPromo);
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      <Toaster />

      <AnimatePresence>
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
      </AnimatePresence>

      {/* Header Section */}
      <div className="relative w-full max-w-2xl mx-auto h-80 sm:h-96 md:h-[450px] md:mt-4 md:rounded-[40px] overflow-hidden shadow-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-0"
        >
          {/* Fondo desenfocado para ambiente */}
          <img
            src={imagen?.url || "/images/sin-imagen-center.png"}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-50"
          />

          {/* Imagen principal */}
          <img
            src={imagen?.url || "/images/sin-imagen-center.png"}
            alt={nombre}
            className="relative z-10 w-full h-full object-cover brightness-[0.9]"
          />

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/0 via-transparent to-black/20" />
        </motion.div>

        <button
          onClick={returnHome}
          className="absolute top-6 left-6 z-30 w-10 h-10 flex items-center justify-center bg-neutral-950/80 backdrop-blur-md rounded-xl text-white shadow-xl active:scale-90 transition-transform"
        >
          <FiChevronLeft size={24} />
        </button>
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 -mt-10 bg-white rounded-t-[40px] px-6 pt-8 pb-32 max-w-2xl mx-auto shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"
      >
        <div className="flex flex-col mb-8">
          <div className="flex justify-between items-start gap-4">
            <h1 className="font-black font-montserrat text-neutral-900 text-2xl sm:text-3xl tracking-tight leading-tight uppercase">
              {nombre}
            </h1>
            {categoria?.toLowerCase() !== "pizzas" && (
              <p className="font-extrabold font-montserrat text-neutral-950 text-xl whitespace-nowrap">
                {formatearNumero(precio)}
              </p>
            )}
          </div>
          <p className="font-medium text-neutral-400 text-sm mt-2 font-montserrat leading-relaxed">
            {descripcion}
          </p>
        </div>

        {/* Options Section */}
        <div className="mb-10">
          {categoria === "pizzas" ? (
            <div className="bg-neutral-50 p-4 rounded-3xl border border-neutral-100">
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
              cantMax={cantidadMaxima}
            />
          )}
        </div>

        {/* Comments Section */}
        <div className="mb-10">
          <label className="block text-neutral-800 font-bold font-montserrat text-sm mb-3">
            Comentarios adicionales
          </label>
          <textarea
            id="comentarios"
            name="comentarios"
            ref={comentarioRef}
            placeholder="¿Algo que debamos saber?"
            className="w-full h-32 p-4 bg-neutral-50 border border-neutral-100 rounded-2xl font-montserrat text-sm focus:ring-2 focus:ring-neutral-800 focus:outline-none transition-all resize-none text-neutral-700"
          />
        </div>
      </motion.div>

      {/* Footer Button Banner */}
      <AnimatePresence>
        {result() && (
          <div className="fixed bottom-8 left-0 right-0 mx-auto px-6 z-40 max-w-lg">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="flex justify-center items-center rounded-3xl p-4 bg-neutral-950/80 backdrop-blur-xl text-white border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            >
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-neutral-950 rounded-2xl font-black font-montserrat text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95 w-full"
              >
                Agregar al Carrito
                <FiShoppingCart size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
