/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const ModalMessage = ({ handleClose, addExtra, showModal, extraPizza, setShowModal, extras, info: { status, title, description } }) => {
  const showHideClassName = showModal ? "fixed z-40 inset-0 overflow-y-auto" : "hidden";
  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center h-full pt-4 px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom w-full  rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle sm:max-w-lg sm:w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50 }}
            className=" grid grid-cols-1 gap-3 mx-auto bg-opacity-80 text-zinc-800 bg-white font-poppins font-semibold p-4  "
          >
            <button onClick={() => setShowModal(false)}>
              <BsXCircleFill className="absolute text-zinc-900 bg-slate-50 rounded-full p-1 top-4 right-4" size={35} />
            </button>
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

            <div className="w-full text-center mt-4">
              {title &&
                <h2 className="text-xl font-semibold">{title}</h2>
              }
              {description &&
                <p className="font-normal  text-base  ">{description}</p>
              }
            </div>
            {extras.map(item => (
              <div
                key={item._id}
              >
                <section
                  className="my-4 text-base font-normal flex justify-between"
                >
                  <div className="flex justify-between w-3/5">
                    <p>
                      {item.nombre}
                    </p>
                    <p>
                      $ {item.precio}
                    </p>
                  </div>
                  {extraPizza.includes(item) ? (
                    <p
                      className="text-sm"
                    >Agregado</p>
                  ) : (
                    <button
                      onClick={() => addExtra(item)}
                      className="bg-red-500 rounded-md text-sm text-white p-1 px-2"
                    >
                      Agregar
                    </button>
                  )

                  }

                </section>
                <hr />
              </div>
            ))}
            <div className="p-1 px-4 rounded-md shadow text-white bg-red-600 mx-auto text-center">
              <button onClick={handleClose}>Aceptar</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
