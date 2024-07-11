/* eslint-disable no-use-before-define */
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-timezone";
import { setCheckout, setDelivery, setDemora, setOrderListLocal, setTotalAmount } from "store/reducers/orderSlice";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { setUser } from "store/reducers/userSlice";
import PriceTotal from "components/priceTotal";
import { formatearNumero } from "libs/items";
import { setSetting } from "store/reducers/settingSlice";
import { socket } from "socket";
import { getUrl } from "utils/getUrl";



export default function Checkout() {

  const user = useSelector(state => state.user);
  const { totalAmount, orderList, demora, delivery } = useSelector(state => state.order);
  const { promoBarra, promoEfectivo } = useSelector(state => state.setting);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const medios = ['Efectivo', 'Mercado Pago', 'Cuenta DNI', 'Open Pay']


  const isCanavaroVercel = getUrl() === 'canavaro-appweb.vercel.app'



  const enviarPedido = (pedido) => {
    if (!socket.connected) {
      socket.connect()
    }
    socket.emit('enviar-pedido', pedido)
    setTimeout(() => {
      socket.disconnect()
    }, 7000);
    router.push("checkout/successful");
  }

  const verificarSoloEfectivo = () => {
    const res = orderList.every(pedido => pedido.categoria === 'soloEfectivo');
    return res
  };
  useEffect(() => {
    if (Object.keys(promoEfectivo).length === 0) {
      const res = JSON.parse(localStorage.getItem('promo efectivo'))
      dispatch(setSetting({ promoEfectivo: res }))
    }
    if (orderList.length === 0) {
      const {
        nombre,
        telefono,
        direccion,
        demora,
        delivery,
        totalAmount,
        hPersonalizado,
        orderListLocal
      } = JSON.parse(localStorage.getItem('pedido'))
      dispatch(setUser({
        nombre,
        telefono,
        hPersonalizado,
        direccion
      }))
      dispatch(setOrderListLocal(orderListLocal))
      dispatch(setDemora(demora))
      dispatch(setDelivery(delivery))
      dispatch(setTotalAmount(totalAmount))
    }
  }, [])


  useEffect(() => {
    if (promoBarra?.available && delivery === "localActual") {
      const desc = totalAmount * 0.10
      const total = totalAmount - desc
      const convert = Math.floor(total);
      dispatch(setTotalAmount(convert))
    }
  }, [])

  return (
    <div className=" mx-auto relative w-full md:shadow-md  sm:w-4/5 md:w-3/5 lg:w-1/2 mt-2 h-full">
      <div className="p-3">
        <div className="flex items-center gap-3 py-2">
          <Link href={"/order/cart"}>
            <a>
              <FiChevronsLeft className=" text-slate-800 bg-slate-50 rounded-md shadow p-1 top-4 left-4" size={30} />
            </a>
          </Link>
          <h2 className="font-montserrat font-bold tracking-wider text-lg">Tu pedido</h2>
        </div>
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          cliente: user?.nombre || "",
          domicilio: user?.direccion || "",
          telefono: user?.telefono || "",
          hPersonalizado: user?.hPersonalizado || "",
          productos: orderList || {},
          comentarios: "",
          medioDePago: "Efectivo" || "",
          pagaCon: "",
          total: totalAmount || "",
        }}
        onSubmit={async values => {
          setIsSubmitting(true);


          const hora = moment.tz("America/Argentina/Buenos_Aires").format("HH:mm");
          const fecha = moment.tz("America/Argentina/Buenos_Aires").format("DD/MM");

          if (values.domicilio !== "") {
            try {
              const res = await axios.post("/api/sales/", {
                ...values,
                tipoEnvio: "Envio a domicilio",
                hora,
                fecha,
                liberado: false,
              });
              dispatch(setCheckout(res.data.response))

              if (isCanavaroVercel) {
                router.push("checkout/successful");
              } else {
                if (res.data.message === "ok") {
                  try {
                    enviarPedido(res.data.response)
                  } catch (error) {
                    alert("No se pudo Completar la acción")
                  }
                }
              }
            } catch (error) {
              alert("No se pudo Completar la acción")
            }
          } else {
            try {
              const res = await axios.post("/api/sales/", {
                ...values,
                tipoEnvio: "Retira por local",
                hora,
                fecha,
                liberado: false,
              });
              dispatch(setCheckout(res.data.response))
              if (isCanavaroVercel) {
                router.push("checkout/successful");
              } else {
                if (res.data.message === "ok") {
                  try {
                    enviarPedido(res.data.response)
                  } catch (error) {
                    alert("No se pudo Completar la acción")
                  }
                }
              }
            } catch (error) {
              alert("No se pudo Completar la acción")
            }
          }
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <div className="h-full">

                <div className="px-3">
                  <div className="border border-gray-200 p-2 py-3 rounded-lg">
                    <div>
                      {delivery === "domicilioActual" ? (
                        <div className="flex justify-between">
                          <h2 className="font-montserrat text-neutral-800 font-semibold text-sm">Dirección de envío</h2>
                          <p className="font-montserrat text-gray-600 px-1 text-sm">{user.direccion} </p>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <h2 className="font-montserrat text-neutral-800 font-semibold text-sm">Retira por local</h2>
                          <p className="font-montserrat text-gray-600 px-1 text-sm">{user.nombre}</p>
                        </div>
                      )}
                    </div>
                    <div className="bg-red-500 p-px my-2"></div>
                    {user?.hPersonalizado ? (
                      <div className="flex justify-between">
                        <h2 className="font-montserrat font-semibold text-sm text-neutral-800">
                          {delivery === "domicilioActual" ? "Horario de entrega" : "Retiralo"}
                        </h2>
                        <p className="font-montserrat px-1 text-sm text-gray-600">{user?.hPersonalizado}hs.</p>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <h2 className="font-montserrat font-semibold text-sm text-neutral-800">
                          {delivery === "domicilioActual" ? "Horario de entrega" : "Retiralo en"}
                        </h2>
                        <p className="font-montserrat px-1 text-sm text-gray-600">{demora} minutos</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-6 px-3 my-6">
                  <div>
                    <h2 className="font-montserrat text-xs font-medium pb-1 pl-1 text-neutral-800">Comentarios adicionales</h2>
                    <Field
                      id="comentarios"
                      name="comentarios"
                      className="border border-gray-200 rounded-lg w-full p-2 focus:border-gray-200 focus:ring-0"
                    />
                  </div>
                  <div className="h-full">
                    <h2 className="font-montserrat font-medium text-xs pb-1 pl-1 text-neutral-800">Medios de pago</h2>
                    {verificarSoloEfectivo() ? (
                      <p>solo podes abonar en efectivo</p>
                    ) : (
                      <>
                        <div className="w-full  border border-gray-200 rounded-lg ">
                          <Field
                            as="select"
                            name="medioDePago"
                            className=" border-none font-montserrat p-3  text-gray-900 font-normal text-sm rounded-lg  block w-full focus:ring-gray-300 "
                          >
                            {medios.map((item, index) => (
                              <option key={index} value={item} className="text-sm text-gray-500 font-montserrat font-semibold">
                                {item}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="mt-8">
                          {values.medioDePago === "Efectivo" && (
                            <Field
                              id="pagaCon"
                              type="number"
                              name="pagaCon"
                              className="border rounded-lg placeholder:text-gray-400  
                                       border-gray-200 font-montserrat text-sm w-full p-3 focus:ring-0 focus:border-gray-200"
                              placeholder="¿Con cuanto vas a pagar?"
                            />
                          )}
                          {values.medioDePago === "Mercado Pago" && (
                            <>
                              <p className="font-montserrat text-center font-semibold ">
                                por transferencia a <span className="text-md font-semibold font-montserrat text-sky-500">pizzeria.canavaro</span>
                              </p>
                              <p className="font-montserrat text-center font-semibold">
                                o mediante QR
                              </p>
                              <div className="flex justify-center w-full">
                                <Image src="/images/logo-mercadopago.png" width={100} height={100} alt="logoMP" />
                              </div>
                              <p className="font-montserrat text-center text-xs text-gray-400 font-normal">
                                Abonas al momento de confirmar el pedido por whatsapp
                              </p>
                            </>
                          )}
                          {values.medioDePago === "Cuenta DNI" && (
                            <>
                              <p className="font-montserrat text-center font-semibold">
                                De lunes a viernes 20% de reintegro
                              </p>
                              <p className="font-montserrat text-center font-semibold">
                                pagando con Cuenta DNI
                              </p>
                              <div className="flex justify-center w-full">
                                <Image src="/images/cuenta-dni.jpg" width={170} height={70} alt="logoOpen" />
                              </div>
                              <p className="font-montserrat text-center text-xs text-gray-400">
                                El reintegro lo realiza la billetera virtual, tope $5600 por mes.
                              </p>
                              <p className="font-montserrat text-center text-xs text-gray-400">
                                Abonas al momento de confirmar el pedido por whatsapp
                              </p>
                            </>
                          )}
                          {values.medioDePago === "Open Pay" && (
                            <>
                              <p className="font-montserrat text-center font-semibold ">
                                Los martes y viernes
                              </p>
                              <p className="font-montserrat text-center font-semibold">
                                30% de reintegro pagando con BBVA
                              </p>

                              <div className="flex justify-center w-full">
                                <Image src="/images/openpay.png" width={180} height={70} alt="logoOpen" />
                              </div>
                              <p className="font-montserrat text-center text-xs text-gray-400">
                                El reintegro lo realiza el banco, tope $5000 por mes.
                              </p>
                              <p className="font-montserrat text-center text-xs text-gray-400">
                                Abonas al momento de confirmar el pedido por whatsapp
                              </p>
                            </>
                          )}
                        </div>
                      </>
                    )}


                  </div>
                  <PriceTotal
                    orderList={orderList}
                    promoEfectivo={promoEfectivo}
                    totalPedido={totalAmount}
                  />
                </div>

                <div className="mx-auto font-montserrat px-3 sm:w-4/5 md:w-3/5 lg:w-1/2 fixed w-full bottom-2 bg-white">
                  <div className='flex items-center p-2 gap-2 justify-between w-full text-lg'>
                    <p className='font-semibold'>Total</p>
                    <p className='font-semibold'>{formatearNumero(values.total)}</p>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-center w-full font-montserrat rounded-lg justify-center items-center flex p-3 px-4 text-white bg-red-600 font-medium hover:-translate-y-1 transition-all duration-500"
                  >
                    {isSubmitting ? (
                      <ColorRing
                        visible={true}
                        height="30"
                        width="30"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
                      />
                    ) : "Confirmar pedido"}

                  </button>
                </div>
              </div>

            </Form >
          );
        }}
      </Formik>
    </div >
  );
}
