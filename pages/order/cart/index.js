/* eslint-disable react/prop-types */
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdOutlineEmojiPeople } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addPromoOrderList,
  calculateSubTotal,
  calculateTotalQuantity,
  clearOrderPromo,
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
import toast, { Toaster } from "react-hot-toast";
import { formatearNumero } from "libs/items";
import Delete02Icon from "public/images/delete-02-stroke-rounded";
import AlignBoxMiddleLeftIcon from "public/images/align-box-middle-left-stroke-rounded";
import ControllerInput from "components/ControllerInput";
import Collapsable from "components/Collapsable";

export default function Cart({ data }) {
  const { orderList, totalAmount, demora, orderPromo, delivery } = useSelector(state => state.order);
  const { nombre, direccion, telefono } = useSelector(state => state.user);
  const { promoBarra } = useSelector(state => state.setting);
  const { products } = useSelector(state => state.product);

  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);
  const [showHourEdit, setShowHourEdit] = useState(false);

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
    descuentoBarra()
    const { demoraActual } = data.find(item => item?.tipo === type);
    dispatch(setDemora(demoraActual));
  }, [type]);

  const obtenerPromo = async () => {
    try {
      const { data, status } = await axios.get("/api/settings/promo");
      if (status === 200) {
        const barra = data?.filter(item => item.nombre === "Promo barra");
        dispatch(setPromoBarra({ promoBarra: barra[0] }));
      }
    } catch (error) {
      throw new Error("Failed to log out");
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

  const renderBebidas = renderProductos => {
    return products
      ?.filter(item => item.categoria === renderProductos && item.available === true)
      ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map(data => <CardCart key={data._id} data={data} />);
  };

  const addCartPromo = value => {
    const res = value.find(item => item.categoria === "bebidas" || item.categoria === "Postres");

    if (res) {
      value.map(item => dispatch(addPromoOrderList({ ...item })));
      toast.success("Se agrego al pedido!");
      dispatch(clearOrderPromo());
      dispatch(calculateSubTotal());
      dispatch(calculateTotalQuantity());
    }
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

  const descuentoBarra = () => {
    if (promoBarra?.available && type === 'localActual') {
      const descuento = (totalAmount * 10) / 100;
      const precioActual = totalAmount - descuento;
      const convert = Math.floor(precioActual);

      dispatch(setTotalAmount(convert));
    } else {
      dispatch(calculateSubTotal());
    }
  }


  return (
    <div className="font-montserrat shadow-md mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-1/2 h-screen  rounded-t-3xl py-3 ">
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
            <div className="bg-white pb-4">
              {currentProducto && (
                <ModalDescripcion show={showModal} handleClose={handleCloseModal} pedido={currentProducto} />
              )}
              <Form className="space-y-4">
                <div className="px-3">
                  <div className="flex items-center gap-3 py-2">
                    <Link href={"/order/home"}>
                      <a>
                        <FiChevronsLeft
                          className=" text-slate-800 bg-slate-50 rounded-md shadow p-1 top-4 left-4"
                          size={30}
                        />
                      </a>
                    </Link>
                    <h2 className="font-montserrat font-bold text-lg">Tu pedido</h2>
                  </div>

                  <div className="py-2">
                    <div className="">
                      {promoBarra?.available && (
                        <div className="w-full mx-auto text-center text-sm font-bold">
                          Retirando por el local tenes un 10% de descuento.
                        </div>
                      )}
                      <div className="flex justify-center w-full gap-3 text-sm bg-[#fdfcfc] shadow-sm p-2 rounded-lg">
                        <button
                          type="button"
                          onClick={() => {
                            changeTypeDelivery("domicilioActual", setFieldValue);
                          }}
                          className={
                            type === "domicilioActual"
                              ? "w-1/2 rounded-lg flex font-montserrat items-center justify-center gap-2 bg-red-600 shadow text-white font-semibold p-3"
                              : "w-1/2 rounded-lg flex font-montserrat items-center justify-center gap-2 bg-white shadow  font-normal p-3"
                          }
                        >
                          <MdOutlineDeliveryDining size={20} />
                          Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            changeTypeDelivery("localActual", setFieldValue);
                          }}
                          className={
                            type === "localActual"
                              ? "w-1/2 rounded-lg flex font-montserrat items-center justify-center gap-2 bg-red-600 shadow text-white font-semibold p-3"
                              : "w-1/2 rounded-lg flex font-montserrat items-center justify-center gap-2 bg-white shadow font-normal p-3"
                          }
                        >
                          <MdOutlineEmojiPeople size={20} />
                          Retiro
                        </button>
                      </div>
                      <div className="flex flex-col justify-center items-center mt-5">
                        {type === "domicilioActual" ? (
                          <div className="w-full grid gap-6">
                            <div className="flex flex-col md:flex-row gap-3">
                              <div className="w-full">
                                <ControllerInput
                                  name="direccion"
                                  label="Dirección"
                                  placeholder="Ingresa tu domicilio, barrio"
                                />
                                <ErrorMessage name="direccion">
                                  {msg => {
                                    return (
                                      <div className="text-red-500 font-montserrat font-normal text-xs pt-1 pl-2">
                                        {msg}
                                      </div>
                                    );
                                  }}
                                </ErrorMessage>
                              </div>

                              <div className="w-full">
                                <ControllerInput
                                  name="telefono"
                                  type="number"
                                  label="Teléfono"
                                  placeholder="Ingresa tu telefono"
                                />
                                <ErrorMessage name="telefono">
                                  {msg => {
                                    return (
                                      <div className="text-red-500 font-montserrat font-normal text-xs pt-1 pl-2">
                                        {msg}
                                      </div>
                                    );
                                  }}
                                </ErrorMessage>
                              </div>
                            </div>

                            <div className="p-3 py-5 rounded-lg border border-gray-200 min-w-min text-sm">
                              {open ? (
                                <>
                                  <h1 className="font-medium text-center text-gray-800  mt-1 font-montserrat">
                                    Tiempo de envío: {demora} min.
                                  </h1>
                                  <p className="text-center text-xs text-gray-400 font-normal font-montserrat">
                                    o elige un horario que sea mayor al tiempo de envío{" "}
                                    <button
                                      type="button"
                                      className="text-gray-800 font-montserrat"
                                      onClick={() => setShowHourEdit(!showHourEdit)}
                                    >
                                      Ingresa aqui
                                    </button>
                                  </p>
                                  {showHourEdit && (
                                    <>
                                      <div className="w-full mx-auto flex justify-center mt-3">
                                        <ControllerInput
                                          name="hPersonalizado"
                                          placeholder="Horario de entrega"
                                        />
                                      </div>
                                      <ErrorMessage name="hPersonalizado">
                                        {msg => {
                                          return (
                                            <div className="text-red-500 font-montserrat font-normal text-xs">
                                              {msg}
                                            </div>
                                          );
                                        }}
                                      </ErrorMessage>
                                    </>
                                  )}
                                </>
                              ) : (
                                <h1 className="font-medium text-center text-gray-800 text-sm mt-1 font-montserrat">
                                  Delivery de 19:30 a 23hs.
                                </h1>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full mx-auto">
                            <ControllerInput
                              name="nombre"
                              label='Nombre'
                              placeholder="Ingresa tu nombre"
                            />
                            <ErrorMessage name="nombre">
                              {msg => {
                                return (
                                  <div className="text-red-500 font-normal font-montserrat text-xs text-left pt-1 pl-2">
                                    {msg}
                                  </div>
                                );
                              }}
                            </ErrorMessage>

                            <div className="p-3 py-5 rounded-lg border border-gray-200 min-w-min text-sm mt-6">
                              {open ? (
                                <>
                                  <h1 className="font-medium text-center text-gray-600 text-sm mt-1 font-montserrat">
                                    Tiempo de retiro: {demora} min.
                                  </h1>
                                  <p className="text-center text-xs text-gray-400 font-normal font-montserrat">
                                    o elige un horario que sea mayor al tiempo de retiro{" "}
                                    <button
                                      type="button"
                                      className="text-gray-800 font-montserrat"
                                      onClick={() => setShowHourEdit(!showHourEdit)}
                                    >
                                      Ingresa aqui
                                    </button>
                                  </p>
                                  {showHourEdit && (
                                    <>
                                      <div className="w-full mx-auto flex justify-center mt-3">
                                        <ControllerInput
                                          name="hPersonalizado"
                                          placeholder="Horario de entrega"
                                        />
                                      </div>
                                      <ErrorMessage name="hPersonalizado">
                                        {msg => {
                                          return <div className="text-red-500 -font-medium text-sm">{msg}</div>;
                                        }}
                                      </ErrorMessage>
                                    </>
                                  )}
                                </>
                              ) : (
                                <h1 className="font-medium text-center text-gray-800 text-sm mt-1 font-montserrat">
                                  Retiro de 19:30 a 23hs.
                                </h1>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {!orderList.some(item => item.categoria === "bebidas") && (
                  <Collapsable
                    title={
                      <h1 className="font-montserrat text-base font-bold text-gray-800">
                        ¿ Deseas agregar alguna bebida ?
                      </h1>
                    }
                  >
                    <div className="p-0">
                      <div className="flex overflow-x-scroll flexp h-auto  space-x-6 w-full px-0.5 py-2 mt-4  ">
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

                        {renderBebidas("bebidas")}
                      </div>
                    </div>
                  </Collapsable>
                )}
                {!orderList.some(item => item.categoria === "Postres") && (
                  <Collapsable
                    title={
                      <h1 className="font-montserrat text-base font-bold text-gray-800">
                        ¿ Deseas agregar algun postre ?
                      </h1>
                    }
                  >
                    <div className="p-0">
                      <div className="flex overflow-x-scroll flexp h-auto  space-x-6 w-full px-0.5 py-2 mt-4  ">
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

                        {renderBebidas("Postres")}
                      </div>
                    </div>
                  </Collapsable>
                )}

                <div className="p-3 mb-16 pb-10 rounded-md">
                  <button
                    onClick={() => addCartPromo(orderPromo)}
                    type="button"
                    className={`${orderPromo.length < 1
                      ? "hidden"
                      : "p-3 font-medium w-full font-montserrat mb-3 bg-red-600 rounded-lg text-white  hover:-translate-y-1 transition-all duration-500"
                      }`}
                  >
                    Agregar al carrito
                  </button>
                  <h1 className="text-gray-800 font-bold font-montserrat px-2 text-base">Detalle pedido</h1>
                  <hr />
                  {orderList.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="font-montserrat py-2">
                          <div className="p-2 rounded-md">
                            <div className="flex justify-between items-center gap-x-2">
                              <div className="w-full ">
                                <a className="font-semibold text-neutral-800">
                                  {item.nombre}
                                  <span className="text-gray-400 font-normal text-sm">
                                    {" "}
                                    {item.cant ? item.cant : item.cantidad}u
                                  </span>
                                </a>
                                <p className="text-gray-400 text-xs tracking-wider">
                                  {item?.descripcion ||
                                    item?.tamanio?.charAt(0).toUpperCase() + item?.tamanio?.slice(1) ||
                                    ""}
                                </p>
                                {item.extra && <p className="text-gray-400 text-sm">extra: {item.extra}</p>}
                                <p className="text-sm text-gray-400">{formatearNumero(item.precio * item.cantidad)}</p>
                              </div>
                              <div className="flex justify-center gap-3">
                                {item?.products && (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenModal(item)}
                                    className="font-normal font-montserrat text-xs w-auto "
                                  >
                                    <AlignBoxMiddleLeftIcon color={"#1618A4"} />
                                  </button>
                                )}
                                <button type="button" onClick={() => deleteItem(item._id)}>
                                  {<Delete02Icon color={"red"} />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>
                {orderList.length > 0 ? (
                  <div className="font-montserrat fixed bottom-0 w-full  sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white">
                    <div className="flex justify-between items-center p-3 font-montserrat">
                      <div>
                        <p className="font-bold text-xl text-neutral-800">Subtotal</p>
                        <h3 className="text-xl">{formatearNumero(totalAmount)}</h3>
                      </div>
                      <button
                        type="submit"
                        className="text-center text-sm font-montserrat rounded-lg w-auto p-3 px-4 text-white font-medium bg-red-600 hover:bg-red-800 hover:-translate-y-1 transition-all duration-500"
                      >
                        Continuar el pago
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-center w-full font-bold text-lg font-montserrat">Tu Carrito esta vacio</p>
                    <p className="text-center w-full font-medium text-sm text-gray-500 h-full font-montserrat">
                      Por favor, regresa para realizar un pedido
                    </p>
                  </div>
                )}
              </Form>
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
        // Pasa el estado hidratado como prop al componente de Next.js
        data,
      },
    };
  } catch (error) {
    alert("Error al obtener los productos");
  }
};
