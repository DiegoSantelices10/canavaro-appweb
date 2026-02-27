import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addSale,
  setRenderSaleData,
  setSaleData,
  updateSale,
  viewSale
} from "store/reducers/saleSlice";
import axios from "axios";
import { Howl } from "howler";
import { socket } from "socket";
import Link from "next/link";
import PercentIcon from "public/images/porcentaje";
import CheckGroup from "components/CheckGroup";
import ModalPedido from "components/ModalPedido";
import Layout from "components/Admin/Layout";
import OrderDelay from "components/OrderDelay";
import { FiGrid } from "react-icons/fi";




const HomeAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const { renderSales } = useSelector(state => state.sale);
  const dispatch = useDispatch();
  const sound = new Howl({
    src: ["/sound/notificacion.mp3"],
  });

  if (!socket.connected) {
    socket.connect()
  }

  useEffect(() => {
    getSales()
  }, []);

  useEffect(() => {
    const pedidosHandler = (pedidos) => {
      sound.play();
      dispatch(addSale(pedidos));
    };
    socket.on('pedidos', pedidosHandler)

    return () => {
      socket.off('pedidos');
    };
  }, [socket])

  useEffect(() => {
    socket.on('liberado', (data) => {
      dispatch(updateSale(data));
    })
  }, [])

  useEffect(() => {
    socket.on('visto', (data) => {
      dispatch(viewSale(data));
    })
  }, [])


  const getSales = async () => {
    try {
      const res = await axios.get("/api/sales");
      localStorage.setItem("sales", JSON.stringify(res.data));
      dispatch(setSaleData(res.data));
      const pedidos = res.data.filter(item => item.liberado !== true);
      if (pedidos.length > 0) {
        dispatch(setRenderSaleData(pedidos));
      }
    } catch (error) {
      alert("Error al obtener los datos")
    }
  }

  const onViewSale = async (id) => {
    try {
      const res = await axios.put(`/api/sales/${id}`, { visto: true });
      if (res.status === 200) {
        try {
          socket.emit('enviar-visto', id)
          dispatch(viewSale(id));
        } catch (error) {
          alert("Error al realizar la accion")
        }
      }
    } catch (error) {
      alert("Error al realizar la accion")
    }
  }


  const handleOpenModal = pedido => {
    onViewSale(pedido._id)
    setCurrentPedido(pedido);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setCurrentPedido(null);
    setShowModal(false);
  };



  const handleDelete = async id => {
    try {
      const res = await axios.put(`/api/sales/${id}`, { liberado: true });
      if (res.status === 200) {
        try {
          socket.emit('enviar-liberado', id)
          dispatch(updateSale(id));
        } catch (error) {
          alert("Error al realizar la accion")
        }
      }
    } catch (error) {
      alert("Error al realizar la accion")
    }
  };

  const separarNumero = numero => {
    if (!numero) return "";
    const segmento1 = numero.substring(0, 2);
    const segmento2 = numero.substring(2, 6);
    const segmento3 = numero.substring(6, 10);

    return `${segmento1} ${segmento2} ${segmento3}`;
  };

  return (
    <Layout>
      {currentPedido && (
        <ModalPedido id={currentPedido._id} show={showModal} handleClose={handleCloseModal} pedido={currentPedido} />
      )}

      <div className="mb-10 space-y-6">
        <div className="border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-[0.2em]">En Vivo</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Panel de Pedidos</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Gestiona el flujo de trabajo en tiempo real.</p>
        </div>

        <div className="w-full">
          <OrderDelay />
        </div>
      </div>

      <div className="w-full space-y-8">
        <AnimatePresence mode="popLayout">
          {renderSales?.length > 0 ? (
            <>
              {/* Acciones Rápidas - Solo en móvil para no duplicar con la sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:hidden bg-slate-900 p-6 rounded-[2rem] shadow-xl shadow-slate-900/10 mb-8 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative space-y-4">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">Acciones Rápidas</h3>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Promociones Activas</p>
                  </div>
                  <CheckGroup dispatch={dispatch} />
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {renderSales.map((item, index) => (
                  <motion.div
                    key={item._id || index}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`
                      relative flex flex-col h-full bg-white rounded-[2.5rem] p-7 shadow-2xl transition-all duration-500 group
                      ${item?.visto !== true
                        ? "shadow-red-600/10 ring-2 ring-red-500/20 scale-[1.03] z-10"
                        : "shadow-slate-200/50 hover:shadow-slate-300/60 hover:-translate-y-2"}
                    `}
                  >
                    {/* Badge Nuevo */}
                    {item?.visto !== true && (
                      <div className="absolute -top-3 left-8">
                        <div className="px-4 py-1.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-600/40 animate-bounce-subtle">
                          Nuevo Pedido
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-50 group-hover:text-red-600 transition-colors duration-500">
                        {item?.domicilio
                          ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                          : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        }
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Recibido</span>
                        <span className="text-sm font-bold text-slate-900 font-mono bg-slate-50 px-3 py-1 rounded-xl">
                          {item.hora}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 mb-8">
                      <h3 className="text-xl font-extrabold text-slate-900 leading-tight mb-2 group-hover:text-red-600 transition-colors duration-500">
                        {item?.cliente || "Cliente Particular"}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 mb-4">
                        <svg className="w-4 h-4 text-red-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span className="text-sm font-semibold truncate max-w-[200px]">
                          {item?.domicilio || "Retiro en Local"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 px-3 py-1.5 bg-slate-50 rounded-xl w-fit">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        <span className="text-xs font-bold font-mono tracking-wider">{separarNumero(item?.telefono)}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="flex-[2] py-4 rounded-2xl text-sm font-black transition-all duration-300
                                 bg-slate-900 text-white hover:bg-red-600 shadow-xl shadow-slate-900/10 hover:shadow-red-600/30 active:scale-95 flex items-center justify-center gap-2"
                      >
                        Gestionar
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="flex-1 group/btn p-4 rounded-2xl border-2 border-slate-100 hover:border-green-100 hover:bg-green-50 transition-all duration-300 active:scale-95 flex items-center justify-center"
                        title="Marcar como entregado"
                      >
                        <svg className="w-6 h-6 text-slate-300 group-hover/btn:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 md:py-32 flex flex-col items-start bg-white rounded-[3rem] border-2 border-dashed border-slate-100 p-8 md:p-14"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 relative">
                <FiGrid className="text-4xl text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Paz y Tranquilidad</h3>
              <p className="text-slate-400 max-w-xs font-medium">No hay pedidos pendientes en este momento. ¡Buen trabajo!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link href={"/calcular"}>
        <button className="bg-red-600 text-white p-4 rounded-2xl fixed bottom-6 right-6 shadow-2xl shadow-red-600/40 hover:-translate-y-2 transition-all duration-500 group z-50">
          <PercentIcon color="white" className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        </button>
      </Link>
    </Layout>
  );
}

export default HomeAdmin;



