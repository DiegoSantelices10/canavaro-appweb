/* eslint-disable react/prop-types */
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdOutlineEmojiPeople, MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { calculateSubTotal, calculateTotalQuantity, removeItemCart, setDelivery, setDemora } from "store/reducers/orderSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { clearUser, setUser } from "store/reducers/userSlice";
import axios from "axios";
import * as Yup from "yup";
import ModalDescripcion from "components/modalDescripcion";
import moment from "moment-timezone";
import { getPromo } from "services/fetchData";
import { setPromoBarra } from "store/reducers/settingSlice";

export default function Cart({ data }) {
  const { orderList, totalAmount, demora } = useSelector(state => state.order);
  const { nombre, direccion, telefono } = useSelector(state => state.user);
  const { promoBarra } = useSelector(state => state.setting);

  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);

  const [type, setType] = useState("domicilioActual");
  const router = useRouter();
  const dispatch = useDispatch();

  const hora = moment.tz("America/Argentina/Buenos_Aires").format("HH");


  const hoursDelivery = () => {
    if (hora >= 19 && hora < 23) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  useEffect(() => {
    dispatch(calculateSubTotal());
    dispatch(calculateTotalQuantity());
  }, [orderList]);

  useEffect(() => {
    const { demoraActual } = data.find(item => item?.tipo === type);
    dispatch(setDemora(demoraActual));
  }, [type]);

  useEffect(() => {
    hoursDelivery()
    obtenerPromo()
    dispatch(clearUser());
  }, []);

  const obtenerPromo = async () => {
    console.log("promo barra",promoBarra);
    const { data, status } = await getPromo();
    if (status === 200) {
      const barra = data.filter(item => item.nombre === "Promo Barra")
      console.log("barra", barra);
      dispatch(setPromoBarra({promoBarra: barra[0]}))
    }
  }
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

  const changeTypeDelivery = (value) => {
    setType(value)
    dispatch(setDelivery(value))
  }

  const validationSchema = Yup.object().shape(
    type === "domicilioActual"
      ? {
        direccion: Yup.string().required("La dirección es obligatoria"),
        telefono: Yup.string().required("El teléfono es obligatorio"),
      }
      : {
        nombre: Yup.string().required("El nombre es obligatorio"),
      }

  );
  return (
    <div className="font-nunito  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 h-full  rounded-t-3xl py-3 ">
      <Formik
        initialValues={{
          direccion: direccion || "",
          telefono: telefono || "",
          nombre: nombre || "",
          hPersonalizado: "",
         
        }}
        enableReinitialize
        onSubmit={values => {
          dispatch(
            setUser({
              nombre: values.nombre,
              telefono: values.telefono,
              direccion: values.direccion,
              hPersonalizado: values.hPersonalizado
            })
          );
          router.push("/order/checkout");
        }}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <>
              {currentProducto && (
                <ModalDescripcion show={showModal} handleClose={handleCloseModal} pedido={currentProducto} />
              )}
              <Form>
                <div className="px-3">
                  <div className="flex items-center gap-3 py-4">
                    <Link href={"/order/home"}>
                      <a>
                        <FiChevronsLeft
                          className=" text-slate-800 bg-slate-50 rounded-md shadow p-1 top-4 left-4"
                          size={30}
                        />
                      </a>
                    </Link>
                    <h2 className="font-nunito font-extrabold text-lg">Tu pedido</h2>
                  </div>
                  
                  <div className="py-2">
                    <div className="p-2 rounded-md shadow bg-gray-100">
                      {promoBarra?.available && (
                        <div className="w-full mx-auto text-center font-bold">Retirando por el local tenes un 10% de descuento.</div>
                      )}
                      <div className="flex justify-center  w-full gap-3 py-3 text-sm ">
                        <button
                          type="button"
                          onClick={() => {
                            changeTypeDelivery("domicilioActual");
                          }}
                          className={
                            type === "domicilioActual"
                              ? "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-sky-800 shadow text-white font-light p-3"
                              : "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-white shadow  font-light p-3"
                          }
                        >
                          <MdOutlineDeliveryDining size={20} />
                          Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            changeTypeDelivery("localActual");
                          }}
                          className={
                            type === "localActual"
                              ? "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-sky-800 shadow text-white font-light p-3"
                              : "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-white shadow font-light p-3"
                          }
                        >
                          <MdOutlineEmojiPeople size={20} />
                          Retiro
                        </button>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2">
                        {type === "domicilioActual" ? (
                          <div className="w-full">
                            <div className="w-full">
                              <Field
                                id="direccion"
                                name="direccion"
                                className=" border-slate-300 border rounded-md w-full p-2 text-sm"
                                placeholder="Ingresa tu domicilio, Barrio"
                              />{" "}
                              <ErrorMessage name="direccion">
                                {msg => {
                                  return <div className="text-red-500 font-medium text-sm">{msg}</div>;
                                }}
                              </ErrorMessage>
                            </div>
                            <div className="w-full pt-2">
                              <Field
                                id="telefono"
                                name="telefono"
                                className="border-slate-300 border rounded-md w-full p-2 text-sm"
                                placeholder="Ingresa tu telefono"
                              />
                              <ErrorMessage name="telefono">
                                {msg => {
                                  return <div className="text-red-500 -font-medium text-sm">{msg}</div>;
                                }}
                              </ErrorMessage>
                            </div>
                            <div className="w-full mx-auto">
                            
                              {open ? (
                                  <h1 className="font-semibold text-center text-gray-600 text-sm mt-3 font-nunito">tiempo de envío: <span className="text-gray-600 text-base">{demora}</span></h1>
                              ) : (
                                  <h1 className="font-semibold text-center text-gray-600 text-sm mt-3 font-nunito">Delivery de 19:30 a 23hs.</h1>
                                )}
                                <p className="text-center text-xs text-gray-400 font-normal">{open && "o"} elige un horario</p>
                                <p className="text-center text-xs text-gray-400 font-normal">considerando que sea mayor al tiempo de envío.</p>
                                <div className="w-full mx-auto flex justify-center mt-1">
                                <Field
                                id="hPersonalizado"
                                name="hPersonalizado"
                                className="border-slate-300 border rounded-md w-2/5 p-2 text-sm text-center"
                                placeholder="Horario de entrega"
                              />
                                </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full ">
                            <Field
                              id="nombre"
                              name="nombre"
                              className="border border-slate-300 rounded-md w-full p-2 text-sm"
                              placeholder="Ingresa tu nombre"
                            />
                            <ErrorMessage name="nombre">
                              {msg => {
                                return <div className="text-red-500 font-medium text-sm text-left">{msg}</div>;
                              }}
                            </ErrorMessage>
                            

                            <div className="w-full mx-auto">
                            
                              {open ? (
                                  <h1 className="font-semibold text-center text-gray-600 text-sm mt-3 font-nunito">tiempo de retiro: <span className="text-gray-600 text-base">{demora}</span></h1>
                              ) : (
                                  <h1 className="font-semibold text-center text-gray-600 text-sm mt-3 font-nunito">Horario de 19:30 a 23hs.</h1>
                                )}
                                <p className="text-center text-xs text-gray-400 font-normal">{open && "o"} elige un horario</p>
                                <p className="text-center text-xs text-gray-400 font-normal">considerando que sea mayor al tiempo de retiro.</p>
                                <div className="w-full mx-auto flex justify-center mt-1">
                                <Field
                                id="hPersonalizado"
                                name="hPersonalizado"
                                className="border-slate-300 border rounded-md w-2/5 p-2 text-sm text-center"
                                placeholder="Horario de retiro"
                              />
                                </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-20 px-3 rounded-md">
                  {orderList.map((item, index) => {
                    return (
                      <div key={index} className="font-nunito">
                        <div className="my-2 p-2  rounded-md">
                          <div className="flex justify-between items-center gap-x-2">
                            <div className=" flex self-start gap-4">
                              <div className="w-full ">
                                <a className="font-bold text-sky-900 ">
                                  {item.nombre}
                                  <span className="text-gray-400 font-light">
                                    {" "}
                                    x {item.cant ? item.cant : item.cantidad}
                                  </span>
                                </a>
                                <p className="text-gray-400 text-sm">
                                  {item?.descripcion ||
                                    item?.tamanio?.charAt(0).toUpperCase() + item?.tamanio?.slice(1) ||
                                    ""}
                                </p>
                                <p className="font-semibold text-sm text-gray-600">$ {item.precio * item.cantidad}</p>
                              </div>
                              {item?.products && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenModal(item)}
                                  className="font-normal font-poppins text-xs w-auto ml-6 "
                                  style={{ whiteSpace: "nowrap" }}
                                >
                                  Ver Descripcion
                                </button>
                              )}
                            </div>

                            <button type="button" onClick={() => deleteItem(item._id)}>
                              <MdDeleteOutline size={30} className="text-red-700" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {orderList.length > 0 ? (
                  <div className="font-nunito fixed bottom-3 w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white">
                    <div className="flex justify-between items-center p-3 font-poppins">
                      <div>
                        <p className="font-bold text-xl text-sky-900">Subtotal</p>
                        <h3 className="text-xl">$ {totalAmount}</h3>
                      </div>
                      <button
                        type="submit"
                        className="text-center font-nunito rounded-md w-auto p-4 text-white font-bold bg-sky-800 hover:bg-sky-700 hover:-translate-y-1 transition-all duration-500"
                      >
                        Continuar el pago
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-center w-full font-bold text-lg font-poppins">
                      Tu Carrito esta vacio
                    </p>
                    <p className="text-center w-full font-medium text-sm text-gray-500 h-full font-poppins">
                      Por favor, regresa para realizar un pedido
                    </p>
                  </div>
                )}
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { DEV_URL, PROD_URL, NODE_ENV } = process.env;
  try {
    const { data } = await axios.get(`${NODE_ENV === "production" ? PROD_URL : DEV_URL}` + "/api/delay");
    return {
      props: {
        // Pasa el estado hidratado como prop al componente de Next.js
        data,
      },
    };
  } catch (error) {
    alert("Error al obtener los productos")
  }

};
