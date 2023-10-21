/* eslint-disable no-use-before-define */
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-timezone";
import { setCheckout, setTotalAmount } from "store/reducers/orderSlice";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

export default function Checkout() {
  const user = useSelector(state => state.user);
  const { totalAmount, orderList, demora, delivery } = useSelector(state => state.order);
  const { promoBarra } = useSelector(state => state.setting);
  const [totalPedido, setTotalPedido] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    if (promoBarra?.available && delivery === "localActual") {
      promoDescuento()
    }
  }, [])

  const promoDescuento = () => {
    setTotalPedido(totalAmount)
    const desc = totalAmount * 0.10
    const total = totalAmount - desc
    const convert = Math.floor(total);
    dispatch(setTotalAmount(convert))
  }

const medios = [ 'Efectivo', 'Mercado Pago', 'Cuenta DNI', 'Open Pay']

  return (
    <div className=" mx-auto relative w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 h-full  rounded-t-3xl py-4">
      <div className="px-3">
        <div className="flex items-center gap-3 py-2">
          <Link href={"/order/cart"}>
            <a>
              <FiChevronsLeft className=" text-slate-800 bg-slate-50 rounded-md shadow p-1 top-4 left-4" size={30} />
            </a>
          </Link>
          <h2 className="font-nunito font-extrabold text-lg">Tu pedido</h2>
        </div>
      </div>

      <Formik
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
        enableReinitialize
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
                  const response = await axios.post("/api/pusher", res.data.response);

                  if (response.status === 200) {
                    router.push("checkout/successful",);
                  }
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
                  const response = await axios.post("/api/pusher", res.data.response);
                  if (response.status === 200) {
                    router.push("checkout/successful");
                  }
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
                <div className="p-3 py-2">
                  <div className="shadow-sm bg-gray-50 rounded p-2">
                    <div className="py-2">
                      {delivery === "domicilioActual" ? (
                        <>
                          <h2 className="font-nunito text-sky-800 font-bold text-sm">Dirección de envío</h2>
                          <p className="font-nunito text-gray-600 text-sm">{user.direccion} </p>
                        </>
                      ) : (
                        <>
                          <h2 className="font-nunito text-sky-800 font-bold text-sm">Retira por local</h2>
                          <p className="font-nunito text-sm">Nombre: <span className="text-gray-600">{user.nombre}</span> </p>
                        </>
                      )}
                    </div>
                    <hr />
                    {user?.hPersonalizado ? (
                      <div className="py-2" >
                        <h2 className="font-nunito font-bold text-sm text-sky-800">
                          {delivery === "domicilioActual" ? "Horario de entrega" : "Retiralo"}
                        </h2>
                        <p className="font-nunito text-sm text-gray-500">{user?.hPersonalizado}hs.</p>
                      </div>
                    ) : (
                      <div className="py-2">
                        <h2 className="font-nunito font-bold text-sm text-sky-800">
                          {delivery === "domicilioActual" ? "Horario de entrega" : "Retiralo en"}
                        </h2>
                        <p className="font-nunito text-sm text-gray-500">{demora}</p>
                      </div>
                    )}

                    <hr />
                    <div className="py-2">
                      <h2 className="font-nunito font-bold text-sm pb-1 text-sky-800">Comentarios adicionales</h2>
                      <Field
                        id="comentarios"
                        name="comentarios"
                        className="border border-slate-300 rounded-md w-full p-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-5 h-full mb-20 rounded">
                <h2 className="font-nunito font-bold text-sm py-3 text-sky-800">Medios de pago</h2>
                  <div className="w-full h-10 border-none shadow rounded ">
                    <Field
                      as="select" 
                      name="medioDePago"
                      className="h-10 border-none font-nunito  text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:rounded focus:ring-slate-300 "
                    >
                      {medios.map((item, index) => (
                        <option key={index} value={item} className="text-sm text-gray-500 font-nunito font-semibold">
                          {item}
                        </option>
                       
                      ))}
                    </Field>
                  </div>
                  <div>
                    <div className="py-4">
                      {values.medioDePago === "Efectivo" && (
                        <Field
                          id="pagaCon"
                          name="pagaCon"
                          className="border border-slate-300 rounded-md w-full p-2"
                          placeholder="¿Con cuanto vas a pagar?"
                        />
                      )}
                      {values.medioDePago === "Mercado Pago" && (
                        <>
                          <p className="font-nunito text-center font-semibold ">
                            por transferencia a <span className="text-md font-semibold font-poppins text-sky-800">pizzeria.canavaro</span>
                          </p>
                          <p className="font-nunito text-center font-semibold">
                            o mediante QR
                          </p>
                          <div className="flex justify-center w-full">
                            <Image src="/images/logo-mercadopago.png" width={100} height={100} alt="logoMP" />
                          </div>
                          <p className="font-nunito text-center text-xs text-gray-400 font-semibold">
                            Abonas al momento de confirmar el pedido por whatsapp
                          </p>
                        </>
                      )}
                      {values.medioDePago === "Cuenta DNI" && (
                        <>
                          <p className="font-nunito text-center font-semibold ">
                            Todos los miercoles y jueves 30% de reintegro
                          </p>
                          <p className="font-nunito text-center font-semibold">
                            pagando con Cuenta DNI
                          </p>
                          <div className="flex justify-center w-full">
                            <Image src="/images/cuenta-dni.jpg" width={170} height={70} alt="logoOpen" />
                          </div>
                          <p className="font-nunito text-center text-xs text-gray-400 font-semibold">
                            El reintegro lo realiza la billetera virtual, tope $2500 por semana.
                          </p>
                          <p className="font-nunito text-center text-xs text-gray-400 font-semibold">
                            Abonas al momento de confirmar el pedido por whatsapp
                          </p>
                        </>
                      )}
                      {values.medioDePago === "Open Pay" && (
                        <>
                          <p className="font-nunito text-center font-semibold ">
                            Todos los martes 30% de reintegro
                          </p>
                          <p className="font-nunito text-center font-semibold">
                            pagando con BBVA
                          </p>

                          <div className="flex justify-center w-full">
                            <Image src="/images/openpay.png" width={180} height={70} alt="logoOpen" />
                          </div>
                          <p className="font-nunito text-center text-xs text-gray-400 font-semibold">
                            El reintegro lo realiza el banco, tope $2000 por mes.
                          </p>
                          <p className="font-nunito text-center text-xs text-gray-400 font-semibold">
                            Todos los dias 3 cuotas sin interes, menos los martes.
                          </p>
                          <p className="font-nunito text-center text-xs text-gray-400 font-semibold">
                            Abonas al momento de confirmar el pedido por whatsapp
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className={`fixed p-2 bg-sky-700 flex items-center justify-between ${delivery?.available && delivery === "localActual" ? "items-end" : "items-end"} bottom-0 w-full  sm:w-4/5 md:w-3/5 lg:w-2/5`}>

                  <div className="w-1/2 flex flex-col">
                    {promoBarra?.available && delivery === "localActual" ? (
                      <>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1 p-0">
                            <p className="text-sm text-white font-bold">Subtotal<span className="font-normal"> ${totalPedido}</span></p>
                            <p className="text-white text-sm font-normal"> - 10%</p>
                          </div>
                        </div>
                        <div className="font-poppins">
                          <p className="font-bold text-base text-white">Total</p>
                          <h3 className="text-lg text-white font-normal">$ {totalAmount}</h3>
                        </div>
                      </>

                    ) : (
                      <div className="flex justify-start items-center gap-3 px-3">
                        <p className="font-bold font-nunito text-center text-xl text-white">Total</p>
                        <h3 className="text-xl text-center font-nunito text-white font-light">$ {totalAmount}</h3>
                      </div>
                    )}
                  </div>
                  <div className="w-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-center font-nunito rounded-md justify-center items-center flex h-12 w-[170px] text-sky-800 bg-white font-semibold hover:-translate-y-1 transition-all duration-500"
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
              </Form >
            </div >
          );
        }}
      </Formik >
    </div >
  );
}
