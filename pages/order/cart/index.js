/* eslint-disable react/prop-types */
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronLeft, FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdOutlineEmojiPeople } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  calculateSubTotal,
  calculateTotalQuantity,
  removeItemCart,
  setDelivery,
  setDemora,
  setTotalAmount,
} from "store/reducers/orderSlice";
import { Formik, Form, ErrorMessage } from "formik";

import { clearUser, setUser } from "store/reducers/userSlice";
import axios from "axios";
import * as Yup from "yup";
import ModalDescripcion from "components/ModalDescripcion";
import moment from "moment-timezone";
import { setPromoBarra } from "store/reducers/settingSlice";
import { getDelay } from "services/fetchData";
import CardCart from "components/CardCart";
import { Toaster } from "react-hot-toast";
import { formatearNumero } from "libs/items";
import Delete02Icon from "public/images/delete-02-stroke-rounded";
import AlignBoxMiddleLeftIcon from "public/images/align-box-middle-left-stroke-rounded";
import ControllerInput from "components/ControllerInput";
import { ordenarPorProductOrderIdHome } from "utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart({ data }) {
  const { orderList, totalAmount, demora, delivery } = useSelector(state => state.order);
  const { nombre, direccion, telefono } = useSelector(state => state.user);
  const { promoBarra } = useSelector(state => state.setting);
  const { products } = useSelector(state => state.product);

  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);
  const [showHourEdit, setShowHourEdit] = useState(false);

  // Estados para "Ver más"
  const [expandedDrinks, setExpandedDrinks] = useState(false);
  const [expandedDesserts, setExpandedDesserts] = useState(false);

  const hora = moment.tz("America/Argentina/Buenos_Aires").format("HH");

  const [type, setType] = useState("domicilioActual");
  const router = useRouter();
  const dispatch = useDispatch();

  const hoursDelivery = () => {
    if (hora >= 19 && hora < 23) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
  }, [orderList]);

  useEffect(() => {
    hoursDelivery();
    obtenerPromo();
    dispatch(setDelivery("domicilioActual"));
    dispatch(clearUser());
  }, []);

  useEffect(() => {
    descuentoBarra();
    const currentData = data.find(item => item?.tipo === type);
    if (currentData) {
      dispatch(setDemora(currentData.demoraActual));
    }
  }, [type]);

  const obtenerPromo = async () => {
    try {
      const { data, status } = await axios.get("/api/settings/promo");
      if (status === 200) {
        const barra = data?.filter(item => item.nombre?.toLowerCase() === "promo barra");
        dispatch(setPromoBarra({ promoBarra: barra[0] }));
      }
    } catch (error) {
      console.error("Error al obtener promo:", error);
    }
  };

  const deleteItem = _id => {
    dispatch(removeItemCart(_id));
  };

  const handleOpenModal = producto => {
    setCurrentProducto(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentProducto(null);
    setShowModal(false);
  };

  const changeTypeDelivery = (value, setField) => {
    setType(value);
    dispatch(setDelivery(value));
    if (value === "localActual") {
      setField("direccion", "");
      setField("telefono", "");
    } else {
      setField("nombre", "");
    }
  };

  const descuentoBarra = () => {
    if (promoBarra?.available && type === 'localActual') {
      const descuento = (totalAmount * 10) / 100;
      const precioActual = totalAmount - descuento;
      const convert = Math.floor(precioActual);
      dispatch(setTotalAmount(convert));
    } else {
      dispatch(calculateSubTotal());
    }
  };

  const renderSectionList = (category, isExpanded, setIsExpanded) => {
    const filtrados = products
      ?.filter(item => item.categoria?.toLowerCase() === category?.toLowerCase() && item.available === true);

    if (!filtrados || filtrados.length === 0) return null;

    const ordenados = ordenarPorProductOrderIdHome(filtrados);
    const displayedItems = isExpanded ? ordenados : ordenados.slice(0, 3);

    return (
      <div className="mb-8">
        <h3 className="text-sm font-black font-montserrat text-neutral-800 uppercase tracking-wider mb-4 px-1">
          ¿Deseas agregar {category === "bebidas" ? "una bebida" : "un postre"}?
        </h3>
        <div className="flex overflow-x-auto space-x-8 pb-4 px-1 no-scrollbar">
          {displayedItems.map(item => (
            <CardCart key={item._id} data={item} />
          ))}
          {!isExpanded && ordenados.length > 3 && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center rounded-lg text-neutral-800 hover:bg-neutral-200 transition-all shadow-md group border border-red-200"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                <FiPlus size={24} className="text-red-500" />
              </div>
              <span className="font-black text-[10px] font-montserrat text-red-500 uppercase tracking-widest px-4 text-center">
                Ver más {category}
              </span>
            </button>
          )}
          {isExpanded && ordenados.length > 3 && (
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="flex-shrink-0 w-44 h-40 flex flex-col items-center justify-center bg-neutral-100 rounded-[48px] text-neutral-800 hover:bg-neutral-200 transition-all shadow-md group border border-neutral-200"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                <FiMinus size={24} className="text-neutral-500" />
              </div>
              <span className="font-black text-[10px] font-montserrat uppercase tracking-widest px-4 text-center">
                Ver menos
              </span>
            </button>
          )}
        </div>
      </div>
    );
  };

  const validationSchema = Yup.object().shape(
    type === "domicilioActual"
      ? {
        direccion: Yup.string()
          .required("La dirección es requerida")
          .max(70, "La dirección no puede tener más de 70 caracteres"),
        telefono: Yup.string()
          .required("El teléfono es requerido")
          .matches(/^[0-9]+$/, "El teléfono solo puede contener números")
          .min(10, "El teléfono debe tener al menos 10 caracteres")
          .max(15, "El teléfono no puede tener más de 15 caracteres"),
        hPersonalizado: Yup.string()
          .matches(/^(\d+(:\d+)?)?$/, {
            message: "El horario debe contener solo números o ser de tipo HH:mm",
            excludeEmptyString: true,
          })
          .notRequired(),
      }
      : {
        nombre: Yup.string()
          .required("El nombre es requerido")
          .max(30, "El nombre no puede tener más de 30 caracteres"),
        hPersonalizado: Yup.string()
          .matches(/^(\d+(:\d+)?)?$/, {
            message: "El horario debe contener solo números o ser de tipo HH:mm",
            excludeEmptyString: true,
          })
          .notRequired(),
      }
  );

  return (
    <div className="min-h-screen bg-neutral-50 font-montserrat">
      <Toaster />
      <Formik
        initialValues={{
          direccion: direccion || "",
          telefono: telefono || "",
          nombre: nombre || "",
          hPersonalizado: "",
        }}
        enableReinitialize
        onSubmit={values => {
          const pedidoStorage = {
            nombre: values.nombre,
            telefono: values.telefono,
            demora,
            totalAmount,
            delivery,
            direccion: values.direccion,
            hPersonalizado: values.hPersonalizado,
            orderListLocal: orderList,
          };
          localStorage.setItem("pedido", JSON.stringify(pedidoStorage));
          dispatch(
            setUser({
              nombre: values.nombre,
              telefono: values.telefono,
              direccion: values.direccion,
              hPersonalizado: values.hPersonalizado,
            })
          );
          router.push("/order/checkout");
        }}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => {
          return (
            <div className="max-w-2xl mx-auto pb-32">
              <Form className="flex flex-col">
                {/* Custom Sticky Header */}
                <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center gap-4 border-b border-neutral-100">
                  <Link href={"/order/home"}>
                    <a className="w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-xl text-neutral-800 active:scale-90 transition-transform shadow-sm">
                      <FiChevronLeft size={24} />
                    </a>
                  </Link>
                  <h1 className="font-black text-xl text-neutral-900 uppercase tracking-tighter">Tu Pedido</h1>
                </div>

                <div className="px-4 space-y-8">
                  {/* Promo Section */}
                  {promoBarra?.available && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-neutral-900 text-white p-4 rounded-2xl text-center text-sm font-bold shadow-lg"
                    >
                      🎁 Retirando por el local tenés un 10% de descuento.
                    </motion.div>
                  )}

                  {/* Delivery Selection */}
                  <div className="bg-white p-2 rounded-2xl shadow-sm flex gap-2">
                    <button
                      type="button"
                      onClick={() => changeTypeDelivery("domicilioActual", setFieldValue)}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${type === "domicilioActual" ? 'bg-neutral-900 text-white shadow-md' : 'bg-transparent text-neutral-500 hover:bg-neutral-50'}`}
                    >
                      <MdOutlineDeliveryDining size={24} />
                      <span className="text-sm">Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => changeTypeDelivery("localActual", setFieldValue)}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all ${type === "localActual" ? 'bg-neutral-900 text-white shadow-md' : 'bg-transparent text-neutral-500 hover:bg-neutral-50'}`}
                    >
                      <MdOutlineEmojiPeople size={24} />
                      <span className="text-sm">Retiro</span>
                    </button>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-4">
                    {type === "domicilioActual" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <ControllerInput
                            name="direccion"
                            label="Dirección de entrega"
                            placeholder="Ej: Av. Principal 123, Barrio Norte"
                          />
                          <ErrorMessage name="direccion" component="div" className="text-red-500 text-[10px] font-bold px-2 uppercase" />
                        </div>
                        <div className="space-y-1">
                          <ControllerInput
                            name="telefono"
                            type="number"
                            label="Tu Teléfono"
                            placeholder="Ej: 3811234567"
                          />
                          <ErrorMessage name="telefono" component="div" className="text-red-500 text-[10px] font-bold px-2 uppercase" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <ControllerInput
                          name="nombre"
                          label='Tu Nombre'
                          placeholder="Ingresa quién retira el pedido"
                        />
                        <ErrorMessage name="nombre" component="div" className="text-red-500 text-[10px] font-bold px-2 uppercase" />
                      </div>
                    )}

                    {/* Time Alert Section */}
                    <div className="bg-neutral-100 p-5 rounded-2xl border border-neutral-200">
                      {open ? (
                        <div className="text-center">
                          <p className="text-neutral-800 font-bold text-sm">
                            ⏳ Tiempo estimado: <span className="text-neutral-950 underline decoration-neutral-300">{demora} min.</span>
                          </p>
                          <button
                            type="button"
                            className="mt-2 text-[11px] text-neutral-500 font-bold uppercase tracking-widest hover:text-neutral-900 transition-colors"
                            onClick={() => setShowHourEdit(!showHourEdit)}
                          >
                            {showHourEdit ? 'Ocultar ajuste' : '¿Programar horario?'}
                          </button>
                          <AnimatePresence>
                            {showHourEdit && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 pt-4 border-t border-neutral-200"
                              >
                                <ControllerInput
                                  name="hPersonalizado"
                                  placeholder="Ej: 21:30"
                                />
                                <ErrorMessage name="hPersonalizado" component="div" className="text-red-500 text-[10px] font-bold mt-1 uppercase" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <p className="text-center text-neutral-500 font-bold text-sm">
                          🌙 {type === "domicilioActual" ? "Delivery" : "Retiro"} disponible de 19:30 a 23:00hs.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Lists with "Ver más" */}
                  {renderSectionList("bebidas", expandedDrinks, setExpandedDrinks)}
                  {renderSectionList("Postres", expandedDesserts, setExpandedDesserts)}

                  {/* Order Detail Section */}
                  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-neutral-100">
                    <h2 className="text-lg font-black font-montserrat text-neutral-900 uppercase tracking-tighter mb-4 flex items-center gap-2">
                      Tu Detalle
                    </h2>

                    <div className="divide-y divide-neutral-100">
                      {orderList.map((item, index) => (
                        <div key={index} className="py-5 first:pt-0 last:pb-0">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-neutral-400 text-xs">{item.cant || item.cantidad}x</span>
                                <h4 className="font-extrabold text-neutral-800 text-sm font-montserrat uppercase">{item.nombre}</h4>
                              </div>
                              <p className="text-[11px] text-neutral-400 font-medium font-montserrat mt-1 uppercase tracking-tight">
                                {item?.descripcion || item?.tamanio || ""}
                              </p>
                              {item.extra && <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase">+ extra: {item.extra}</p>}
                            </div>

                            <div className="flex flex-col items-end gap-3">
                              <p className="font-black text-neutral-900 text-sm">
                                {formatearNumero(item.precio * item.cantidad)}
                              </p>
                              <div className="flex gap-2">
                                {item?.products && (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenModal(item)}
                                    className="w-8 h-8 flex items-center justify-center bg-neutral-50 rounded-lg text-neutral-400 hover:text-blue-600 transition-colors shadow-sm"
                                  >
                                    <AlignBoxMiddleLeftIcon width={16} height={16} />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => deleteItem(item._id)}
                                  className="w-8 h-8 flex items-center justify-center bg-neutral-50 rounded-lg text-neutral-400 hover:text-red-500 transition-colors shadow-sm"
                                >
                                  <Delete02Icon width={16} height={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {orderList.length === 0 && (
                      <div className="text-center py-10 space-y-2">
                        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FiShoppingCart size={24} className="text-neutral-300" />
                        </div>
                        <p className="text-neutral-800 font-black font-montserrat uppercase text-sm">El carrito está vacío</p>
                        <p className="text-neutral-400 text-xs font-medium">Por favor, agrega productos desde el menú</p>
                        <Link href="/order/home">
                          <a className="inline-block mt-4 text-[10px] font-black uppercase text-neutral-900 underline tracking-widest">Volver al Menú</a>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Banner */}
                <AnimatePresence>
                  {orderList.length > 0 && (
                    <div className="fixed bottom-8 left-0 right-0 mx-auto px-6 z-40 max-w-lg">
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="flex justify-between items-center rounded-3xl p-4 bg-neutral-950/80 backdrop-blur-xl text-white border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                      >
                        <div className="flex flex-col items-start pl-2">
                          <p className="text-[9px] uppercase font-black text-neutral-500 tracking-[0.2em] mb-0.5">Total estimado</p>
                          <p className="font-black text-xl font-montserrat tracking-tighter">
                            {formatearNumero(totalAmount)}
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-8 py-4 bg-white text-neutral-950 rounded-2xl font-black font-montserrat text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95"
                        >
                          Continuar
                          <FiShoppingCart size={16} />
                        </button>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </Form>
              {currentProducto && (
                <ModalDescripcion
                  show={showModal}
                  handleClose={handleCloseModal}
                  pedido={currentProducto}
                />
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const data = await getDelay();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error al obtener delay:", error);
    return { props: { data: [] } };
  }
};
