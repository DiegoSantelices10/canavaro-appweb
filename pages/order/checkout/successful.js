import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaWhatsapp, FaDownload } from "react-icons/fa"
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { formatearNumero } from "libs/items";
import { capitalizeFirstLetter } from "utils";


const Successful = () => {
  const { checkout, demora, delivery, orderList } = useSelector(state => state.order);
  const { promoEfectivo: { available, descuento }, promoBarra } = useSelector(state => state.setting);
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
  console.log('orderList', orderList);


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
          <h2 className="text-gray-800 font-montserrat text-sm mt-2 font-bold w-full">¡Ya recibimos tu pedido! </h2>
        </motion.div>
      </motion.div>
      <div className="px-2  w-full md:w-1/2 lg:w-2/5 mx-auto shadow-sm">
        <div id="container-pedido">
          <div className="flex justify-center items-center flex-col gap-2">
            <p className=" text-sm font-montserrat text-gray-500 font-medium">¡Confirma tu pedido por whatsapp!</p>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20confirmar%20mi%20pedido%20de:%20${checkout.domicilio !== "" ? checkout.domicilio : checkout.cliente}%0ATotal:%20$%20${checkout.total}%0APaga%20con:%20${checkout.medioDePago}`}
            >
              <div className="flex items-center text-sm gap-1 font-montserrat  bg-green-500 p-2 px-3 text-white font-semibold rounded-lg shadow-md">
                <FaWhatsapp size={16} />
                Ir a whatsapp
              </div>
            </a>
          </div>
          <div className="flex justify-between items-center p-1 mt-4">
            <p className=" font-semibold font-montserrat text-sm text-gray-800">

              Detalle del pedido
            </p>
            <h1 className="font-semibold text-gray-800 text-sm font-montserrat">{checkout.hora}hs.</h1>
          </div>
          <div className="w-full h-auto mt-1">
            <div className="grid gap-2 p-3 shadow shadow-gray-300 rounded-lg ">
              {delivery === "domicilioActual" ? (
                <>
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-sm font-montserrat text-gray-500">Horario de envío</h1>
                    <span className="text-[13px] font-medium tracking-wide font-montserrat bg-red-500 text-white px-2 p-1 rounded-md">
                      {checkout.hPersonalizado === "" ? demora + " minutos" : checkout.hPersonalizado + "hs."}</span>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-montserrat text-sm  font-semibold text-gray-500">Domicilio</h2>
                    <span className="font-montserrat text-sm font-medium  text-gray-500">{checkout.domicilio} </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <h1 className="font-semibold text-sm font-montserrat text-gray-500">Horario de retiro</h1>
                    <span className=" text-sm font-montserrat  font-medium text-gray-500">
                      {checkout.hPersonalizado === "" ? demora + " minutos" : checkout.hPersonalizado + "hs."}</span>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="font-montserrat text-sm text-gray-500 font-semibold">Retira por local</h2>
                    <span className="text-sm text-gray-500 font-montserrat font-medium"> {checkout.cliente}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <h2 className="font-montserrat text-gray-500 text-sm font-semibold ">Medio de pago</h2>
                <span className="text-sm font-medium text-gray-500 font-montserrat"> {checkout.medioDePago}</span>
              </div>
              {checkout.comentarios && (
                <div className="flex justify-between">
                  <p className="font-montserrat text-sm font-semibold text-gray-500">Comentarios</p>
                  <span className="font-montserrat text-sm font-medium text-gray-500"> {checkout.comentarios}</span>
                </div>
              )}
            </div>
            <hr />

            <h2 className="font-montserrat text-sm font-semibold mt-2 p-1">Pedido</h2>
            <div className="w-full space-y-2 font-montserrat relative p-3 shadow shadow-gray-300 rounded-lg">

              {available && hasProductosEfectivo()?.length > 0 || hasProductosGeneral()?.length > 0 ? (
                <>
                  <div className='my-2 '>
                    {hasProductosGeneral()?.map(product => (
                      <div
                        key={product._id}
                      >
                        <div className='flex justify-between items-center w-full py-1'>
                          <h3 className='text-sm font-semibold text-gray-500'>
                            {(product.categoria === "pizzas" && product.tamanio) ? capitalizeFirstLetter(product.tamanio) + " " + product.nombre : product.nombre}
                            <span className='text-xs text-gray-500  font-medium'>{product.categoria === "empanadas" ? ` x ${product.cant}` : ` x ${product.cantidad}`}</span> </h3>
                          <h3 className='text-sm text-gray-500 font-medium'>{formatearNumero(product.precio * product.cantidad)}</h3>
                        </div>
                        {product?.descripcion && product.categoria !== "promociones" && (
                          <div className='flex justify-between w-full items-center py-0.5'>
                            <h3 className='text-xs font-medium text-gray-500'>{product.descripcion}</h3>
                          </div>
                        )}
                        {product?.products && (
                          product.products.map(item => (
                            <div key={item._id} className='flex justify-between w-full items-center py-0.5'>

                              <h3 className='text-xs font-medium text-gray-500'>
                                {item?.tamanio
                                  ? capitalizeFirstLetter(item.tamanio) + " " + item.nombre
                                  : item.nombre
                                }
                                <span className='text-xs text-gray-500 font-medium'>{` x ${item.cant ? item.cant : item.cantidad}`}</span>
                              </h3>

                            </div>
                          ))
                        )}
                      </div>
                    ))}
                    <div>
                      {checkout.medioDePago === 'Efectivo' && available && !promoBarra?.available && (
                        <div className="space-y-2">
                          <div className='flex mt-4 text-gray-500 items-center justify-between w-full'>
                            <h2 className="text-sm font-semibold">Subtotal</h2>
                            <p className='text-sm font-medium'>{formatearNumero(subTotal)}</p>
                          </div>
                          <hr />
                          <div className="flex justify-between items-center">
                            <p className='text-xs text-red-500 font-medium'>Abonando en efectivo, descuento del {descuento}%</p>
                            <p className='text-sm font-medium'>{formatearNumero(renderSubtotal(descuento))}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    {hasProductosEfectivo()?.map(product => (
                      <div key={product._id}>

                        <div className='flex justify-between w-full items-center py-1'>
                          <h3 className='text-sm font-semibold text-gray-500'>{product.nombre}<span className='text-xs text-gray-400'>{` ${product.cantidad}u`}</span></h3>
                          <div className='flex gap-4 items-center'>
                            <h3 className='text-sm text-gray-500 font-medium'>{formatearNumero(product.precio * product.cantidad)}</h3>
                          </div>
                        </div>
                        {product?.products && (
                          product.products.map(item => (
                            <div key={item._id} className='flex justify-between w-full items-center py-0.5'>

                              <h3 className='text-xs font-medium text-gray-500'>
                                {item?.tamanio
                                  ? capitalizeFirstLetter(item.tamanio) + " " + item.nombre
                                  : item.nombre
                                }
                                <span className='text-xs text-gray-500 font-medium'>{` x ${item.cant ? item.cant : item.cantidad}`}</span>
                              </h3>

                            </div>
                          ))
                        )}
                      </div>

                    ))}
                    {/* {checkout.medioDePago === 'Efectivo' && (
                      <>
                        <hr className='my-1' />
                        <div className='flex items-center justify-between'>
                          <p className='py-1 text-sm font-semibold '>Subtotal</p>
                          <p className='text-sm'>{formatearNumero(checkout.productos?.map(item => item.precio).reduce((a, b) => a + b, 0))}</p>
                        </div>
                      </>
                    )} */}

                    {/* {checkout.medioDePago === 'Efectivo' && promoBarra?.available && (
                      <div className='flex text-red-500 items-center justify-between w-full'>
                        <p className='text-xs'>Abonando en efectivo, descuento del {descuento}%</p>
                        <p className='text-sm'>{formatearNumero(renderSubtotal(descuento))}</p>
                      </div>
                    )} */}
                  </div>

                </>
              ) : (
                <>
                  {hasProductosEfectivo()?.map(product => (
                    <div key={product._id} className='flex justify-between w-full items-center py-1'>
                      <h3 className='text-sm font-semibold text-gray-500'>{product.nombre}<span className='text-xs text-gray-400'>{` x ${product.cantidad}`}</span></h3>
                      <div className='flex gap-4 items-center'>
                        <h3 className='text-sm text-gray-500 font-medium'>{formatearNumero(product.precio * product.cantidad)}</h3>
                      </div>
                    </div>
                  ))}
                  {hasProductosGeneral()?.map(product => (
                    <div
                      key={product._id}
                    >
                      <div className='flex justify-between w-full items-center py-1'>
                        <h3 className='text-sm font-semibold text-gray-500 line-clamp-1 pr-3'>
                          {product?.tamanio
                            ? capitalizeFirstLetter(product.tamanio) + " " + product.nombre
                            : product.nombre
                          }
                          <span className='text-xs text-gray-500 font-medium'>{` x ${product.cant ? product.cant : product.cantidad}`}</span>
                        </h3>
                        <div className='flex gap-4 items-center'>
                          <h3 className='text-sm text-gray-500 font-medium'>{formatearNumero(product.precio * product.cantidad)}</h3>
                        </div>
                      </div>
                      <div>
                        {product?.products && (
                          product.products.map(item => (
                            <div key={item._id} className='flex justify-between w-full items-center py-0.5'>

                              <h3 className='text-xs font-medium text-gray-500'>
                                {item?.tamanio
                                  ? capitalizeFirstLetter(item.tamanio) + " " + item.nombre
                                  : item.nombre
                                }
                                <span className='text-xs text-gray-500 font-medium'>{` x ${item.cant ? item.cant : item.cantidad}`}</span>
                              </h3>

                            </div>
                          ))
                        )}
                        {product?.descripcion && product.categoria !== "promociones" && (
                          <div className='flex justify-between w-full items-center py-0.5'>
                            <h3 className='text-xs font-medium text-gray-500'>{product.descripcion}</h3>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div>
                {
                  (promoBarra?.available) && delivery === "localActual" && (
                    <>
                      <div className='flex font-montserrat text-sm justify-between w-full items-center py-1 mt-2'>
                        <p className='font-semibold'>Subtotal</p>
                        <p className='font-semibold'>{formatearNumero(checkout.productos?.map(item => item.cantidad ? item.precio * item.cantidad : item.precio).reduce((a, b) => a + b, 0))}</p>
                      </div>
                      <div className=" w-auto">
                        <p className="text-red-500 text-right font-medium text-xs">Se aplica el {available && promoBarra?.available && delivery === "localActual" ? 10 : descuento}% de descuento</p>
                      </div>
                    </>
                  )
                }
              </div>
              <div className="flex justify-between text-sm font-semibold font-montserrat items-center pt-5">
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