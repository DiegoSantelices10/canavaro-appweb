import Layout from "components/admin/layout";
import ModalPedido from "components/modalPedido";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSaleData } from "store/reducers/saleSlice";
import { motion } from "framer-motion";
import { getSales } from "services/fetchData";


export default function Sales() {
  const [showModal, setShowModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const { sales } = useSelector(state => state.sale);
  const dispatch = useDispatch();
  const [totalSale, setTotalSale] = useState("");


  useEffect(() => {
    (async () => {
      const salesLocal = await getSales();
      dispatch(setSaleData(salesLocal));
    })()

    if (sales.length > 0) {
      const total = sales?.reduce((accumulator, pedido) => accumulator + pedido.total, 0);
      setTotalSale(total);
    }
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
      <div className=" h-full w-full">
        <div className="w-full h-auto mx-auto ">
          <div className=" py-5 w-full lg:px-0 h-auto flex justify-center lg:justify-start items-center">
            <div className="w-full flex flex-col justify-between font-poppins  
                            p-4 h-20 font-bold bg-white rounded-xl border border-gray-200">
              <h2 className="font-semibold  text-sm whitespace-nowrap">
                VENTAS DEL DÍA: <span className="font-medium">$ {totalSale}</span>
              </h2>
              <h2 className="font-semibold text-sm whitespace-nowrap ">
                PEDIDOS DEL DÍA: <span className="font-medium">{sales?.length}</span>
              </h2>
            </div>
          </div>

          <div className="w-full mx-auto h-full">
            <div className="w-full mx-auto">
              <div className="relative overflow-x-auto">
                <div className="w-full  mx-auto text-center py-2">
                  <div className="flex flex-wrap justify-start gap-4 mx-auto font-poppins  lg:p-0">
                    {sales?.length > 0 ? (
                      sales?.slice().reverse().map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="w-full  md:w-72 bg-white rounded-xl h-auto  p-3 border"
                        >
                          <div className="w-full text-sm">
                            <h2 className="text-right text-xs text-gray-500"><span className="text-xs">{item.hora}hs.</span></h2>
                            <div className="text-left py-3 font-medium">
                              <h5 className="font-semibold">{item?.cliente}</h5>
                              <h5 className="text-sm font-semibold">{item?.domicilio}</h5>

                              <h5 className="font-normal text-xs text-gray-400">{item?.tipoEnvio}</h5>
                            </div>
                          </div>
                          <div className="flex justify-end  gap-3 w-full font-poppins">
                            <button
                              onClick={() => handleOpenModal(item)}
                              className="px-4 py-2 w-auto rounded-xl text-xs font-medium border 
														 focus:outline-none focus:ring transition 
														text-white bg-red-600  hover:bg-red-500 
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
