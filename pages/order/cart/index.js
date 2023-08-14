/* eslint-disable react/prop-types */
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdOutlineEmojiPeople, MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { calculateSubTotal, calculateTotalQuantity, removeItemCart, setDemora } from "store/reducers/orderSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { addAddress, setUser } from "store/reducers/userSlice";
import axios from "axios";
import * as Yup from "yup";
import ModalDescripcion from "components/modalDescripcion";
import moment from "moment-timezone";

export default function Cart({ data }) {
  const { orderList, totalAmount, demora } = useSelector(state => state.order);
  const { nombre, direccion, telefono } = useSelector(state => state.user);

  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);

  const [type, setType] = useState("domicilioActual");
  const router = useRouter();
  const dispatch = useDispatch();

  const hora = moment.tz("America/Argentina/Buenos_Aires").format("HH");

  console.log(hora);

  const hoursDelivery = () => {
    if (hora >= 19 && hora <= 23) {
      setOpen(true)
      console.log("Abierto");
    } else {
      setOpen(false)
      console.log("Cerrado");
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
    dispatch(addAddress(""));
  }, []);
  const deleteItem = _id => {
    dispatch(removeItemCart(_id));
  };

  const handleOpenModal = producto => {
    setCurrentProducto(producto);
    console.log("entro");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentProducto(null);
    setShowModal(false);
  };

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
                      <div className="flex justify-center  w-full gap-3 py-3 text-sm ">
                        <button
                          type="button"
                          onClick={() => {
                            setType("domicilioActual");
                          }}
                          className={
                            type === "domicilioActual"
                              ? "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-sky-900 shadow text-white font-light p-3"
                              : "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-white shadow  font-light p-3"
                          }
                        >
                          <MdOutlineDeliveryDining size={20} />
                          Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setType("localActual");
                          }}
                          className={
                            type === "localActual"
                              ? "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-sky-900 shadow text-white font-light p-3"
                              : "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-white shadow font-light p-3"
                          }
                        >
                          <MdOutlineEmojiPeople size={20} />
                          Retiro
                        </button>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2">
                        {type === "domicilioActual" ? (
                          <>
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
                            <div className="w-full">
                              <Field
                                id="telefono"
                                name="telefono"
                                className="border-slate-300 border rounded-md w-full p-2 text-sm"
                                placeholder="Ingresa tu telefono"
                              />
                              <ErrorMessage name="telefono">
                                {msg => {
                                  return <div className="text-red-500 font-medium text-sm">{msg}</div>;
                                }}
                              </ErrorMessage>
                            </div>
                            <div className="w-full flex justify-between items-center">
                              <Field
                                id="hPersonalizado"
                                name="hPersonalizado"
                                className="border-slate-300 border rounded-md w-1/2 p-2 text-sm"
                                placeholder="Ingresa horario de entrega"
                              />
                              <ErrorMessage name="hPersonalizado">
                                {msg => {
                                  return <div className="text-red-500 font-medium text-sm">{msg}</div>;
                                }}
                              </ErrorMessage>
                              {open ? (
                                <div className="pr-3">
                                  <h1 className="font-bold text-sm font-nunito">{type === "domicilioActual" ? "O te llega en" : "Retiralo en"}  <span className="text-gray-600 text-base">{demora}</span></h1>
                                </div>
                              ) : (
                                <h1 className="font-normal text-gray-600 text-sm pr-2 font-nunito">Delivery de 19:30 a 23hs.</h1>
                              )}

                            </div>
                          </>
                        ) : (
                          <>
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
                            <div className="w-full flex justify-between items-center">
                              <Field
                                id="hPersonalizado"
                                name="hPersonalizado"
                                className="border-slate-300 border rounded-md w-1/2 p-2 text-sm"
                                placeholder="horario de retiro"
                              />
                              <ErrorMessage name="hPersonalizado">
                                {msg => {
                                  return <div className="text-red-500 font-medium text-sm">{msg}</div>;
                                }}
                              </ErrorMessage>
                              {open ? (
                                <div className="pr-3">
                                  <h1 className="font-bold text-sm font-nunito">{type === "domicilioActual" ? "O te llega en" : "Retiralo en"}  <span className="text-gray-600 text-base">{demora}</span></h1>
                                </div>
                              ) : (
                                <h1 className="font-normal text-gray-600 text-sm pr-2 font-nunito">Retiro de  19:00 a 23hs.</h1>
                              )}
                            </div>
                          </>
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
                                <a className="font-bold text-gray-800 ">
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
                                <p className="font-semibold text-sm text-gray-800">$ {item.precio * item.cantidad}</p>
                              </div>
                              {item?.products && (
                                <button
                                  type="button"
                                  onClick={() => handleOpenModal(item)}
                                  className="font-normal text-sm w-auto ml-6 "
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
                <div className="font-nunito fixed bottom-3 w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white">
                  <div className="flex justify-between items-center p-3 font-poppins">
                    <div>
                      <p className="font-bold text-xl">Subtotal</p>
                      <h3 className="text-xl">$ {totalAmount}</h3>
                    </div>
                    <button
                      type="submit"
                      className="text-center font-nunito rounded-md w-auto p-4 text-white font-bold bg-sky-900 hover:bg-sky-800 hover:-translate-y-1 transition-all duration-500"
                    >
                      Continuar el pago
                    </button>
                  </div>
                </div>
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

  const { data } = await axios.get(`${NODE_ENV === "production" ? PROD_URL : DEV_URL}` + "/api/delay");
  // console.log("data", data);
  return {
    props: {
      // Pasa el estado hidratado como prop al componente de Next.js
      data,
    },
  };
};
