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
import { getPromo } from "services/fetchData";
import { setSetting } from "store/reducers/settingSlice";
import { socket } from "socket";
import Link from "next/link";
import PercentIcon from "public/images/porcentaje";
import CheckGroup from "components/CheckGroup";
import ModalPedido from "components/ModalPedido";
import Layout from "components/Admin/Layout";
import OrderDelay from "components/OrderDelay";



export default function HomeAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const [barra, setBarra] = useState([]);
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
    const res = await getPromo();
    const efectivo = res.data.find(item => item.nombre === "Promo efectivo")
    dispatch(setSetting({ promoEfectivo: efectivo }));
    setBarra(res.data)
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

  const promoBarra = async (id, available) => {
    try {
      const response = await axios.put(`/api/settings/promo/${id}`, { available: !available })
      if (response.status === 200) {
        const updatedBarra = barra?.map(item => {
          if (item._id === id) {
            return {
              ...item,
              available: !available
            };
          }
          return item;
        });
        setBarra(updatedBarra);
      }
    } catch (error) {
      alert("Error al realizar la accion")
    }
  }

  return (
    <Layout>
      {currentPedido && (
        <ModalPedido id={currentPedido._id} show={showModal} handleClose={handleCloseModal} pedido={currentPedido} />
      )}
      <div className="min-h-screen w-full lg:p-4 ">
        <div className="w-full  mx-auto lg:rounded-md  h-auto gap-4">

          <OrderDelay />

          <hr />

          <CheckGroup barra={barra} promoBarra={promoBarra} />


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
                  className={`w-full sm:w-80  md:w-80 border ${item?.visto !== true ? "border-gray-200" : "border-red-500"}  rounded-lg h-auto  p-3 border`}
                >
                  <div className="w-full text-sm text-gray-800">
                    <h2 className="text-right text-xs ">{item.hora} hs.</h2>
                    <div className="text-left py-3 font-medium">
                      <h5 className="font-semibold">{item?.cliente}</h5>
                      <h5 className="text-sm font-semibold ">{item?.domicilio}</h5>

                      <h5 className="font-normal text-xs text-gray-700">{item?.tipoEnvio}</h5>
                    </div>
                  </div>
                  <div className={`flex justify-end items-center  gap-3 w-full font-montserrat`}>
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="px-4 py-2 w-auto rounded-lg text-xs font-medium   
														 focus:outline-none focus:ring-0 focus:border-none transition 
														text-red-500  hover:bg-slate-100 bg-gray-50"
                      type="submit"
                    >
                      Ver pedido
                    </button>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="px-4 py-2 w-auto rounded-lg text-xs font-medium border 
												focus:outline-none focus:ring transition text-white bg-red-600 hover:border-white"
                      type="submit"
                    >
                      Liberar
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center w-full font-semibold font-montserrat">No Hay pedidos</p>
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

export async function getServerSideProps(context) {
  const { req, res } = context;

  const token = req.headers.cookie?.includes("token") || req.cookies.token;
  if (!token) {
    res.setHeader("location", "/admin/auth/login"); // Redirigir al usuario a la página de inicio de sesión
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return { props: {} };
}
