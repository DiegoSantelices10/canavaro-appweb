import axios from "axios";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiChevronsLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment-timezone";
import { setCheckout } from "store/reducers/orderSlice";


export default function Checkout() {
  const user = useSelector(state => state.user);
  const { totalAmount, orderList, demora } = useSelector(state => state.order);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className=" mx-auto w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 h-full  rounded-t-3xl py-4">
      <div className="px-3">
        <div className="flex items-center gap-3 py-4">
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
          medioDePago: "efectivo" || "",
          pagaCon: 0,
          total: totalAmount || "",
        }}
        onSubmit={async values => {
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
                <div className="p-3 py-5">
                  <div className="shadow bg-slate-50 rounded-md p-2">
                    <div className="p-1 py-3">
                      {user.direccion !== "" ? (
                        <>
                          <h2 className="font-nunito text-sky-900 font-extrabold text-base">Direccion de envio</h2>
                          <p className="font-nunito text-gray-600">{user.direccion} </p>
                        </>
                      ) : (
                        <>
                          <h2 className="font-nunito text-sky-900 font-extrabold text-base">Retira por local</h2>
                          <p className="font-nunito">Nombre: <span className="text-gray-600">{user.nombre}</span> </p>
                        </>
                      )}
                    </div>
                    <hr />
                    {user?.hPersonalizado ? (
                      <div className="p-1 py-3">
                        <h2 className="font-nunito font-extrabold text-base text-sky-900">
                          {user?.direccion !== "" ? "horario de entrega" : "Retiralo"}
                        </h2>
                        <p className="font-nunito px-1 text-gray-500">{user?.hPersonalizado}hs.</p>
                      </div>
                    ) : (
                      <div className="p-1 py-3">
                        <h2 className="font-nunito font-extrabold text-base text-sky-900">
                          {user?.direccion !== "" ? "horario de entrega" : "Retiralo en"}
                        </h2>
                        <p className="font-nunito px-1 text-gray-500">{demora}</p>
                      </div>


                    )}

                    <hr />
                    <div className="p-1">
                      <h2 className="font-nunito font-extrabold text-base pb-1 text-sky-900">Comentarios adicionales</h2>
                      <Field
                        id="comentarios"
                        name="comentarios"
                        className="border border-slate-300 rounded-md w-full p-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-6 h-full">
                  <h2 className="font-nunito font-extrabold text-base px-1 text-sky-900">Medio de pago</h2>
                  <div>
                    <div
                      role="group"
                      aria-labelledby="my-radio-group"
                      className="w-full text-base  text-slate-400 flex justify-center items-center h-10 gap-10"
                    >
                      <label className="font-nunito">
                        <Field
                          type="radio"
                          name="medioDePago"
                          value="efectivo"
                          className="font-nunito mx-5 p-2 rounded-md"
                        />
                        Efectivo
                      </label>
                      <label className="font-nunito">
                        <Field type="radio" name="medioDePago" value="mercadoPago" className="mx-5 p-2 rounded-md" />
                        Mercado Pago
                      </label>
                    </div>
                    <div className="py-2">
                      {values.medioDePago === "efectivo" && (
                        <Field
                          id="pagaCon"
                          name="pagaCon"
                          className="border border-slate-300 rounded-md w-full p-2"
                          placeholder="¿Con cuanto vas a pagar?"
                        />
                      )}
                      {values.medioDePago === "mercadoPago" && (
                        <>
                          <div className="flex justify-center w-full">
                            <Image src="/images/logoMP.webp" width={100} height={100} alt="logoMP" />
                          </div>
                          <p className="font-nunito text-center font-semibold p-2">
                            Abonas con QR al momento de recibir el pedido!
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="fixed bottom-3 w-full  sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white">
                  <div className="flex justify-between items-center p-3">
                    <p className="text-xl text-sky-900 font-bold">Total</p>
                    <h3 className="text-2xl font-nunito font-bold">$ {totalAmount}</h3>
                  </div>

                  <div className="px-3 w-full">
                    <button
                      type="submit"
                      className="text-center font-nunito rounded-md w-full p-4 text-white font-bold bg-sky-800 hover:bg-sky-700 hover:-translate-y-1 transition-all duration-500"
                    >
                      Confirmar pedido
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
