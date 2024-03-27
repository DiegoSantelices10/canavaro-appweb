/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import Image from 'next/image';
const ModalMessage = ({
  handleClose,
  addExtra,
  showModal,
  extraPizza,
  extras,
  info: { title, type }
}) => {
  const showHideClassName = showModal ? "fixed z-40 inset-0 overflow-y-auto mx-auto z-30" : "hidden";

  return (
    <div className={showHideClassName}>
      <div className="flex items-center  h-screen justify-center p-3 text-center sm:block ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
        </div>

        <div className="align-bottom w-full    text-left 
                        overflow-hidden  transform transition-all  
                         flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50 }}
            className=" mx-auto  text-zinc-800 lg:w-3/5 md:w-3/5  w-full bg-white p-3 h-full py-5 rounded-3xl font-poppins font-semibold"
          >
            <div className="w-full">
              <h2 className="text-base font-bold text-center">{title}</h2>
            </div>
            <hr className=" bg-gray-500 mt-3" />
            <div
              className="grid md:grid-cols-2 gap-x-3"
            >
              {extras.length > 0 && extras?.map(item => (
                <div
                  key={item._id}
                  className="flex justify-between items-start w-full gap-2 mb-2 pt-4">
                  <Image
                    className="rounded-md"
                    src={item.imagen?.url || "/images/producto-sin-imagen.png"}
                    objectFit='cover'
                    objectPosition='center'
                    width={140}
                    height={140}
                    alt={item.nombre} />
                  <div className="w-full self-start">
                    <h1 className="font-semibold text-base font-poppins text-neuttral-800">{item.nombre}</h1>
                    <p className="text-gray-400 font-normal text-sm">$ {item.precio}</p>
                  </div>
                  <div >
                    {extraPizza.includes(item) ? (
                      <p
                        className="text-lg text-center  rounded-md  p-1 px-3"
                      >Listo!</p>
                    ) : (
                      <button
                        onClick={() => addExtra(item)}
                        className="bg-green-500 rounded-xl font-normal shadow text-sm text-white p-2 px-4 font-poppins"
                      >
                        Agregar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button
                className="p-4 mt-8 rounded-2xl font-poppins w-full shadow text-white bg-red-500 mx-auto text-center"
                onClick={handleClose}>{type !== 'return home' ? 'Continuar con el pedido' : 'Aceptar'}</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
