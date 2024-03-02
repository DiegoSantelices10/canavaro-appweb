/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const ModalMessage = ({
  handleClose,
  addExtra,
  showModal,
  extraPizza,
  setShowModal,
  extras,
  info: { status, title, description, type }
}) => {
  const showHideClassName = showModal ? "fixed z-40 inset-0 overflow-y-auto mx-auto" : "hidden";

  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center  h-full p-3 text-center sm:block ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
        </div>

        <div className="align-bottom w-full h-full   text-left 
                        overflow-hidden  transform transition-all  
                         flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50 }}
            className=" mx-auto  text-zinc-800 lg:w-2/5 md:w-1/2  w-full bg-white p-1 py-5 rounded-3xl font-poppins font-semibold"
          >
            {status === 'success' ? (
              <BsFillCheckCircleFill
                style={{
                  fontSize: "60px",
                  color: "#5EEF7B",
                  margin: "auto",
                }}
              />
            ) : status === 'error' ? (
              <BsXCircleFill
                style={{
                  fontSize: "60px",
                  color: "#FF1B1B",
                  margin: "auto",
                }}
              />
            ) : ('')}

            <div className="w-full px-3 my-3">
              <>
                <h2 className="text-lg font-semibold">{title}</h2>
                <hr className="mt-2 bg-gray-500 " />
              </>
              <p className="font-normal  text-base  ">{description}</p>
            </div>
            {extras.length > 0 && extras?.map(item => (
              <div
                key={item._id}
              >
                <section
                  className="text-base pb-3  font-normal flex items-center justify-between"
                >
                  <div className="flex justify-between  items-start w-full px-3 py-1">
                    <div className="">
                      <p className="font-semibold text-lg">
                        {item.nombre}
                      </p>
                      <p className="font-normal text-sm text-gray-400 font-poppins">
                        ${' '}{item.precio}
                      </p>
                    </div>
                    {extraPizza.includes(item) ? (
                      <p
                        className="text-lg text-center  rounded-md  p-1 px-3"
                      >Listo!</p>
                    ) : (
                      <button
                        onClick={() => addExtra(item)}
                        className="bg-green-500 rounded-xl shadow text-base text-white p-2 px-4"
                      >
                        Agregar
                      </button>
                    )}
                  </div>

                </section>
              </div>
            ))}
            <div className="px-3">
              <button
                className="p-4 mt-8 rounded-2xl font-poppins w-full shadow text-white bg-red-500 mx-auto text-center"
                onClick={handleClose}>{type !== 'return home' ? 'Continuar con el pedido' : 'Aceptar'}</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
