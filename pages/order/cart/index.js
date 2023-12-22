/* eslint-disable react/prop-types */
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft } from "react-icons/fi";
import { MdOutlineDeliveryDining, MdOutlineEmojiPeople, MdDeleteOutline } from "react-icons/md";
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
} from "store/reducers/orderSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { clearUser, setUser } from "store/reducers/userSlice";
import axios from "axios";
import * as Yup from "yup";
import ModalDescripcion from "components/modalDescripcion";
import moment from "moment-timezone";
import { setPromoBarra } from "store/reducers/settingSlice";
import { getDelay } from "services/fetchData";
import CardCart from "components/cardCart";
import toast, { Toaster } from "react-hot-toast";

export default function Cart({ data }) {
  const { orderList, totalAmount, demora } = useSelector(state => state.order);
  const { nombre, direccion, telefono } = useSelector(state => state.user);
  const { promoBarra } = useSelector(state => state.setting);
  const { products } = useSelector(state => state.product);


  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);
  const [showHourEdit, setShowHourEdit] = useState(false);


  const { orderPromo } = useSelector(state => state.order);
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
  const renderBebidas = renderProductos => {
    return products
      ?.filter(item => item.categoria === renderProductos && item.available === true)
      ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
      .map(data => <CardCart key={data._id} data={data} />);
  };

  const addCartPromo = value => {
    const res = value.find(item => item.categoria === "bebidas");

    if (res) {
      value.map(item => dispatch(addPromoOrderList({ ...item })));
      toast.success('Se agrego al pedido!')
      dispatch(clearOrderPromo());
      dispatch(calculateSubTotal());
      dispatch(calculateTotalQuantity());
    }
  };
  const validationSchema = Yup.object().shape(
    type === "domicilioActual"
      ? {
        direccion: Yup.string()
          .required("La dirección es obligatoria")
          .max(70, "La dirección no puede tener más de 70 caracteres"),
        telefono: Yup.string()
          .required('El teléfono es obligatorio')
          .matches(/^[0-9]+$/, 'El teléfono solo puede contener números')
          .min(10, 'El teléfono debe tener al menos 10 caracteres')
          .max(15, 'El teléfono no puede tener más de 15 caracteres'),
        hPersonalizado: Yup.string().matches(/^(\d+(:\d+)?)?$/, {
          message: 'El horario debe contener solo números o ser de tipo HH:mm',
          excludeEmptyString: true,
        }).notRequired(),
      }
      : {
        nombre: Yup.string()
          .required("El nombre es obligatorio")
          .max(30, "El nombre no puede tener más de 30 caracteres"),
        hPersonalizado: Yup.string().matches(/^(\d+(:\d+)?)?$/, {
          message: 'El horario debe contener solo números o ser de tipo HH:mm',
          excludeEmptyString: true,
        }).notRequired(),
      }
  );

  return (
    <div className="font-nunito  mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 h-full   rounded-t-3xl py-3 ">
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
            <div className="bg-white">
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
                    <h2 className="font-poppins font-bold text-lg">Tu pedido</h2>
                  </div>

                  <div className="py-2">
                    <div className="">
                      {promoBarra?.available && (
                        <div className="w-full mx-auto text-center font-bold">
                          Retirando por el local tenes un 10% de descuento.
                        </div>
                      )}
                      <div className="flex justify-center  w-full gap-3 text-sm bg-slate-50 shadow p-2 rounded-md">
                        <button
                          type="button"
                          onClick={() => {
                            changeTypeDelivery("domicilioActual", setFieldValue);
                          }}
                          className={
                            type === "domicilioActual"
                              ? "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-red-600 shadow text-white font-light p-3"
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
                              ? "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-red-600 shadow text-white font-light p-3"
                              : "w-1/2 rounded-md flex font-nunito items-center justify-center gap-2 bg-white shadow font-light p-3"
                          }
                        >
                          <MdOutlineEmojiPeople size={20} />
                          Retiro
                        </button>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-2 p-2 mt-3">
                        {type === "domicilioActual" ? (
                          <div className="w-full">
                            <div className="w-full">
                              <Field
                                id="direccion"
                                name="direccion"
                                className="border-t-0 border-l-0 border-r-0 border-b-2 p-1 px-2 border-gray-500 focus:border-gray-500   w-full  text-sm focus:ring-0 rounded"
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
                                className="border-t-0 border-l-0 border-r-0 border-b-2 border-gray-500 focus:border-gray-500   w-full p-1 px-2 text-sm focus:ring-0 rounded"
                                placeholder="Ingresa tu telefono"
                              />
                              <ErrorMessage name="telefono">
                                {msg => {
                                  return <div className="text-red-500 -font-medium text-sm">{msg}</div>;
                                }}
                              </ErrorMessage>
                            </div>
                            <div className="w-full mx-auto mt-2">
                              <div className="border rounded-md p-2 min-w-min text-sm">
                                {open ? (
                                  <>
                                    <h1 className="font-medium text-center text-gray-800  mt-1 font-poppins">
                                      Tiempo de envío: {demora} min.
                                    </h1>
                                    <p className="text-center text-xs text-gray-400 font-normal">
                                      o elige un horario que sea mayor al tiempo de envío {" "}
                                      <button
                                        type="button"
                                        className="text-gray-800"
                                        onClick={() => setShowHourEdit(!showHourEdit)}
                                      >hace click</button>
                                    </p>
                                    {showHourEdit &&
                                      <>
                                        <div className="w-full mx-auto flex justify-center mt-3">
                                          <Field
                                            id="hPersonalizado"
                                            name="hPersonalizado"
                                            className="border-b-2 border-gray-500 focus:border-gray-500 border-t-0 border-r-0 border-l-0 rounded w-2/5 p-1 px-2 text-sm text-center focus:ring-0"
                                            placeholder="Horario de entrega"
                                          />
                                        </div>
                                        <ErrorMessage name="hPersonalizado">
                                          {msg => {
                                            return <div className="text-red-500 -font-medium text-sm">{msg}</div>;
                                          }}
                                        </ErrorMessage>
                                      </>
                                    }
                                  </>
                                ) : (
                                  <h1 className="font-medium text-center text-gray-800 text-sm mt-1 font-poppins">
                                    Delivery de 19:30 a 23hs.
                                  </h1>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full mx-auto pt-1">
                            <Field
                              id="nombre"
                              name="nombre"
                              className="border-t-0 border-l-0 border-r-0 border-b-2 border-gray-500 focus:border-gray-500 focus:ring-0 rounded w-full p-1 px-2 text-sm"
                              placeholder="Ingresa tu nombre"
                            />
                            <ErrorMessage name="nombre">
                              {msg => {
                                return <div className="text-red-500 font-medium text-sm text-left">{msg}</div>;
                              }}
                            </ErrorMessage>

                            <div className="w-full mx-auto mt-2">
                              <div className="border rounded-md p-2 min-w-min text-sm">
                                {open ? (
                                  <>
                                    <h1 className="font-medium text-center text-gray-600 text-sm mt-1 font-poppins">
                                      Tiempo de retiro: {demora} min.
                                    </h1>
                                    <p className="text-center text-xs text-gray-400 font-normal">
                                      o elige un horario que sea mayor al tiempo de retiro {" "}
                                      <button
                                        type="button"
                                        className="text-gray-800"
                                        onClick={() => setShowHourEdit(!showHourEdit)}
                                      >hace click</button>
                                    </p>
                                    {showHourEdit &&
                                      <>
                                        <div className="w-full mx-auto flex justify-center mt-3">
                                          <Field
                                            id="hPersonalizado"
                                            name="hPersonalizado"
                                            className="border-b-2 border-gray-500 focus:border-gray-500 border-t-0 border-r-0 border-l-0 rounded w-2/5 p-1 px-2 text-sm text-center focus:ring-0"
                                            placeholder="Horario de entrega"
                                          />
                                        </div>
                                        <ErrorMessage name="hPersonalizado">
                                          {msg => {
                                            return <div className="text-red-500 -font-medium text-sm">{msg}</div>;
                                          }}
                                        </ErrorMessage>
                                      </>
                                    }
                                  </>
                                ) : (
                                  <h1 className="font-medium text-center text-gray-800 text-sm mt-1 font-poppins">
                                    Retiro de 19:30 a 23hs.
                                  </h1>
                                )}


                              </div>



                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {!orderList.some(item => item.categoria === 'bebidas') && (

                  <div className="p-2">
                    <h1 className="font-poppins font-bold text-gray-800 text-lg ">¿ Deseas agregar alguna bebida ?</h1>
                    <div className="flex overflow-x-scroll flexp h-auto    space-x-6 w-full p-2 mt-4  ">
                      <style jsx>
                        {`
                      .flexp::-webkit-scrollbar-thumb {
                        background: #FFFFFF;
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
                )}

                <div className="p-2 mb-16 pb-10 rounded-md">
                  <button
                    onClick={() => addCartPromo(orderPromo)}
                    type="button"
                    className={`${orderPromo.length < 1
                      ? "invisible"
                      : "p-3 px-4 font-semibold w-full font-nunito mb-3 bg-red-600 rounded-md text-white text-sm hover:-translate-y-1 transition-all duration-500"
                      }`}
                  >
                    Agregar al carrito
                  </button>
                  <h1 className="text-gray-800 font-bold font-poppins px-2 text-xl">Detalle pedido</h1>
                  <hr />
                  {orderList.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="font-nunito py-6">
                          <div className="p-2  rounded-md">
                            <div className="flex justify-between items-center gap-x-2">
                              <div className="w-full ">
                                <a className="font-bold text-neutral-800 ">
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
                        <p className="font-bold text-xl text-neutral-800">Subtotal</p>
                        <h3 className="text-xl">$ {totalAmount}</h3>
                      </div>
                      <button
                        type="submit"
                        className="text-center font-nunito rounded-md w-auto p-4 text-white font-bold bg-red-600 hover:bg-red-800 hover:-translate-y-1 transition-all duration-500"
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
