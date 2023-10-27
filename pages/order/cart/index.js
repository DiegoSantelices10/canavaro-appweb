/* eslint-disable react/prop-types */
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdOutlineEmojiPeople, MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  calculateSubTotal,
  calculateTotalQuantity,
  removeItemCart,
  setDelivery,
  setDemora,
} from "store/reducers/orderSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { clearUser, setUser } from "store/reducers/userSlice";
import axios from "axios";
import * as Yup from "yup";
import ModalDescripcion from "components/modalDescripcion";
import moment from "moment-timezone";
import { setPromoBarra } from "store/reducers/settingSlice";
import { getDelay } from "services/fetchData";

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
    const { demoraActual } = data.find(item => item?.tipo === type);
    dispatch(setDemora(demoraActual));
  }, [type]);

  useEffect(() => {
    hoursDelivery();
    obtenerPromo();
    dispatch(setDelivery("domicilioActual"));
    dispatch(clearUser());
  }, []);

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

  const validationSchema = Yup.object().shape(
    type === "domicilioActual"
      ? {
          direccion: Yup.string()
            .required("La dirección es obligatoria")
            .max(70, "La dirección no puede tener más de 70 caracteres"),
          telefono: Yup.string()
            .required("El teléfono es obligatorio")
            .max(15, "El telefono no puede tener más de 15 caracteres"),
        }
      : {
          nombre: Yup.string()
            .required("El nombre es obligatorio")
            .max(30, "El nombre no puede tener más de 30 caracteres"),
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
              hPersonalizado: values.hPersonalizado,
            })
          );
          router.push("/order/checkout");
        }}
        validationSchema={validationSchema}
      >
        {({ setFieldValue }) => {
          return (
            <>
              {currentProducto && (
                <ModalDescripcion show={showModal} handleClose={handleCloseModal} pedido={currentProducto} />
              )}
              <Form>
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
                    <h2 className="font-nunito font-extrabold text-lg">Tu pedido</h2>
                  </div>

                  <div className="py-2">
                    <div className="p-2 rounded-md shadow-sm bg-gray-100">
                      {promoBarra?.available && (
                        <div className="w-full mx-auto text-center font-bold">
                          Retirando por el local tenes un 10% de descuento.
                        </div>
                      )}
                      <div className="flex justify-center  w-full gap-3 py-3 text-sm ">
                        <button
                          type="button"
                          onClick={() => {
                            changeTypeDelivery("domicilioActual", setFieldValue);
                          }}
                          className={
                            type === "domicilioActual"
                              ? "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-sky-700 shadow text-white font-light p-3"
                              : "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-white shadow  font-light p-3"
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
                              ? "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-sky-700 shadow text-white font-light p-3"
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
                                <h1 className="font-semibold text-center text-gray-600 text-sm mt-3 font-nunito">
                                  tiempo de envío <span className="text-gray-600 text-base">{demora}</span>
                                </h1>
                              ) : (
                                <h1 className="font-semibold text-center text-gray-600 text-sm mt-3 font-nunito">
                                  Delivery de 19:30 a 23hs.
                                </h1>
                              )}
                              <p className="text-center text-xs text-gray-400 font-normal">
                                {open && "o elige un horario que sea mayor al tiempo de envío."}{" "}
                              </p>
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
                                <h1 className="font-semibold text-center text-gray-600 text-sm mt-3 font-nunito">
                                  tiempo de retiro <span className="text-gray-600 text-base">{demora}</span>
                                </h1>
                              ) : (
                                <h1 className="font-semibold text-center text-gray-600 text-sm mt-3 font-nunito">
                                  Horario de 19:30 a 23hs.
                                </h1>
                              )}
                              <p className="text-center text-xs text-gray-400 font-normal">
                                {open && "o elige un horario que sea mayor al tiempo de retiro."}{" "}
                              </p>
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
                      <div key={index}>
                        <div className="font-nunito py-3">
                          <div className="p-2  rounded-md">
                            <div className="flex justify-between items-center gap-x-2">
                              <div className="w-full ">
                                <a className="font-bold text-sky-800 ">
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
                              <div className="flex justify-center gap-2">
                                {item?.products && (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenModal(item)}
                                    className="font-normal font-poppins text-xs w-auto "
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    Ver Descripcion
                                  </button>
                                )}
                                <button type="button" onClick={() => deleteItem(item._id)}>
                                  <MdDeleteOutline size={30} className="text-red-700" />
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
                  <div className="font-nunito fixed bottom-0 w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white">
                    <div className="flex justify-between items-center p-3 font-poppins">
                      <div>
                        <p className="font-bold text-xl text-sky-800">Subtotal</p>
                        <h3 className="text-xl">$ {totalAmount}</h3>
                      </div>
                      <button
                        type="submit"
                        className="text-center font-nunito rounded-md w-auto p-4 text-white font-bold bg-sky-700 hover:bg-sky-800 hover:-translate-y-1 transition-all duration-500"
                      >
                        Continuar el pago
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-center w-full font-bold text-lg font-poppins">Tu Carrito esta vacio</p>
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
