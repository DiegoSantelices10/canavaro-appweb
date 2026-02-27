import Layout from "components/Admin/Layout";
import ModalPedido from "components/ModalPedido";
import HeaderTitle from "components/HeaderTitle";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSaleData } from "store/reducers/saleSlice";
import { motion, AnimatePresence } from "framer-motion";
import { getSales } from "services/fetchData";
import { FiClock, FiPhone, FiChevronRight, FiCheckCircle, FiDollarSign } from "react-icons/fi";

const Sales = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const { sales } = useSelector(state => state.sale);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const salesLocal = await getSales();
      dispatch(setSaleData(salesLocal));
    })()
  }, []);

  const handleOpenModal = pedido => {
    setCurrentPedido(pedido);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setCurrentPedido(null);
    setShowModal(false);
  };

  return (
    <Layout>
      {currentPedido && (
        <ModalPedido id={currentPedido._id} show={showModal} handleClose={handleCloseModal} pedido={currentPedido} />
      )}

      <div className="mb-10 lg:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex-1">
          <HeaderTitle title="Historial de Ventas" isBack />
          <p className="text-slate-500 mt-2 font-medium">Revisa el rendimiento diario y los pedidos completados con éxito.</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-6 relative overflow-hidden group min-w-[280px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-green-500/10 transition-colors duration-500"></div>
          <div className="p-4 bg-green-50 text-green-600 rounded-2xl shadow-sm relative z-10">
            <FiDollarSign size={28} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Ventas totales</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">{sales?.length || 0}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {sales?.length > 0 ? (
            sales?.slice().reverse().map((item, index) => (
              <motion.div
                key={item._id || index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/40 border border-slate-100/50 hover:border-slate-300 transition-all duration-500 group flex flex-col h-full hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest w-fit border border-green-100">
                      <FiCheckCircle />
                      Completado
                    </div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-red-600 transition-colors duration-500">
                      {item?.cliente ? item?.cliente : item?.domicilio}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <FiClock className="text-slate-300" />
                    <span className="text-xs font-black font-mono">
                      {item.hora}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mb-10 flex-1">
                  <div className="flex items-center gap-3 text-slate-400 p-3 bg-slate-50/50 rounded-2xl border border-slate-50 group-hover:border-slate-100 transition-colors">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 shadow-sm">
                      <FiPhone size={14} />
                    </div>
                    <span className="text-sm font-bold font-mono tracking-wider">{item?.telefono || "N/A"}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-50 group-hover:bg-slate-100 transition-colors">
                      <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Items</span>
                      <span className="text-lg font-black text-slate-900">{item?.productos?.length || 0}</span>
                    </div>
                    <div className="p-4 bg-red-50 rounded-2xl text-center border border-red-50 group-hover:bg-red-100 transition-colors">
                      <span className="block text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">Total</span>
                      <span className="text-lg font-black text-red-600">${item?.total}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenModal(item)}
                  className="w-full py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] bg-slate-900 text-white hover:bg-red-600 transition-all active:scale-95 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group/btn"
                >
                  <span>VER RESUMEN</span>
                  <FiChevronRight className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 p-12"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 text-slate-200">
                <FiDollarSign size={48} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Sin Historial</h3>
              <p className="text-slate-400 font-medium max-w-xs text-center">Todavía no hay ventas registradas en el sistema.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

export default Sales;
