import Layout from "components/admin/layout";
import ModalPedido from "components/modalPedido";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "components/buttonDemora";
import { useDispatch, useSelector } from "react-redux";
import { addSale, setRenderSaleData, setSaleData, updateSale } from "store/reducers/saleSlice";
import axios from "axios";
import Pusher from "pusher-js";
import { Howl } from "howler";
import * as bigintConversion from 'bigint-conversion'
import { getPromo } from "services/fetchData";



export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const [data, setData] = useState(null);
  const [selectedDomicilio, setSelectedDomicilio] = useState({});

  const [barra, setBarra] = useState([]);

  const [selectedLocal, setSelectedLocal] = useState({});
  const { renderSales } = useSelector(state => state.sale);
  const dispatch = useDispatch();
  const sound = new Howl({
    src: ["/sound/notificacion.mp3"],
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/delay");
        const local = res.data.find(item => item.tipo === "localActual");
        setSelectedLocal({ ...local, demora: local.demoraActual });
        const domicilio = res.data.find(item => item.tipo === "domicilioActual");
        setSelectedDomicilio({ ...domicilio, demora: domicilio.demoraActual });
        setData(res.data);
      } catch (error) {
        alert("Error al obtener los datos")
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
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
    })();
    (async () => {
      const res = await getPromo();
      console.log("Get", res.data);
      if (res.status === 200) return setBarra(res.data)
    })();

  }, []);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
      cluster: "us2",
    });

    const channel = pusher.subscribe("pizzeria");
    channel.bind("canavaro", data => {
      sound.play();
      dispatch(addSale(data.message));
    });

    channel.bind("pedido-liberado", data => {
      dispatch(updateSale(data.id.id));
    });

    return () => {
      pusher.unsubscribe("pizzeria");
    };
  }, []);

  const numeroPedido = (id) => {
    const numero = bigintConversion.textToBigint(id);
    return numero.toString().slice(-10)

  }

  const handleOpenModal = pedido => {
    setCurrentPedido(pedido);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setCurrentPedido(null);
    setShowModal(false);
  };

  const handlePutTime = async value => {
    if (value.tipoEnvio === "local") {
      const local = data.find(item => item.tipo === "localActual");
      setSelectedLocal(value);
      try {
        await axios.put(`/api/delay/${local._id}`, { demoraActual: value.demora });
      } catch (error) {
        alert("Error al actualizar los datos")
      }
    } else {
      const domicilio = data.find(item => item.tipo === "domicilioActual");
      setSelectedDomicilio(value);
      try {
        await axios.put(`/api/delay/${domicilio._id}`, { demoraActual: value.demora });
      } catch (error) {
        alert("Error al actualizar los datos")
      }
    }
  };

  const handleDelete = async id => {
    try {
      const res = await axios.put(`/api/sales/${id}`, { liberado: true });
      if (res.status === 200) {
        try {
          axios.post("api/pusher/released", { id });
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


  console.log("================", barra);

  return (
    <Layout>
      {currentPedido && (
        <ModalPedido id={currentPedido._id} show={showModal} handleClose={handleCloseModal} pedido={currentPedido} />
      )}
      <div className="h-auto w-full">
        <div className="lg:flex w-full justify-between">
          <div className="w-full py-5 lg:w-1/2 ">
            <div className="w-full text-center">
              <h1 className="font-semibold font-nunito py-2">Demora domicilio</h1>
              <div className="flex gap-3  justify-center">
                {data
                  ?.filter(item => item.tipoEnvio === "domicilio")
                  .map(item => (
                    <Button handlePutTime={handlePutTime} key={item._id} data={item} selected={selectedDomicilio} />
                  ))}
              </div>
            </div>

            <div className="w-full  text-center">
              <h1 className="font-semibold font-nunito py-2">Demora por local</h1>
              <div className="flex gap-3 justify-center">
                {data
                  ?.filter(item => item.tipoEnvio === "local")
                  .map(item => (
                    <Button handlePutTime={handlePutTime} key={item._id} data={item} selected={selectedLocal} />
                  ))}
              </div>
            </div>
          </div>
          {barra?.map(item => (
            <div key={item._id} className="w-1/3 self-center justify-center mx-auto text-center flex">
              <button
                className={`w-44 h-12 font-nunito font-bold rounded-md mt-2 text-base border" ${item?.available ? "text-white bg-sky-800" : "text-sky-800 bg-white border border-sky-800"}`}
                type="button"
                onClick={() => promoBarra(item?._id, item?.available)}
              >
                {item.nombre}
              </button>
            </div>
          ))}

        </div>


        <div className="w-full bg-slate-50   mx-auto text-center p-2 mt-5 rounded-md ">
          <div className="flex flex-wrap justify-start gap-4 mx-auto font-nunito">
            {renderSales?.length > 0 ? (
              renderSales.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full  md:w-72 bg-white rounded-xl h-auto shadow-md p-3 border"
                >
                  <div className="w-full text-sm">
                    <h2 className="text-right text-xs text-gray-500">codigo de pedido: <span className="text-xs">{numeroPedido(item._id)}</span></h2>
                    <div className="text-left py-3 font-medium">
                      <h5 className="font-semibold">{item?.cliente}</h5>
                      <h5 className="text-sm font-semibold">{item?.domicilio}</h5>

                      <h5 className="font-normal text-xs text-gray-400">{item?.tipoEnvio}</h5>
                    </div>
                  </div>
                  <div className="flex justify-end  gap-3 w-full font-nunito">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="px-4 py-2 w-auto rounded-md text-xs font-medium border  
														shadow focus:outline-none focus:ring transition 
														text-slate-500  hover:bg-blue-100 
														active:bg-blue-200 focus:ring-blue-300"
                      type="submit"
                    >
                      Ver descripcion
                    </button>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="px-4 py-2 w-auto rounded-md text-xs font-medium border shadow
												focus:outline-none focus:ring transition text-white 
											bg-sky-800   
											hover:border-white "
                      type="submit"
                    >
                      Liberar
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center w-full font-semibold font-poppins">No Hay pedidos</p>
            )}
          </div>
        </div>
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
