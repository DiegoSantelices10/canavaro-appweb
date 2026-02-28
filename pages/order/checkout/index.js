/* eslint-disable no-use-before-define */
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft, FiMapPin, FiClock, FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-timezone";
import { setCheckout, setDelivery, setDemora, setOrderListLocal, setTotalAmount } from "store/reducers/orderSlice";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { setUser } from "store/reducers/userSlice";
import PriceTotal from "components/PriceTotal";
import { formatearNumero } from "libs/items";
import { socket } from "socket";
import { getUrl } from "utils/getUrl";
import MeansOfPayment from "components/MeansOfPayment";
import ControllerInput from "components/ControllerInput";
import { motion, AnimatePresence } from "framer-motion";
import PromotionBanner from "components/PromotionBanner";


export default function Checkout() {

  const user = useSelector(state => state.user);
  const { totalAmount, orderList, demora, delivery } = useSelector(state => state.order);
  const { promoEfectivo, promoBarra } = useSelector(state => state.setting);

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
    const res = orderList.every(pedido => pedido.categoria === 'solo efectivo');
    return res
  };
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
    }
  }, [])


  return (
    <div className="mx-auto relative w-full md:shadow-md sm:w-4/5 md:w-3/5 lg:w-1/2 mt-2 h-full">
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

      {delivery === "domicilioActual" && (
        <div className="px-3">
          <PromotionBanner />
        </div>
      )}

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
        onSubmit={async values => {
          const valuesCurrent = {
            ...values,
            cliente: user?.nombre,
            domicilio: user?.direccion,
            telefono: user?.telefono,
            hPersonalizado: user?.hPersonalizado,
            productos: orderList,

          };
          setIsSubmitting(true);

          const hora = moment.tz("America/Argentina/Buenos_Aires").format("HH:mm");
          const fecha = moment.tz("America/Argentina/Buenos_Aires").format("DD/MM");

          if (values.domicilio !== "") {
            try {
              const res = await axios.post("/api/sales/", {
                ...valuesCurrent,
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
                ...valuesCurrent,
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
                  <div className="bg-white rounded-[32px] p-6 shadow-sm border border-neutral-100 space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-500 flex-shrink-0">
                        {delivery === "domicilioActual" ? <FiMapPin size={20} /> : <FiUser size={20} />}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1">
                          {delivery === "domicilioActual" ? "Dirección de envío" : "Retira por local"}
                        </h2>
                        <p className="font-extrabold text-neutral-800 text-sm font-montserrat uppercase">
                          {delivery === "domicilioActual" ? user.direccion : user.nombre}
                        </p>
                      </div>
                    </div>

                    <div className="h-px bg-neutral-100 w-full"></div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-500 flex-shrink-0">
                        <FiClock size={20} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-1">
                          {delivery === "domicilioActual" ? (user?.hPersonalizado ? "Horario de entrega" : "Tiempo estimado") : (user?.hPersonalizado ? "Retiralo" : "Retiralo en")}
                        </h2>
                        <p className="font-extrabold text-neutral-800 text-sm font-montserrat uppercase">
                          {user?.hPersonalizado ? `${user.hPersonalizado}hs.` : `${demora} minutos`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 px-3 my-6">
                  <div>
                    <ControllerInput
                      name="comentarios"
                      label='Comentarios adicionales'
                    />
                  </div>

                  <MeansOfPayment
                    verificarSoloEfectivo={verificarSoloEfectivo}
                    values={values}
                    medios={medios}
                  />

                  <PriceTotal
                    delivery={delivery}
                    promoBarra={promoBarra}
                    promoEfectivo={promoEfectivo}
                  />
                </div>

                <AnimatePresence>
                  <div className="fixed bottom-8 left-0 right-0 mx-auto px-6 z-40 w-full sm:w-4/5 md:w-3/5 lg:w-1/2">
                    <motion.div
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 100, opacity: 0 }}
                      className="flex justify-between items-center rounded-3xl p-4 bg-neutral-950/80 backdrop-blur-xl text-white border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                    >
                      <div className="flex flex-col items-start pl-2">
                        <p className="text-[9px] uppercase font-black text-neutral-500 tracking-[0.2em] mb-0.5">Total a pagar</p>
                        <p className="font-black text-xl font-montserrat tracking-tighter">
                          {formatearNumero(values.total)}
                        </p>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-4 bg-white text-neutral-950 rounded-2xl font-black font-montserrat text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all active:scale-95 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <ColorRing
                            visible={true}
                            height="20"
                            width="20"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#000000', '#000000', '#000000', '#000000', '#000000']}
                          />
                        ) : (
                          <>
                            Confirmar
                          </>
                        )}
                      </button>
                    </motion.div>
                  </div>
                </AnimatePresence>
              </div>

            </Form >
          );
        }}
      </Formik>
    </div >
  );
}
