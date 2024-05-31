/* eslint-disable react/prop-types */
import Layout from "components/admin/layout";
import ModalPedido from "components/modalPedido";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "components/buttonDemora";
import { useDispatch, useSelector } from "react-redux";
import {
    addSale,
    setRenderSaleData,
    setSaleData,
    updateSale
} from "store/reducers/saleSlice";
import axios from "axios";
import { Howl } from "howler";
import { getPromo } from "services/fetchData";
import { setSetting } from "store/reducers/settingSlice";



export default function AdminContent({ socket }) {
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
        getDelay()
        getSales()
    }, []);

    useEffect(() => {
        const pedidosHandler = (pedidos) => {
            sound.play();
            dispatch(addSale(pedidos));
        };
        socket.on('pedidos', pedidosHandler)

        return () => {
            socket.off('pedidos', pedidosHandler);
            socket.disconnect()
        };
    }, [])

    useEffect(() => {
        socket.on('liberado', (data) => {
            dispatch(updateSale(data));
        })
    }, [])

    const getDelay = async () => {
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
    }

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
            <div className="h-auto w-full lg:p-4">
                <div className="w-full  mx-auto lg:rounded-md  h-auto gap-4">
                    <div className="w-full flex-row lg:flex  rounded-md h-auto py-2">
                        <div className="w-full text-center py-2">
                            <h1 className="font-medium font-poppins ">Demora domicilio</h1>
                            <div className="flex w-full gap-3 justify-center mt-2">
                                {data
                                    ?.filter(item => item.tipoEnvio === "domicilio")
                                    .map(item => (
                                        <Button handlePutTime={handlePutTime} key={item._id} data={item} selected={selectedDomicilio} />
                                    ))}
                            </div>
                        </div>


                        <div className="w-full  text-center py-2">
                            <h1 className="font-medium font-poppins ">Demora local</h1>
                            <div className="flex w-full gap-3 justify-center mt-2">
                                {data
                                    ?.filter(item => item.tipoEnvio === "local")
                                    .map(item => (
                                        <Button handlePutTime={handlePutTime} key={item._id} data={item} selected={selectedLocal} />
                                    ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="rounded-md mx-auto flex flex-col items-center justify-center lg:hidden mt-4">
                        {barra?.map(item => (
                            <div
                                key={item._id}
                                className="mt-2 w-1/2 flex justify-between items-center "
                            >
                                <h1 className=" font-poppins">
                                    {item.nombre}
                                </h1>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        id={item._id}
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={item.available}
                                        onChange={() => promoBarra(item._id, item.available)}
                                    />
                                    <div className="w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-0 
                   rounded-full 
                  dark:bg-gray-200 peer-checked:after:translate-x-full 
                  after:content-[''] after:absolute 
                  after:top-[2px] after:left-[2px] after:bg-white   
                  after:rounded-full after:h-4 after:w-4 after:transition-all 
                 dark:border-gray-600 peer-checked:bg-red-600 "></div>
                                </label>

                            </div>
                        ))}

                    </div>
                </div>


                <div className="w-full   mx-auto text-center px-2 mt-5">
                    <div className="flex flex-wrap justify-start gap-4 mx-auto font-poppins">
                        {renderSales?.length > 0 ? (
                            renderSales.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="w-full  md:w-72 border-gray-200  rounded-xl h-auto  p-3 border"
                                >
                                    <div className="w-full text-sm text-gray-800">
                                        <h2 className="text-right text-xs ">{item.hora} hs.</h2>
                                        <div className="text-left py-3 font-medium">
                                            <h5 className="font-semibold">{item?.cliente}</h5>
                                            <h5 className="text-sm font-semibold ">{item?.domicilio}</h5>

                                            <h5 className="font-normal text-xs text-gray-700">{item?.tipoEnvio}</h5>
                                        </div>
                                    </div>
                                    <div className="flex justify-end  gap-3 w-full font-poppins">
                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="px-4 py-2 w-auto rounded-xl text-xs font-medium border  
														 focus:outline-none focus:ring transition 
														text-slate-700  hover:bg-blue-100 
														active:bg-blue-200 focus:ring-blue-300"
                                            type="submit"
                                        >
                                            Ver pedido
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item?._id)}
                                            className="px-4 py-2 w-auto rounded-xl text-xs font-medium border 
												focus:outline-none focus:ring transition text-white 
											bg-red-600   
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
