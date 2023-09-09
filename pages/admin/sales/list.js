import Layout from "components/admin/layout";
import ModalPedido from "components/modalPedido";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSaleData } from "store/reducers/saleSlice";
import { motion } from "framer-motion";
import * as bigintConversion from 'bigint-conversion';


export default function Sales() {
  const [showModal, setShowModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const { sales } = useSelector(state => state.sale);
  const dispatch = useDispatch();
  const [totalSale, setTotalSale] = useState("");

  useEffect(() => {
    if (sales.length < 1) {
      const salesLocal = JSON.parse(localStorage.getItem("sales"));
      dispatch(setSaleData(salesLocal));
    }

    const total = sales.reduce((accumulator, pedido) => accumulator + pedido.total, 0);
    setTotalSale(total);
  }, []);

  useEffect(() => {
    const total = sales.reduce((accumulator, pedido) => accumulator + pedido.total, 0);
    setTotalSale(total);
  }, [sales]);

  const handleOpenModal = pedido => {
    setCurrentPedido(pedido);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setCurrentPedido(null);
    setShowModal(false);
  };
  const numeroPedido = (id) => {
    const numero = bigintConversion.textToBigint(id);
    return numero.toString().slice(-10)
  }


  return (
    <Layout>
      {currentPedido && (
        <ModalPedido id={currentPedido._id} show={showModal} handleClose={handleCloseModal} pedido={currentPedido} />
      )}
      <div className="bg-slate-50 h-full w-full">
        <div className="w-full lg:w-11/12 h-auto mx-auto">
          <div className=" py-5 w-full px-2 lg:px-0 h-auto flex justify-center lg:justify-start items-center">
            <div className="flex flex-col w-full  font-roboto justify-center items-start p-2 h-20 font-bold bg-white rounded-md shadow">
              <h2 className="font-medium  text-sm whitespace-nowrap">
                Ventas del día: <span className="">$ {totalSale}</span>
              </h2>
              <h2 className="font-medium text-sm whitespace-nowrap">
                Cant de pedidos: <span className="">{sales?.length}</span>
              </h2>
            </div>
          </div>

          <div className="w-full mx-auto h-full">
            <div className="w-full mx-auto">
              <div className="relative overflow-x-auto">
                <div className="w-full  mx-auto text-center py-2">
                  <div className="flex flex-wrap justify-start gap-4 mx-auto font-nunito">
                    {sales?.length > 0 ? (
                      sales.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-full  md:w-72 bg-white rounded-xl h-auto shadow-md p-3 border"
                        >
                          <div className="w-full text-sm">
                            <h2 className="text-right text-xs text-gray-500"><span className="text-xs">{numeroPedido(item._id)}</span></h2>
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
														text-white bg-sky-800  hover:bg-sky-700 
														active:bg-blue-200 focus:ring-blue-300"
                              type="submit"
                            >
                              Ver descripcion
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
            </div>
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
