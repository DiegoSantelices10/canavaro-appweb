/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiInfo } from "react-icons/fi";

const ModalDescripcion = ({ handleClose, show, pedido }) => {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full sm:w-4/5 md:w-3/5 lg:w-1/2 bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden border border-neutral-100"
          >
            {/* Header */}
            <div className="relative p-8 pb-4 text-center">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-neutral-50 rounded-full text-neutral-400 hover:text-neutral-900 transition-colors active:scale-90 shadow-sm"
              >
                <FiX size={20} />
              </button>

              <div className="w-16 h-16 bg-neutral-900 rounded-[24px] flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-neutral-200">
                <FiInfo size={32} />
              </div>

              <h2 className="text-xl font-black text-neutral-900 uppercase tracking-tighter mb-1 font-montserrat px-10">
                {pedido?.nombre}
              </h2>
              <p className="text-[10px] font-black uppercase text-neutral-400 tracking-[0.2em]">
                Detalle de selección
              </p>
            </div>

            {/* List */}
            <div className="p-8 pt-4">
              <div className="bg-neutral-50 rounded-[32px] p-6 border border-neutral-100 space-y-4 shadow-inner">
                {pedido?.products?.map((item, idx) => (
                  <div
                    className="flex items-center justify-between group"
                    key={item._id || idx}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.5)]"></div>
                      <p className="font-extrabold text-neutral-800 text-sm font-montserrat uppercase tracking-tight">
                        {item.nombre}
                      </p>
                    </div>

                    <div className="bg-white px-3 py-1 rounded-full shadow-sm border border-neutral-100">
                      <span className="font-black text-[10px] text-neutral-500 uppercase">
                        {item.categoria === 'Postres'
                          ? `${pedido.cantidadPostres || 1}u`
                          : `${item.cantidad || 1}u`
                        }
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Button */}
              <button
                onClick={handleClose}
                className="w-full mt-8 py-5 bg-neutral-950 text-white rounded-[24px] font-black font-montserrat text-xs uppercase tracking-[0.2em] shadow-2xl shadow-neutral-200 hover:bg-neutral-800 transition-all active:scale-95"
              >
                Cerrar Detalle
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalDescripcion;
