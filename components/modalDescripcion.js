/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const ModalDescripcion = ({ handleClose, show, pedido }) => {
  const showHideClassName = show ? "fixed z-40 inset-0 overflow-y-auto" : "hidden";
  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom w-full  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-black h-full bg-opacity-80 text-white font-nunito font-semibold px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
          >
            <div className="relative overflow-hidden h-full   mx-auto  ">
              <button onClick={handleClose}>
                <AiOutlineClose
                  className=" text-slate-800 bg-slate-50 bg-opacity-40 rounded-full p-1 top-4 left-4"
                  size={30}
                />
              </button>
            </div>
            <div className="w-full mt-10">
              <h2 className="text-xl">{pedido.nombre}</h2>
              <p className="font-normal  text-base text-gray-300 ">{pedido.descripcion}</p>
              <p className="font-normal  text-base text-gray-300 ">$ {pedido.precio}</p>
            </div>
            <div className="py-4">
              {pedido.products.map(item => {
                return (
                  <div key={item._id}>
                    <p>
                      {item.nombre}
                      {item.cantidad && <span className="font-light pl-2">x {item.cantidad}</span>}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModalDescripcion;
