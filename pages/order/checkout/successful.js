import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaWhatsapp, FaDownload } from "react-icons/fa"
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { formatearNumero } from "libs/items";


export default function successful() {
  const { checkout, demora, delivery, orderList, totalAmount } = useSelector(state => state.order);
  const { promoEfectivo: { available, descuento } } = useSelector(state => state.setting);
  const [subTotal, setSubTotal] = useState(0);
  const hasProductosEfectivo = () => {
    return orderList.filter(product => product.categoria === "soloEfectivo");
  }
  const hasProductosGeneral = () => {
    return orderList.filter(product => product.categoria !== "soloEfectivo");
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
    html2canvas(containerPedido).then((canvas) => {
      const screenshot = canvas.toDataURL('image/png');
      // Crea un enlace descargable
      const downloadLink = document.createElement('a');
      downloadLink.href = screenshot;
      downloadLink.download = "Pedido-" + checkout.fecha;

      document.body.appendChild(downloadLink);
      downloadLink.click();

      document.body.removeChild(downloadLink);
    });
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const renderSubtotal = (descuento) => {
    const sumTotal = hasProductosGeneral().reduce((acumulador, producto) => {
      return acumulador + (producto.precio * producto.cantidad);
    }, 0);
    return sumTotal - (sumTotal * (descuento / 100));
  }
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <motion.div
        initial={{
          width: "100vw",
          height: "100vw",
          borderRadius: "50%",
          backgroundColor: "#5EEF7B",
        }}
        animate={{ width: 0, height: 0, borderRadius: "50%", backgroundColor: "#5EEF7B" }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          width: "100%",
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <motion.div variants={textVariants}>
          <BsFillCheckCircleFill
            style={{
              fontSize: "60px",
              color: "#5EEF7B",
              margin: "auto",
            }}
          />
          <h2 className="text-gray-800 font-poppins text-lg font-bold w-full py-2">¡Ya recibimos tu pedido! </h2>
        </motion.div>

      </motion.div>
      <div className="p-2 w-full md:w-1/2 lg:w-1/2 mx-auto">
        <div className="flex justify-center items-center flex-col  gap-1">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20confirmar%20mi%20pedido%20de:%20${checkout.domicilio !== "" ? checkout.domicilio : checkout.cliente}%0ATotal:%20$%20${checkout.total}%0APaga%20con:%20${checkout.medioDePago}`}
          >
            <div className="flex items-center gap-2  bg-green-500  p-3 text-white font-semibold rounded-xl shadow-md">
              <FaWhatsapp size={18} />
              Ir a whatsapp</div>
          </a>
          <p className=" text-xs font-poppins font-normal text-neutral-400">¡Confirma tu pedido por whatsapp!</p>
        </div>
        <div id="container-pedido">
          <div className="flex justify-between items-center p-1 mt-3">
            <p className=" font-semibold font-poppins text-base">

              Detalle del pedido
            </p>
            <h1 className="font-medium font-poppins">{checkout.hora}hs.</h1>
          </div>
          <div className="w-full h-auto rounded-md border-gray-200 border mt-1 p-2">
            <div className="flex justify-between">
              <div className="w-full">
                {delivery === "domicilioActual" ? (
                  <>
                    <div className="mt-1">
                      <h1 className="font-semibold text-sm font-poppins">Horario de envío</h1>
                      <span className="text-gray-400 text-sm font-normal font-poppins">
                        {checkout.hPersonalizado === "" ? demora + " min." : checkout.hPersonalizado + "hs."}</span>
                    </div>
                    <div className="mt-1">
                      <h2 className="font-poppins text-sm  font-semibold">Domicilio</h2>
                      <span className="font-poppins text-sm font-normal text-gray-400">{checkout.domicilio} </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-1">
                      <h1 className="font-semibold text-sm font-poppins">Horario de retiro</h1>
                      <span className="text-gray-400 text-sm font-poppins  font-normal">
                        {checkout.hPersonalizado === "" ? demora : checkout.hPersonalizado + "hs."}</span>
                    </div>
                    <div className="mt-1">
                      <h2 className="font-poppins text-sm font-semibold">Retira por local</h2>
                      <span className="text-gray-400 text-sm font-normal font-poppins"> {checkout.cliente}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-1">
              <h2 className="font-poppins text-sm font-semibold ">Medio de pago</h2>
              <span className="text-gray-400 text-sm font-normal font-poppins"> {checkout.medioDePago}</span>
            </div>
            <div >
              {checkout.comentarios && (
                <div className="mt-1">
                  <p className="font-poppins text-sm font-semibold">Comentarios</p>
                  <span className="text-gray-400 font-poppins text-sm font-normal"> {checkout.comentarios}</span>
                </div>
              )}
            </div>
            <h2 className="font-poppins text-base font-semibold mt-1">Pedido</h2>
            <div className="w-full font-poppins relative">
              {available && hasProductosEfectivo()?.length > 0 && hasProductosGeneral()?.length > 0 && (
                <>
                  <div className='my-2'>
                    {hasProductosGeneral()?.map(product => (
                      <div key={product._id} className='flex justify-between items-center w-full py-1'>
                        <h3 className='text-sm font-semibold text-slate-800'>{product.nombre} <span className='text-xs text-gray-800 font-light'>{product.categoria === "empanadas" ? `x ${product.cant}` : `x ${product.cantidad}`}</span> </h3>
                        <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                      </div>
                    ))}
                    {checkout.medioDePago === 'Efectivo' && (
                      <>
                        <hr className='my-1' />
                        <div className='flex items-center justify-between'>
                          <p className='py-1 text-sm font-semibold text-slate-800'>Subtotal</p>
                          <p className='text-sm'>{formatearNumero(subTotal)}</p>
                        </div>
                      </>
                    )}
                    {checkout.medioDePago === 'Efectivo' && (
                      <div className='flex text-red-500 items-center justify-between w-full'>
                        <p className='text-xs'>Abonando en efectivo, descuento del {descuento}%</p>
                        <p className='text-sm'>{formatearNumero(renderSubtotal(descuento))}</p>
                      </div>
                    )}
                  </div>
                  <h3 className='text-xs font-medium text-gray-400'>Solo efectivo{`${checkout.medioDePago === 'Efectivo' ? ", no aplica el descuento" : ""}`}</h3>
                  {hasProductosEfectivo()?.map(product => (
                    <div key={product._id} className='flex justify-between w-full items-center py-1'>
                      <h3 className='text-sm font-semibold text-slate-800'>{product.nombre}<span className='text-xs text-gray-800 font-light'>{` ${product.cantidad}u`}</span></h3>
                      <div className='flex gap-4 items-center'>
                        <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                      </div>
                    </div>

                  ))}
                </>
              )}
              {hasProductosGeneral()?.length === 0 && hasProductosEfectivo().map(product => (
                <div key={product._id} className='flex justify-between w-full items-center py-1'>
                  <h3 className='text-sm font-semibold text-slate-800'>{product.nombre}<span className='text-xs text-gray-800 font-light'>{` ${product.cantidad}u`}</span></h3>
                  <div className='flex gap-4 items-center'>
                    <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                  </div>
                </div>
              ))}
              {hasProductosEfectivo()?.length === 0 && hasProductosGeneral().map(product => (
                <div key={product._id} className='flex justify-between w-full items-center py-1'>
                  <h3 className='text-sm font-semibold text-slate-800'>{product.nombre}<span className='text-xs text-gray-800 font-light'>{` ${product.cantidad}u`}</span></h3>
                  <div className='flex gap-4 items-center'>
                    <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                  </div>
                </div>
              ))}

              <div>
                {hasProductosEfectivo()?.length === 0 && checkout.medioDePago === 'Efectivo' && available && (
                  <>
                    <div className=" w-auto p-2  my-2">
                      <p className="text-red-500 text-center font-normal text-sm">Se aplica el {descuento}% de descuento abonando</p>
                    </div>
                    <div className='flex font-poppins text-sm justify-between w-full items-center py-1 mt-2'>
                      <p className='font-semibold'>Subtotal</p>
                      <p className='font-semibold'>{formatearNumero(totalAmount)}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-between text-sm font-semibold font-poppins items-center mt-4">
                <p>Total</p>
                <p>{formatearNumero(checkout.total)}</p>
              </div>
            </div>
          </div>

        </div>
        <div className="text-center gap-2 flex justify-between items-end py-2">
          <h1 className="text-sm font-semibold  text-neutral-800 font-poppins">Guarda el detalle de tu pedido.</h1>
          <button
            onClick={handleCapture}
            style={{ backgroundColor: "#FD3307" }}
            className="rounded-xl text-white flex gap-2 justify-center items-center px-3  p-2 font-poppins text-base  shadow-md">
            Descargar <FaDownload size={16} /> </button>
        </div>
      </div>

    </div >
  );
}

