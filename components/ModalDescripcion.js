/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { MultiplicationSignIcon } from "public/images/exit-icon";

const ModalDescripcion = ({ handleClose, show, pedido }) => {
  const showHideClassName = show ? "fixed z-40 inset-0 overflow-y-auto" : "hidden";
  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0  bg-gray-200 opacity-50"></div>
        </div>

        <div className="relative inline-block align-bottom w-full  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50 }}
            className=" h-full bg-white z-10 font-montserrat font-semibold px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
          >
            <div className=" overflow-hidden h-full   mx-auto  ">
              <button
                className="absolute top-4 right-4 bg-slate-500"
                onClick={handleClose}>
                <MultiplicationSignIcon />
              </button>
            </div>
            <div className="w-full mt-6 mb-3">
              <h2 className="text-base text-center font-montserrat">{pedido.nombre}</h2>
            </div>
            <div className="p-4 border rounded-lg space-y-2">
              {pedido.products.map(item => {
                return (
                  <div
                    className="flex  items-center gap-1"
                    key={item._id}>
                    <p className="font-medium text-gray-800 text-sm">
                      {item.nombre}
                    </p>
                    <p>
                      {item.cantidad && <span className="font-normal text-sm pl-1 text-gray-400">{item.cantidad}u</span>}
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
