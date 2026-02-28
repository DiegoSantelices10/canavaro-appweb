import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  addPromoOrderList,
  calculateSubTotal,
  calculateTotalQuantity,
  clearOrderPromo,
} from "store/reducers/orderSlice";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import { v4 as uuidv4 } from "uuid";
import ModalMessage from "components/ModalMessage";

export default function Index() {
  const [select, setSelect] = useState("gigante");
  const [radioSelect, setRadioSelect] = useState([]);
  const [extraPizza, setExtraPizza] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState({ title: "", description: "", status: true });
  const [total, setTotal] = useState(0);
  const { products, extras } = useSelector(state => state.product);
  const { orderPromo } = useSelector(state => state.order);


  const dispatch = useDispatch();
  const router = useRouter();
  const comentariosRef = useRef();
  const idGenerator = uuidv4();

  useEffect(() => {
    checkSuma(radioSelect);
  }, [radioSelect]);

  useEffect(() => {
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
  }, [dispatch]);

  const onChangeValue = e => {
    const value = e.target.value;
    setSelect(value);
  };

  const handleChangeRadioButton = (item, value) => {
    const { _id, nombre, precioPizza } = item;
    radioSelect[_id] = { _id, nombre, precioPizza, "fraccion": value };
    setRadioSelect({ ...radioSelect });
  };

  const clearFraction = _id => {
    const result = Object.values(radioSelect)?.find(prod => prod._id === _id);
    if (result.fraccion === "cuarto") setTotal(total - 1);
    if (result.fraccion === "mediana") setTotal(total - 2);

    const res = Object.values(radioSelect)?.filter(pro => pro._id !== _id);
    const response = res.reduce((acc, user) => {
      acc[user._id] = user;
      return acc;
    }, {});
    setRadioSelect(response);
  };
  const returnHome = () => {
    dispatch(clearOrderPromo());
    router.push("/order/home");
  };

  const checkSuma = radioArray => {
    const sumaFracciones = Object.values(radioArray).reduce((total, fracc) => {
      const fracciones = fracc.fraccion;
      const [numerador, denominador] = fracciones.split("/");
      const valorDecimal = parseInt(numerador) / parseInt(denominador);
      return total + valorDecimal;
    }, 0);
    setTotal(sumaFracciones);
  };

  const productTotal = () => {
    if (total === 0) return <h1>Selecciona como armar tu pizza</h1>;
    if (total === 0.25) return <h1>Te falta 3/4 de pizza para completar la promo</h1>;
    if (total === 0.5) return <h1>Te falta 1/2 de pizza para completar la promo</h1>;
    if (total === 0.75) return <h1>Te falta 1/4 de pizza para completar la promo</h1>;
    if (total === 1) return <h1>¡ Completaste la promo correctamente !</h1>;
    if (total > 1) return <h1>Completa la cantidad correctamente</h1>;
  };
  const addCartPromo = (value, tamanio) => {
    let total = 0;
    let cantidad = 0;
    Object.values(value).forEach(objeto => {
      total += objeto.precioPizza[tamanio];
      cantidad++;
    });

    const newList = Object.values(value).map(({ precioPizza, ...resto }) => resto);

    const promedio = total / cantidad;

    const totalRedondeado = Math.ceil(promedio / 100) * 100;

    const concatenatedString = Object.values(newList)
      .map(product => `${product.fraccion} ${product.nombre} `)
      .join(", ");
    let promo = {};

    if (extraPizza.length > 0) {
      promo = {
        _id: idGenerator,
        nombre: `Pizza ${select}`,
        descripcion: concatenatedString,
        categoria: "pizzas",
        comentarios: comentariosRef.current.value,
        extra: `${extraPizza.map(extra => extra.nombre).join(', ')}`,
        precio: totalRedondeado + extraPizza.reduce((total, extra) => total + extra.precio, 0),
        cantidad: 1,
      };
    } else {
      promo = {
        _id: idGenerator,
        nombre: `Pizza ${select}`,
        descripcion: concatenatedString,
        categoria: "pizzas",
        comentarios: comentariosRef.current.value,
        precio: totalRedondeado,
        cantidad: 1,
      };
    }
    if (orderPromo.length > 0) {
      orderPromo.map(product => {
        return (
          dispatch(addPromoOrderList({ ...product }))
        )
      }
      )
    }
    dispatch(addPromoOrderList(promo));
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
    router.push("/order/home");
    setRadioSelect([]);
    toast.success('Se agrego al pedido!')

  };

  const handleCloseModal = () => {
    addCartPromo(radioSelect, select);
    setShowModal(false);
    dispatch(clearOrderPromo());
    router.push("/order/home");
  };
  const addExtra = (item) => {
    setExtraPizza([...extraPizza, item]);
  }

  const openModal = () => {
    if (extras.length > 0) {
      setInfo({
        title: "Puedes agregar extras",
      });
      setShowModal(true);
    } else {
      addCartPromo(radioSelect, select);
    }
  }

  return (
    <div className="relative min-h-screen bg-white pb-32 mx-auto w-full sm:w-4/5 md:w-3/5 lg:w-1/2">
      <Toaster />

      <AnimatePresence>
        {showModal && (
          <ModalMessage
            handleClose={handleCloseModal}
            addExtra={addExtra}
            showModal={showModal}
            orderPromo={orderPromo}
            extraPizza={extraPizza}
            setShowModal={setShowModal}
            extras={extras}
            info={info}
          />
        )}
      </AnimatePresence>

      <div className="relative mx-auto w-full h-72 sm:h-80 md:h-[400px] md:mt-4 md:rounded-[40px] overflow-hidden shadow-xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={"/images/pizzafree.webp"}
            alt="fondo"
            className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 opacity-50"
          />
          <img
            src={"/images/pizzafree.webp"}
            alt="Arma tu pizza"
            className="relative z-10 w-full h-full object-cover brightness-[0.9]"
          />
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/0 via-transparent to-black/30" />
        </motion.div>

        <button
          onClick={returnHome}
          className="absolute top-6 left-6 z-30 w-10 h-10 flex items-center justify-center bg-neutral-950/80 backdrop-blur-md rounded-xl text-white shadow-xl active:scale-90 transition-transform"
        >
          <FiChevronsLeft size={24} />
        </button>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 -mt-10 bg-white rounded-t-[40px] px-6 pt-8 pb-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex flex-col gap-6"
      >
        <div className="flex flex-col gap-1 text-center">
          <h1 className="font-black font-montserrat text-neutral-900 text-2xl uppercase tracking-tighter">Arma tu pizza</h1>
          <p className="font-medium text-sm text-neutral-400 font-montserrat">Elegí los gustos que quieras sumar</p>
        </div>

        <div className="bg-neutral-50 p-2 rounded-2xl flex justify-between font-montserrat font-bold">
          {["chica", "mediana", "gigante"].map(tam => (
            <label
              key={tam}
              className={`flex-1 py-3 text-center rounded-xl cursor-pointer transition-all ${select === tam
                ? "bg-white text-neutral-900 shadow-sm border border-neutral-200"
                : "text-neutral-400 hover:text-neutral-600"
                }`}
            >
              <input
                type="radio"
                name="tamanio"
                value={tam}
                checked={select === tam}
                onChange={onChangeValue}
                className="hidden"
              />
              <span className="capitalize text-sm">{tam}</span>
            </label>
          ))}
        </div>

        <div className="text-center font-montserrat text-sm font-bold text-neutral-400 uppercase tracking-widest">
          PUEDES ELEGIR HASTA {select === "gigante" ? "4" : "2"} GUSTOS
        </div>

        <div
          className={`rounded-2xl p-4 text-center font-montserrat font-black uppercase text-sm shadow-inner transition-colors ${total === 1
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
            : "bg-amber-50 text-amber-600 border border-amber-100"
            }`}
        >
          {productTotal()}
        </div>

        <div className="divide-y divide-neutral-100 mt-2">
          {products
            .filter(
              item => item.categoria === "pizzas" && item.nombre !== "Fugazzeta rellena" && item.available === true
            )
            ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map(item => (
              <div key={item._id} className="py-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h2 className="font-montserrat font-black text-neutral-800 text-sm uppercase">{item.nombre}</h2>
                  {radioSelect[item._id]?.fraccion && (
                    <button
                      onClick={() => clearFraction(item._id)}
                      className="text-red-500 bg-red-50 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider hover:bg-red-100 transition-colors"
                    >
                      Deshacer
                    </button>
                  )}
                </div>

                <div className="flex gap-2 justify-end">
                  {select === "gigante" && (
                    <label
                      className={`flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer transition-colors border font-montserrat text-sm font-bold ${radioSelect[item._id]?.fraccion === "1/4"
                        ? "bg-neutral-900 border-neutral-900 text-white"
                        : "bg-white border-neutral-200 text-neutral-400 hover:bg-neutral-50"
                        }`}
                    >
                      <input
                        type="radio"
                        value="1/4"
                        name={item.nombre}
                        className="hidden"
                        checked={radioSelect[item._id]?.fraccion === "1/4"}
                        onChange={() => handleChangeRadioButton(item, "1/4")}
                      />
                      1/4
                    </label>
                  )}
                  <label
                    className={`flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer transition-colors border font-montserrat text-sm font-bold ${radioSelect[item._id]?.fraccion === "1/2"
                      ? "bg-neutral-900 border-neutral-900 text-white"
                      : "bg-white border-neutral-200 text-neutral-400 hover:bg-neutral-50"
                      }`}
                  >
                    <input
                      type="radio"
                      value="1/2"
                      name={item.nombre}
                      className="hidden"
                      checked={radioSelect[item._id]?.fraccion === "1/2"}
                      onChange={() => handleChangeRadioButton(item, "1/2")}
                    />
                    1/2
                  </label>
                </div>
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label htmlFor="comentarios" className="font-black text-xs text-neutral-400 font-montserrat uppercase tracking-widest pl-1">
            Comentarios adicionales
          </label>
          <textarea
            ref={comentariosRef}
            id="comentarios"
            name="comentarios"
            placeholder="¿Algo especial para tener en cuenta?"
            className="w-full h-28 p-4 bg-neutral-50 border border-neutral-100 rounded-2xl font-montserrat text-sm focus:ring-2 focus:ring-neutral-800 focus:outline-none transition-all resize-none text-neutral-700"
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {total === 1 && (
          <div className="fixed bottom-8 left-0 right-0 mx-auto px-6 z-40 w-full sm:w-4/5 md:w-3/5 lg:w-1/2">
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
