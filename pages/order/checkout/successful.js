import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaWhatsapp, FaDownload } from "react-icons/fa"
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { formatearNumero } from "libs/items";


const Successful = () => {
  const { checkout, demora, delivery, orderList, totalAmount } = useSelector(state => state.order);
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
          marginTop: 20,
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
              fontSize: "50px",
              color: "#5EEF7B",
              margin: "auto",
            }}
          />
          <h2 className="text-gray-800 font-montserrat text-base font-bold w-full py-2">¡Ya recibimos tu pedido! </h2>
        </motion.div>
      </motion.div>
      <div className="px-2  w-full md:w-1/2 lg:w-2/5 mx-auto shadow-sm">
        <div id="container-pedido">
          <div className="flex justify-center items-center flex-col gap-2">
            <p className=" text-sm font-montserrat font-medium">¡Confirma tu pedido por whatsapp!</p>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20confirmar%20mi%20pedido%20de:%20${checkout.domicilio !== "" ? checkout.domicilio : checkout.cliente}%0ATotal:%20$%20${checkout.total}%0APaga%20con:%20${checkout.medioDePago}`}
            >
              <div className="flex items-center text-sm gap-2 font-montserrat  bg-green-500 p-2 px-3 text-white font-semibold rounded-lg shadow-md">
                <FaWhatsapp size={18} />
                Ir a whatsapp</div>
            </a>
          </div>
          <div className="flex justify-between items-center p-1">
            <p className=" font-semibold font-montserrat text-base">

              Detalle del pedido
            </p>
            <h1 className="font-medium font-montserrat">{checkout.hora}hs.</h1>
          </div>
          <div className="w-full h-auto rounded-md border-gray-200 border mt-1">
            <div className="grid gap-4 p-3">
              {delivery === "domicilioActual" ? (
                <>
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-sm font-montserrat">Horario de envío</h1>
                    <span className="text-[13px] font-semibold tracking-wide font-montserrat bg-red-500 text-white px-2 p-1 rounded-md">
                      {checkout.hPersonalizado === "" ? demora + " minutos" : checkout.hPersonalizado + "hs."}</span>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-montserrat text-sm  font-semibold">Domicilio</h2>
                    <span className="font-montserrat text-sm font-normal ">{checkout.domicilio} </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <h1 className="font-semibold text-sm font-montserrat">Horario de retiro</h1>
                    <span className=" text-sm font-montserrat  font-normal">
                      {checkout.hPersonalizado === "" ? demora + " minutos" : checkout.hPersonalizado + "hs."}</span>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-montserrat text-sm font-semibold">Retira por local</h2>
                    <span className="text-sm font-normal font-montserrat"> {checkout.cliente}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <h2 className="font-montserrat text-sm font-semibold ">Medio de pago</h2>
                <span className="text-sm font-normal font-montserrat"> {checkout.medioDePago}</span>
              </div>
              {checkout.comentarios && (
                <div className="flex justify-between">
                  <p className="font-montserrat text-sm font-semibold">Comentarios</p>
                  <span className="font-montserrat text-sm font-normal"> {checkout.comentarios}</span>
                </div>
              )}
            </div>
            <hr />

            <h2 className="font-montserrat text-base font-semibold mt-2 p-3">Pedido</h2>
            <div className="w-full font-montserrat relative px-3">
              {available && hasProductosEfectivo()?.length > 0 && hasProductosGeneral()?.length > 0 && (
                <>
                  <div className='my-2'>
                    {hasProductosGeneral()?.map(product => (
                      <div key={product._id} className='flex justify-between items-center w-full py-1'>
                        <h3 className='text-sm font-semibold '>{product.nombre} <span className='text-xs  font-light'>{product.categoria === "empanadas" ? `x ${product.cant}` : `x ${product.cantidad}`}</span> </h3>
                        <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                      </div>
                    ))}
                    {checkout.medioDePago === 'Efectivo' && (
                      <>
                        <hr className='my-1' />
                        <div className='flex items-center justify-between'>
                          <p className='py-1 text-sm font-semibold '>Subtotal</p>
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
                      <h3 className='text-sm font-semibold '>{product.nombre}<span className='text-xs text-gray-400'>{` ${product.cantidad}u`}</span></h3>
                      <div className='flex gap-4 items-center'>
                        <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                      </div>
                    </div>

                  ))}
                </>
              )}
              {hasProductosGeneral()?.length === 0 && hasProductosEfectivo().map(product => (
                <div key={product._id} className='flex justify-between w-full items-center py-1'>
                  <h3 className='text-sm font-semibold '>{product.nombre}<span className='text-xs text-gray-400'>{` ${product.cantidad}u`}</span></h3>
                  <div className='flex gap-4 items-center'>
                    <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                  </div>
                </div>
              ))}
              {hasProductosEfectivo()?.length === 0 && hasProductosGeneral().map(product => (
                <div key={product._id} className='flex justify-between w-full items-center py-1'>
                  <h3 className='text-sm font-semibold '>{product.nombre}<span className='text-xs text-gray-400'>{` ${product.cant ? product.cant : product.cantidad}u`}</span></h3>
                  <div className='flex gap-4 items-center'>
                    <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                  </div>
                </div>
              ))}

              <div>
                {hasProductosEfectivo()?.length === 0 && checkout.medioDePago === 'Efectivo' && available && (
                  <>
                    <div className=" w-auto p-2  my-2">
                      <p className="text-red-500 text-center font-normal text-xs">Se aplica el {descuento}% de descuento</p>
                    </div>
                    <div className='flex font-montserrat text-sm justify-between w-full items-center py-1 mt-2'>
                      <p className='font-semibold'>Subtotal</p>
                      <p className='font-semibold'>{formatearNumero(totalAmount)}</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex pb-3 justify-between text-sm font-semibold font-montserrat items-center mt-4">
                <p>Total</p>
                <p>{formatearNumero(checkout.total)}</p>
              </div>
            </div>
          </div>

        </div>
        <div className="text-center gap-2 flex justify-between items-end py-2">
          <h1 className="text-sm font-semibold  font-montserrat">Guarda el detalle de tu pedido.</h1>
          <button
            onClick={handleCapture}
            className="rounded-lg text-white bg-red-600 flex gap-2 justify-center items-center px-3  p-2 font-montserrat text-sm  shadow-md">
            Descargar <FaDownload size={16} /> </button>
        </div>

      </div>

    </div >
  );
}

export default Successful;