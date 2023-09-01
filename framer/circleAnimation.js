import { BsFillCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FaWhatsapp } from "react-icons/fa"
import * as bigintConversion from 'bigint-conversion'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { clearOrderList } from "store/reducers/orderSlice";
import { clearUser } from "store/reducers/userSlice";
const CircleAnimation = () => {
  const [nPedido, setNPedido] = useState(0);
  const { checkout, demora } = useSelector(state => state.order);
  const [catId, setCatId] = useState([]);
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // Actualiza el contador cada segundo
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    // Redirecciona cuando el contador llega a cero
    if (countdown === 0) {
      clearInterval(timer);
      dispatch(clearOrderList());
      dispatch(clearUser());
      // const enlace = `https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20consultar%20por%20mi%20pedido:%20${checkout.domicilio !== "" ? checkout.domicilio : checkout.cliente}`
      // window.open(enlace, "_blank");
    }

    // Limpia el temporizador al desmontar el componente
    return () => clearInterval(timer);
  }, [countdown, router]);



  useEffect(() => {
    let idIcrement = 1;
    const categorias = [...new Set(checkout.productos.map(producto => producto.categoria))];
    const categoriasId = categorias.map(producto => ({
      id: idIcrement++,
      categoria: producto,
    }));
    setCatId(categoriasId)
    const numero = bigintConversion.textToBigint(checkout._id);
    setNPedido(numero.toString().slice(-10));

  }, [])


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
          <h2 className="text-black font-poppins text-lg font-bold w-full mt-5">¡Ya recibimos tu pedido! </h2>
        </motion.div>

      </motion.div>
      <div className="p-2">
        <div className="text-center justify-center gap-2
         flex items-center font-normal text-sm font-poppins text-green-500">
          <p>En {countdown} se redirecciona al whatsapp</p>
          <FaWhatsapp size={18} className="text-green-500" />
        </div>
        <p className="text-red-400 font-semibold font-poppins text-base px-1 mt-2">
          Detalle del pedido
        </p>
        <div className="w-full h-auto rounded-md border-gray-200 border mt-2 p-2">
          <div className="flex justify-between">
            <h1 className="font-nunito font-bold">Numero de pedido: <span className="text-gray-600 font-semibold ">{nPedido}</span></h1>
            <h1 className="font-bold font-nunito">{checkout.hora}hs.</h1>

          </div>

          <div className="flex justify-between">
            <div className="">
              {checkout.domicilio !== "" ? (
                <>
                  <h2 className="font-nunito  font-bold text-base">Direccion de envío</h2>
                  <p className="font-nunito font-semibold text-gray-600">{checkout.domicilio} </p>
                  <h1 className="font-bold font-nunito">Horario de envío:
                    <span className="text-gray-600 px-2 font-semibold">
                      {checkout.hPersonalizado === "" ? demora : checkout.hPersonalizado + "hs."}</span></h1>
                </>
              ) : (
                <>
                  <h2 className="font-nunito font-bold text-base">Retira por local</h2>
                  <p className="font-nunito font-bold">Nombre: <span className="text-gray-600 font-semibold">{checkout.cliente}</span> </p>
                  <h1 className="font-bold font-nunito">Horario de retiro:
                    <span className="text-gray-600 px-2 font-semibold">
                      {checkout.hPersonalizado === "" ? demora : checkout.hPersonalizado + "hs."}</span></h1>
                </>
              )}
              <div>{checkout.comentarios && "Comentarios: " + checkout.comentarios}</div>
            </div>
          </div>
          <>
            <h3 className="font-bold mt-2 text-xl">Pedido</h3>
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
                            <span className=" pl-1 font-semibold text-gray-500 text-base">
                              {item.categoria === "pizzas" && item?.tamanio}
                            </span>
                            <span className="text-gray-400 text-sm font-normal">
                              {" "}
                              x {item?.cant || item?.cantidad}
                            </span>
                          </p>
                          <p>$ {item.precio * item.cantidad}</p>
                        </div>
                        <p className="font-normal text-gray-400 text-sm w-11/12">{item.descripcion}</p>
                        {item.products &&
                          item.products.map(producto => (
                            <div key={producto._id}>
                              <p className="font-normal text-gray-400 text-sm">
                                {producto.nombre} <span>{producto.cantidad && `x ${producto.cantidad}`}</span>
                              </p>
                            </div>
                          ))}
                        <p className="font-semibold text-gray-500 text-sm w-11/12">{item.comentarios}</p>
                      </div>
                    );
                  })}
              </div>
            ))}
          </>
          <h1 className="font-bold text-right text-base font-nunito">Total: <span className=" font-bold text-lg">$ {checkout.total}</span></h1>
        </div>

        {/* <div className="flex justify-between items-center mt-2">
          <p className="font-semibold text-sm">¡No dudes en escribirnos!</p>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20consultar%20por%20mi%20pedido:%20${checkout.domicilio !== "" ? checkout.domicilio : checkout.cliente}`}
          >
            <div className="flex items-center gap-2 bg-green-500 p-3 text-white font-semibold rounded-md shadow-md">
              <FaWhatsapp size={18} />
              Ir a whatsapp</div>
          </a>
        </div> */}
      </div>
    </div >
  );
};

export default CircleAnimation;
