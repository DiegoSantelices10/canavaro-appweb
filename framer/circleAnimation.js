import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaWhatsapp, FaDownload } from "react-icons/fa"
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";

const CircleAnimation = () => {
  const { checkout, demora, delivery } = useSelector(state => state.order);
  const { promoBarra } = useSelector(state => state.setting);

  const [catId, setCatId] = useState([]);


  useEffect(() => {
    let idIcrement = 1;
    const categorias = [...new Set(checkout.productos.map(producto => producto.categoria))];
    const categoriasId = categorias.map(producto => ({
      id: idIcrement++,
      categoria: producto,
    }));
    setCatId(categoriasId)

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
          <p className="font-bold text-sm font-nunito text-gray-700">confirmar tu pedido por whatsapp.</p>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20confirmar%20mi%20pedido%20de:%20${checkout.domicilio !== "" ? checkout.domicilio : checkout.cliente}`}
          >
            <div className="flex items-center gap-2  bg-green-500 hover:bg-green-400 p-3 text-white font-semibold rounded-md shadow-md">
              <FaWhatsapp size={18} />
              Ir a whatsapp</div>
          </a>
        </div>
        <div id="container-pedido">
          <p className="text-red-400 font-semibold font-poppins text-sm px-1 mt-4">
            Detalle del pedido
          </p>
          <div className="w-full h-auto rounded-md border-gray-200 border mt-2 p-2">
            <div className="flex justify-between">
              <div>
                {delivery === "domicilioActual" ? (
                  <>
                    <h1 className="font-bold font-nunito">Horario de envío:
                      <span className="text-gray-700 px-2 font-semibold">
                        {checkout.hPersonalizado === "" ? demora : checkout.hPersonalizado + "hs."}</span>
                    </h1>
                    <h2 className="font-nunito  font-bold text-base">Enviar a: <span className="font-nunito font-semibold text-gray-600">{checkout.domicilio} </span></h2>
                  </>
                ) : (
                  <>
                    <h1 className="font-bold font-nunito">Horario de retiro:
                      <span className="text-gray-700 px-2 font-semibold">
                        {checkout.hPersonalizado === "" ? demora : checkout.hPersonalizado + "hs."}</span>
                    </h1>
                    <h2 className="font-nunito font-bold text-base">Retira por local:
                      <span className="text-gray-600 font-semibold"> {checkout.cliente}</span>
                    </h2>
                  </>
                )}
              </div>
              <h1 className="font-bold font-nunito">{checkout.hora}hs.</h1>
            </div>
            <div>
              <h2 className="font-nunito font-bold text-base">Medio de pago:
                <span className="text-gray-600 font-semibold"> {checkout.medioDePago}</span>
              </h2>
            </div>
            <div >
              {checkout.comentarios && (
                <p className="font-nunito font-bold">Comentarios:
                  <span className="text-gray-700 font-semibold"> {checkout.comentarios}</span>
                </p>

              )}
            </div>
            <>
              <h3 className="font-semibold my-2 text-lg font-nunito">Pedido</h3>
              <hr className="border mt-2" />
              {catId?.map(categoria => (
                <div key={categoria.id}>

                  {checkout.productos
                    ?.filter(producto => producto?.categoria === categoria.categoria)
                    .map((item, index) => {
                      return (
                        <div key={index} className="py-2">
                          <div className="flex justify-between items-center font-nunito">
                            <p className="font-bold text-neutral-900 text-base">
                              {item.nombre}
                              <span className=" pl-1 font-semibold text-gray-700 text-base">
                                {item.categoria === "pizzas" && item?.tamanio}
                              </span>
                              <span className="text-gray-400 text-sm font-normal">
                                {" "}
                                x {item?.cant || item?.cantidad}
                              </span>
                            </p>
                            <p>$ {item.precio * item.cantidad}</p>
                          </div>
                          <p className="font-normal text-gray-500 text-xs w-11/12">{item.descripcion}</p>
                          {item.products &&
                            item.products.map(producto => (
                              <div key={producto._id}>
                                <p className="font-normal text-gray-700 text-sm">
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
            <h1 className="font-bold text-right text-base font-nunito">Total: <span className=" font-bold text-lg">$ {checkout.total}</span></h1>
          </div>
      
        </div>
        <div className="text-center gap-2 flex justify-between items-end py-2">
            <h1 className="text-base font-bold text-gray-700 font-nunito">Guarda el detalle de tu pedido.</h1>
            <button
              onClick={handleCapture}
              style={{backgroundColor: "#FD3307"}}
              className="rounded-md text-white flex gap-2 justify-center items-center   h-12 w-36 font-nunito text-base font-semibold shadow-md">
                Descargar <FaDownload size={16}/> </button>
          </div>
      </div>

    </div >
  );
};

export default CircleAnimation;
