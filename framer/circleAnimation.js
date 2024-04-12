import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaWhatsapp, FaDownload } from "react-icons/fa"
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { formatearNumero } from "libs/items";
import { useRouter } from "next/router";


const CircleAnimation = () => {
  const { checkout, demora, delivery } = useSelector(state => state.order);
  const { promoBarra } = useSelector(state => state.setting);
  const router = useRouter()

  const [catId, setCatId] = useState([]);


  useEffect(() => {
    let idIcrement = 1;
    const categorias = [...new Set(checkout.productos.map(producto => producto.categoria))];
    const categoriasId = categorias.map(producto => ({
      id: idIcrement++,
      categoria: producto,
    }));
    setCatId(categoriasId)

    setTimeout(() => {
      router.push('/')
    }, 15000);

  }, [])

  const handleCapture = () => {
    const containerPedido = document.getElementById('container-pedido');
    html2canvas(containerPedido).then((canvas) => {
      const screenshot = canvas.toDataURL('image/png');
      // Crea un enlace descargable
      const downloadLink = document.createElement('a');
      downloadLink.href = screenshot;
      downloadLink.download = "Pedido-" + checkout.fecha;

      // Agrega el enlace al documento y haz clic en él para iniciar la descarga
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Limpia el enlace después de la descarga
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
          <p className=" text-sm font-poppins font-semibold  text-neutral-800">¡Confirma tu pedido por whatsapp!</p>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20confirmar%20mi%20pedido%20de:%20${checkout.domicilio !== "" ? checkout.domicilio : checkout.cliente}%0ATotal:%20$%20${checkout.total}%0APaga%20con:%20${checkout.medioDePago}`}
          >
            <div className="flex items-center gap-2  bg-green-500  p-3 text-white font-semibold rounded-xl shadow-md">
              <FaWhatsapp size={18} />
              Ir a whatsapp</div>
          </a>
        </div>
        <div id="container-pedido">
          <div className="flex justify-between items-center p-1 mt-3">
            <p className=" font-bold font-poppins text-lg">
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
                      <h1 className="font-semibold font-poppins">Horario de envío</h1>
                      <span className="text-gray-400 font-normal">
                        {checkout.hPersonalizado === "" ? demora + " min." : checkout.hPersonalizado + "hs."}</span>
                    </div>
                    <div className="mt-1">
                      <h2 className="font-poppins  font-bold">Domicilio</h2>
                      <span className="font-poppins font-normal text-gray-400">{checkout.domicilio} </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-1">
                      <h1 className="font-semibold font-poppins">Horario de retiro</h1>
                      <span className="text-gray-400  font-normal">
                        {checkout.hPersonalizado === "" ? demora : checkout.hPersonalizado + "hs."}</span>
                    </div>
                    <div className="mt-1">
                      <h2 className="font-poppins font-semibold">Retira por local</h2>
                      <span className="text-gray-400 font-normal font-poppins"> {checkout.cliente}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="mt-1">
              <h2 className="font-poppins font-semibold text-base">Medio de pago</h2>
              <span className="text-gray-400 font-normal"> {checkout.medioDePago}</span>
            </div>
            <div >
              {checkout.comentarios && (
                <div className="mt-1">
                  <p className="font-poppins font-semibold">Comentarios</p>
                  <span className="text-gray-400 font-normal"> {checkout.comentarios}</span>
                </div>
              )}
            </div>
            <>
              <p className=" font-bold font-poppins mt-3 text-lg">
                Pedido
              </p>
              <hr className="border mt-2" />
              {catId?.map(categoria => (
                <div key={categoria.id}>
                  {checkout.productos
                    ?.filter(producto => producto?.categoria === categoria.categoria)
                    .map((item, index) => {
                      return (
                        <div key={index} className="py-4">
                          <div className="flex justify-between items-center font-poppins">
                            <div className="font-semibold text-neutral-900  text-base w-full flex justify-between items-start">
                              <div>
                                <p>
                                  {item.nombre}
                                  {" "}
                                  <span className=" font-semibold text-gray-700 text-base">
                                    {item.categoria === "pizzas" && item?.tamanio}
                                  </span>
                                  <span className="text-gray-400 text-base font-normal pl-1">
                                    {" "}
                                    x {item?.cant || item?.cantidad}
                                  </span>
                                </p>
                                {item.descripcion && (
                                  <p className="text-gray-400 text-xs font-normal">{item.descripcion}</p>

                                )}
                                {item.extra && (
                                  <p className="text-gray-400 text-sm font-normal">Extra: {item.extra}</p>
                                )}
                              </div>
                              <p className="text-nowrap text-right font-normal">{formatearNumero(item.precio * item.cantidad)}</p>
                            </div>

                          </div>
                          {item.products &&
                            item.products.map(producto => (
                              <div key={producto._id}>
                                <p className="font-normal font-poppins text-gray-400 text-sm">
                                  {producto.nombre} <span>{producto.cantidad && `x ${producto.cantidad}`}</span>
                                </p>
                              </div>
                            ))}
                          <p className="font-semibold text-gray-700 text-sm w-11/12">{item.comentarios}</p>
                        </div>
                      );
                    })}
                </div>
              ))}
            </>
            {promoBarra?.available && delivery === "localActual" && (
              <h1 className="text-right text-sm text-gray-500">Descuento aplicado del 10%</h1>
            )}
            <h1 className="font-bold text-right text-base font-poppins">Total: <span className="font-normal text-lg">{formatearNumero(checkout.total)}</span></h1>
          </div>

        </div>
        <div className="text-center gap-2 flex justify-between items-end py-2">
          <h1 className="text-base  text-neutral-800 font-poppins">Guarda el detalle de tu pedido.</h1>
          <button
            onClick={handleCapture}
            style={{ backgroundColor: "#FD3307" }}
            className="rounded-xl text-white flex gap-2 justify-center items-center px-3  p-2 font-poppins text-base  shadow-md">
            Descargar <FaDownload size={16} /> </button>
        </div>
      </div>

    </div >
  );
};

export default CircleAnimation;
