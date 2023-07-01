/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

const ModalMessage = ({ handleClose, showModal, setShowModal, info: { status, title, description } }) => {
  const showHideClassName = showModal ? "fixed z-40 inset-0 overflow-y-auto" : "hidden";
  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-300 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom w-full  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -50 }}
            className="h-72 grid grid-cols-1 content-center gap-3 mx-auto bg-opacity-80 text-sky-800 bg-white font-nunito font-semibold px-4  "
          >
            <button onClick={() => setShowModal(false)}>
              <BsXCircleFill className="absolute text-slate-800 bg-slate-50 rounded-full p-1 top-4 right-4" size={35} />
            </button>
            {status ? (
              <BsFillCheckCircleFill
                style={{
                  fontSize: "60px",
                  color: "#5EEF7B",
                  margin: "auto",
                }}
              />
            ) : (
              <BsXCircleFill
                style={{
                  fontSize: "60px",
                  color: "#FF1B1B",
                  margin: "auto",
                }}
              />
            )}
            <div className="w-full text-center py-1">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="font-normal  text-base  ">{description}</p>
            </div>
            <div className=" h-auto w-1/3 p-1 px-4 rounded-md shadow text-white bg-sky-900 mx-auto text-center">
              <button onClick={handleClose}>Aceptar</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
