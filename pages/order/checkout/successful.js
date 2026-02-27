import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { FaWhatsapp, FaDownload } from "react-icons/fa"
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { formatearNumero } from "libs/items";
import { capitalizeFirstLetter } from "utils";
import Link from "next/link";
import { FiHome, FiClock, FiMapPin, FiCreditCard, FiUser } from "react-icons/fi";

const Successful = () => {
  const { checkout, demora, delivery, orderList } = useSelector(state => state.order);
  const { promoEfectivo: { available, descuento } } = useSelector(state => state.setting);
  const [subTotal, setSubTotal] = useState(0);

  const hasProductosEfectivo = () => {
    return orderList.filter(product => product.categoria === "solo efectivo");
  }

  const hasProductosGeneral = () => {
    return orderList.filter(product => product.categoria !== "solo efectivo");
  }

  useEffect(() => {
    const productosGeneral = hasProductosGeneral()
    const sumGeneral = productosGeneral.reduce((acumulador, producto) => {
      return acumulador + (producto.precio * producto.cantidad);
    }, 0);
    setSubTotal(sumGeneral)
  }, [])

  const handleCapture = () => {
    const containerPedido = document.getElementById('container-pedido');
    html2canvas(containerPedido, {
      backgroundColor: '#ffffff',
      scale: 2,
      logging: false,
      useCORS: true
    }).then((canvas) => {
      const screenshot = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = screenshot;
      downloadLink.download = `Pedido-${checkout?.fecha || 'ticket'}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  if (!checkout) return null;

  return (
    <div className="min-h-screen bg-neutral-50 font-montserrat pb-40">
      {/* Success Header Animation */}
      <div className="pt-12 pb-8 px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200"
        >
          <BsFillCheckCircleFill className="text-white text-4xl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl font-black text-neutral-900 uppercase tracking-tighter mb-2">
            ¡Pedido Recibido!
          </h1>
          <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest opacity-70">
            Confirmalo ahora por WhatsApp
          </p>
        </motion.div>
      </div>

      {/* Ticket Container */}
      <div className="px-6 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          id="container-pedido"
          className="bg-white rounded-[32px] shadow-2xl shadow-neutral-200 overflow-hidden border border-neutral-100 relative"
        >
          {/* Ticket Header */}
          <div className="bg-neutral-900 p-6 text-white text-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-1">Pizzería Canavaro</h2>
            <div className="flex justify-center items-center gap-4 text-xs font-bold uppercase tracking-tighter">
              <span>{checkout.fecha}</span>
              <span className="w-1 h-1 bg-neutral-700 rounded-full"></span>
              <span>{checkout.hora}hs.</span>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-[9px] font-black text-neutral-400 uppercase tracking-wider">
                  <FiClock /> Entrega
                </span>
                <p className="text-xs font-black text-neutral-800 uppercase">
                  {checkout.hPersonalizado === "" ? `${demora} min.` : `${checkout.hPersonalizado}hs.`}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <span className="flex items-center gap-1.5 justify-end text-[9px] font-black text-neutral-400 uppercase tracking-wider">
                  <FiCreditCard /> Pago
                </span>
                <p className="text-xs font-black text-neutral-800 uppercase line-clamp-1">
                  {checkout.medioDePago}
                </p>
              </div>
              <div className="col-span-2 pt-2 border-t border-neutral-200/50 space-y-1">
                <span className="flex items-center gap-1.5 text-[9px] font-black text-neutral-400 uppercase tracking-wider">
                  {delivery === "domicilioActual" ? <FiMapPin /> : <FiUser />} {delivery === "domicilioActual" ? "Domicilio" : "Retira"}
                </span>
                <p className="text-xs font-black text-neutral-800 uppercase">
                  {delivery === "domicilioActual" ? checkout.domicilio : checkout.cliente}
                </p>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase text-neutral-400 tracking-widest pl-1">Tu Detalle</h3>
              <div className="divide-y divide-neutral-100">
                {hasProductosGeneral()?.map((product, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-neutral-100 text-neutral-500 font-black px-1.5 py-0.5 rounded">
                          {product.categoria === "empanadas" ? product.cant : product.cantidad}x
                        </span>
                        <h4 className="text-xs font-black text-neutral-800 uppercase leading-tight">
                          {(product.categoria === "pizzas" && product.tamanio) ? capitalizeFirstLetter(product.tamanio) + " " + product.nombre : product.nombre}
                        </h4>
                      </div>
                      {product?.descripcion && product.categoria !== "promociones" && (
                        <p className="text-[9px] text-neutral-400 font-bold uppercase mt-1 pl-8">{product.descripcion}</p>
                      )}
                      {product.products?.map((item, i) => (
                        <p key={i} className="text-[9px] text-neutral-400 font-bold uppercase mt-1 pl-8">
                          + {item.nombre} ({item.cant || item.cantidad}u)
                        </p>
                      ))}
                      {product.comentarios && (
                        <p className="text-[9px] text-red-500 font-black uppercase mt-1 pl-8">Obs: {product.comentarios}</p>
                      )}
                    </div>
                    <p className="text-xs font-black text-neutral-900">
                      {formatearNumero(product.precio * product.cantidad)}
                    </p>
                  </div>
                ))}

                {hasProductosEfectivo()?.map((product, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-neutral-100 text-neutral-500 font-black px-1.5 py-0.5 rounded">
                          {product.cantidad}x
                        </span>
                        <h4 className="text-xs font-black text-neutral-800 uppercase leading-tight">
                          {product.nombre}
                        </h4>
                      </div>
                      <span className="text-[8px] bg-amber-100 text-amber-700 font-black px-1 rounded ml-8 uppercase">Solo Efectivo</span>
                    </div>
                    <p className="text-xs font-black text-neutral-900">
                      {formatearNumero(product.precio * product.cantidad)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Totals */}
            <div className="pt-4 border-t-2 border-dashed border-neutral-100 space-y-2">
              {checkout.medioDePago === 'Efectivo' && available && (
                <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 p-2 rounded-xl">
                  <span className="text-[9px] font-black uppercase tracking-wider">Ahorro Efectivo ({descuento}%)</span>
                  <span className="text-xs font-black">-{formatearNumero(subTotal * (descuento / 100))}</span>
                </div>
              )}
              <div className="flex justify-between items-center p-2">
                <span className="text-xs font-black text-neutral-800 uppercase tracking-widest">Total Final</span>
                <span className="text-xl font-black text-neutral-900 tracking-tighter">
                  {formatearNumero(checkout.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Zigzag Bottom Decor */}
          <div className="h-4 w-full bg-white relative flex">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex-1 h-3 bg-neutral-50 rounded-full -mt-2"></div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Actions */}
      <AnimatePresence>
        <div className="fixed bottom-8 left-0 right-0 mx-auto px-6 z-40 max-w-lg space-y-3">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20confirmar%20mi%20pedido%20de:%20${checkout.domicilio !== "" ? checkout.domicilio : checkout.cliente}%0ATotal:%20$%20${checkout.total}%0APaga%20con:%20${checkout.medioDePago}`}
              className="flex items-center justify-center gap-3 w-full py-5 bg-emerald-500 text-white rounded-[24px] font-black font-montserrat text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-200 hover:bg-emerald-600 transition-all active:scale-95"
            >
              <FaWhatsapp size={20} />
              Confirmar en WhatsApp
            </a>
          </motion.div>

          <div className="flex gap-3">
            <Link href="/">
              <a className="flex-1 flex items-center justify-center gap-2 py-4 bg-neutral-950 text-white rounded-[20px] font-black font-montserrat text-[10px] uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-xl">
                <FiHome size={16} /> Volver
              </a>
            </Link>
            <button
              onClick={handleCapture}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-neutral-900 border border-neutral-200 rounded-[20px] font-black font-montserrat text-[10px] uppercase tracking-wider hover:bg-neutral-50 transition-all shadow-xl"
            >
              <FaDownload size={14} /> Ticket
            </button>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}

export default Successful;