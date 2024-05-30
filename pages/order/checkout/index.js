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
import io from 'socket.io-client';
import PriceTotal from "components/priceTotal";


const socket = io.connect('https://pizzacanavaro-socket.com')

export default function Checkout() {

  const user = useSelector(state => state.user);
  const { totalAmount, orderList, demora, delivery } = useSelector(state => state.order);
  const { promoBarra, promoEfectivo } = useSelector(state => state.setting);

  const [totalPedido, setTotalPedido] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const medios = ['Efectivo', 'Mercado Pago', 'Cuenta DNI', 'Open Pay']

  const enviarPedido = (pedido) => {
    socket.emit('enviar-pedido', pedido)
    socket.disconnect()
    router.push("checkout/successful");
  }
  useEffect(() => {
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
      setTotalPedido(totalAmount)

    }
    setTotalPedido(totalAmount)
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
    <div className=" mx-auto relative w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 h-full  rounded-t-3xl py-4">
      <div className="px-3">
        <div className="flex items-center gap-3 py-2">
          <Link href={"/order/cart"}>
            <a>
              <FiChevronsLeft className=" text-slate-800 bg-slate-50 rounded-md shadow p-1 top-4 left-4" size={30} />
            </a>
          </Link>
          <h2 className="font-poppins font-bold tracking-wider text-lg">Tu pedido</h2>
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
              if (res.data.message === "ok") {
                try {
                  enviarPedido(res.data.response)
                } catch (error) {
                  alert("No se pudo Completar la acción")
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
              if (res.data.message === "ok") {
                try {
                  enviarPedido(res.data.response)
                } catch (error) {
                  alert("No se pudo Completar la acción")
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
            <div className="h-full">
              <Form>
                <div className="p-2 py-2">
                  <div className=" rounded p-2">
                    <div className="py-2">
                      {delivery === "domicilioActual" ? (
                        <>
                          <h2 className="font-poppins text-neutral-800 font-semibold text-base">Dirección de envío</h2>
                          <p className="font-poppins text-gray-600 text-sm">{user.direccion} </p>
                        </>
                      ) : (
                        <>
                          <h2 className="font-poppins text-neutral-800 font-semibold text-base">Retira por local</h2>
                          <p className="font-poppins text-gray-600 text-base">{user.nombre}</p>
                        </>
                      )}
                    </div>
                    <div className="bg-red-500 p-px"></div>
                    {user?.hPersonalizado ? (
                      <div className="py-2" >
                        <h2 className="font-poppins font-semibold text-base text-neutral-800">
                          {delivery === "domicilioActual" ? "Horario de entrega" : "Retiralo"}
                        </h2>
                        <p className="font-poppins text-base text-gray-600">{user?.hPersonalizado}hs.</p>
                      </div>
                    ) : (
                      <div className="py-2 mt-3">
                        <h2 className="font-poppins font-semibold text-base text-neutral-800">
                          {delivery === "domicilioActual" ? "Horario de entrega" : "Retiralo en"}
                        </h2>
                        <p className="font-poppins text-sm text-gray-600">{demora}m.</p>
                      </div>
                    )}
                    <div className="bg-red-500 p-px"></div>
                  </div>
                </div>
                <div className="px-4 h-full mb-20 rounded">
                  {promoEfectivo?.available && (
                    <div className="bg-red-500 w-auto p-2 rounded-xl my-4">
                      <p className="text-white text-center font-normal">¡ Abonando en efectivo tenes un {promoEfectivo?.descuento}% de descuento !</p>
                    </div>
                  )}
                  <h2 className="font-poppins font-semibold text-base py-3 text-neutral-800">Medios de pago</h2>
                  <div className="w-full  border border-gray-200 rounded-xl ">
                    <Field
                      as="select"
                      name="medioDePago"
                      className=" border-none font-poppins p-3  text-gray-900 font-normal text-sm rounded-xl  block w-full focus:ring-slate-300 "
                    >
                      {medios.map((item, index) => (
                        <option key={index} value={item} className="text-sm text-gray-500 font-poppins font-semibold">
                          {item}
                        </option>

                      ))}
                    </Field>
                  </div>
                  <div>
                    <div className="py-6">
                      {values.medioDePago === "Efectivo" && (
                        <Field
                          id="pagaCon"
                          type="number"
                          name="pagaCon"
                          className="border rounded-md border-t-0 border-r-0 border-l-0 border-b 
                          border-gray-300 font-poppins text-sm w-full p-2 focus:ring-0 focus:border-gray-600"
                          placeholder="¿Con cuanto vas a pagar?"
                        />
                      )}
                      {values.medioDePago === "Mercado Pago" && (
                        <>
                          <p className="font-poppins text-center font-semibold ">
                            por transferencia a <span className="text-md font-semibold font-poppins text-sky-500">pizzeria.canavaro</span>
                          </p>
                          <p className="font-poppins text-center font-semibold">
                            o mediante QR
                          </p>
                          <div className="flex justify-center w-full">
                            <Image src="/images/logo-mercadopago.png" width={100} height={100} alt="logoMP" />
                          </div>
                          <p className="font-poppins text-center text-xs text-gray-400 font-normal">
                            Abonas al momento de confirmar el pedido por whatsapp
                          </p>
                        </>
                      )}
                      {values.medioDePago === "Cuenta DNI" && (
                        <>
                          <p className="font-poppins text-center font-semibold">
                            De martes a viernes 20% de reintegro
                          </p>
                          <p className="font-poppins text-center font-semibold">
                            pagando con Cuenta DNI
                          </p>
                          <div className="flex justify-center w-full">
                            <Image src="/images/cuenta-dni.jpg" width={170} height={70} alt="logoOpen" />
                          </div>
                          <p className="font-poppins text-center text-xs text-gray-400">
                            El reintegro lo realiza la billetera virtual, tope $4600 por mes.
                          </p>
                          <p className="font-poppins text-center text-xs text-gray-400">
                            Abonas al momento de confirmar el pedido por whatsapp
                          </p>
                        </>
                      )}
                      {values.medioDePago === "Open Pay" && (
                        <>
                          <p className="font-poppins text-center font-semibold ">
                            Los martes y viernes de abril
                          </p>
                          <p className="font-poppins text-center font-semibold">
                            30% de reintegro pagando con BBVA
                          </p>

                          <div className="flex justify-center w-full">
                            <Image src="/images/openpay.png" width={180} height={70} alt="logoOpen" />
                          </div>
                          <p className="font-poppins text-center text-xs text-gray-400">
                            El reintegro lo realiza el banco, tope $3500 por mes.
                          </p>
                          <p className="font-poppins text-center text-xs text-gray-400">
                            Abonas al momento de confirmar el pedido por whatsapp
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h2 className="font-poppins text-sm font-semibold pb-1 text-neutral-800">Comentarios adicionales</h2>
                    <Field
                      id="comentarios"
                      name="comentarios"
                      className="border border-slate-300 rounded-xl w-full p-2"
                    />
                  </div>
                </div>

                <div className={`fixed p-2 bottom-0 w-full bg-white  sm:w-4/5 md:w-3/5 lg:w-2/5`}>
                  <div className="flex justify-between items-end">
                    <PriceTotal
                      descuento={promoEfectivo?.descuento}
                      available={promoEfectivo?.available}
                      totalPedido={totalPedido}
                    />
                    <div className="w-auto">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-center font-poppins mb-1 rounded-2xl justify-center items-center flex p-4 text-white bg-red-600 font-semibold hover:-translate-y-1 transition-all duration-500"
                      >
                        {isSubmitting ? (
                          <ColorRing
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#2A79D9', '#2A79D9', '#2A79D9', '#2A79D9', '#2A79D9']}
                          />
                        ) : "Confirmar pedido"}

                      </button>
                    </div>

                  </div>
                </div>
              </Form >
            </div >
          );
        }}
      </Formik>
    </div >
  );
}
