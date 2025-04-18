import Layout from "components/Admin/Layout";
import ModalPedido from "components/ModalPedido";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSaleData } from "store/reducers/saleSlice";
import { motion } from "framer-motion";
import { getSales } from "services/fetchData";
import HeaderTitle from "components/HeaderTitle";


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
      <HeaderTitle title="Ventas" />
      <div className="w-full mx-auto mt-6">
        <div className="border p-3 mx-auto rounded-lg w-full lg:w-1/2">
          <p className="text-sm font-montserrat text-center font-bold">Ventas diarias</p>
          <div className="mt-6 flex items-center gap-1">
            <p className="font-montserrat font-medium">N° de ventas:</p>
            <div className="bg-black px-1.5 rounded-md">
              <h2 className="text-white font-semibold font-montserrat">{sales?.length > 0 ? sales?.length : ''}</h2>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto col-span-2 mt-6">
          <div className="w-full  mx-auto text-center py-2">
            <div className="flex flex-wrap justify-start gap-4 mx-auto font-montserrat  lg:p-0">
              {sales?.length > 0 ? (
                sales?.slice().reverse().map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`w-full sm:w-80  md:w-80 shadow-sm  ${item?.visto !== true ? "shadow-gray-300" : "shadow-red-400"} rounded-lg h-auto  p-3 `}
                  >
                    <div className="w-full text-sm">
                      <h2 className="text-right text-xs text-gray-500"><span className="text-xs">{item.hora}hs.</span></h2>
                      <div className="text-left py-3 font-medium">
                        <h5 className="font-semibold">{item?.cliente ? item?.cliente : item?.domicilio}</h5>

                        <h5 className="font-normal text-xs text-gray-400">{item?.telefono}</h5>
                      </div>
                    </div>
                    <div className="flex justify-end  gap-3 w-full font-montserrat">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="px-4 py-2 w-auto rounded-lg text-xs font-medium border 
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
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Sales;