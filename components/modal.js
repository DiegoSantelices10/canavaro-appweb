/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import Image from "next/image";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
const Modal = ({ handleClose, showModal, producto }) => {
  const showHideClassName = showModal ? "fixed z-40 inset-0 overflow-y-auto" : "hidden";

  return (
    <motion.div
      className={showHideClassName}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom w-full min-h-min rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-4 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-black  bg-opacity-80 text-white font-poppins font-semibold p-3">
            <div className="relative overflow-hidden  mx-auto">
              {showModal && (
                <Image
                  src={producto.imagen?.url || "/images/producto-sin-imagen.png"}
                  layout="responsive"
                  width={20}
                  height={16}
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-md"
                  alt={producto?.nombre}
                />
              )}

              <button onClick={handleClose}>
                <AiOutlineClose
                  className="absolute text-slate-800 bg-slate-50 bg-opacity-40 rounded-full p-1 top-5 left-4"
                  size={30}
                />
              </button>
            </div>
            <div className="w-full">
              <h2 className="text-xl">{producto?.nombre}</h2>
              <p className="font-light  text-sm text-zinc-400 pb-3">{producto?.descripcion}</p>
              <div className="flex w-full justify-between font-normal gap-1">
                {!producto.precio ? (
                  <>
                    {producto.precioPizza?.chica && producto.precioPizza.chica !== 0 && (
                      <div className="text-center">
                        <p className="font-normal text-gray-400 ">Chica<span className="font-normal  text-white text-base"> ${producto.precioPizza.chica}</span></p>
                      </div>
                    )} |
                    {producto.precioPizza?.mediana && producto.precioPizza.mediana !== 0 && (
                      <div className="text-center">

                        <p className="font-normal text-gray-400 ">Mediana<span className="font-normal text-white  text-base"> ${producto.precioPizza.mediana}</span></p>
                      </div>
                    )} |
                    {producto.precioPizza?.gigante && producto.precioPizza.gigante !== 0 && (
                      <div className="text-center">
                        <p className="font-normal text-gray-400 ">Gigante<span className="font-normal text-white  text-base"> ${producto.precioPizza.gigante}</span></p>

                      </div>

                    )}
                  </>
                ) : (
                  <>
                    <p>$ {producto?.precio}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
