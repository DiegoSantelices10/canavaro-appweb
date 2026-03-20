/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import HeaderTitle from "components/HeaderTitle";




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
    const segmento1 = numero.substring(0, 2);
    const segmento2 = numero.substring(2, 6);
    const segmento3 = numero.substring(6, 10);

    return `${segmento1} ${segmento2} ${segmento3}`;
  };

  return (
    <Layout>
      {currentPedido && (
        <ModalPedido 
          id={currentPedido._id} 
          show={showModal} 
          handleClose={handleCloseModal} 
          pedido={currentPedido} 
          handleDelete={handleDelete}
        />
      )}
      <HeaderTitle title="Pedidos" />
      <div className="w-full mt-6">
        <div className="w-full mx-auto lg:rounded-md h-auto gap-4">
          <OrderDelay />
          <hr className="mt-6 md:hidden" />
          <CheckGroup dispatch={dispatch} />
        </div>
        <div className="w-full  relative mx-auto text-center mt-5">
          <div className="flex flex-wrap justify-start gap-4 mx-auto font-montserrat">
            {renderSales?.length > 0 ? (
              renderSales.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`relative w-full flex flex-col justify-between md:w-80 rounded-xl p-4 transition-all duration-300 ${
                    item?.visto !== true 
                      ? "bg-white border-l-4 border-l-red-500 shadow-lg shadow-red-100/50 transform hover:-translate-y-1" 
                      : "bg-slate-50 border border-slate-200 shadow-sm opacity-95"
                  }`}
                >
                  <div className="w-full text-sm text-gray-800">
                    <div className="flex justify-between items-center mb-2">
                      {item?.visto !== true ? (
                        <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          Nuevo
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                          Lectura ✅
                        </span>
                      )}
                      <h2 className="text-right text-xs font-semibold text-slate-500">{item.hora} hs.</h2>
                    </div>

                    <div className="text-left py-2 font-medium">
                      <h5 className="font-bold text-base text-slate-800">{item?.cliente ? item?.cliente : item?.domicilio}</h5>
                      <h5 className="font-medium text-xs text-slate-500 mt-1">{separarNumero(item?.telefono)}</h5>
                    </div>
                  </div>
                  
                  <div className={`flex justify-end items-center gap-2 w-full font-montserrat mt-2`}>
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="px-4 py-2 w-auto rounded-lg text-xs font-semibold focus:outline-none transition text-slate-700 bg-slate-200 hover:bg-slate-300"
                      type="button"
                    >
                      Ver pedido
                    </button>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="px-4 py-2 w-auto rounded-lg text-xs font-semibold focus:outline-none transition text-white bg-red-600 hover:bg-red-700"
                      type="button"
                    >
                      Liberar
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              ''
            )}

          </div>

        </div>
        <Link
          href={"/calcular"}
        >
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold p-3 opacity-70 hover:opacity-100 rounded-full fixed bottom-4 right-4 hover:-translate-y-1
                     transition-all duration-500">
            <PercentIcon color="white" />
          </button>
        </Link>
      </div>
    </Layout>
  );
}

export default HomeAdmin;



