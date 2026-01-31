import { MultiplicationSignIcon } from 'public/images/exit-icon';
import React from 'react';
import Modal from 'react-modal';
import { motion } from "framer-motion";

Modal.setAppElement('#__next');

const ModalHome = (props) => {
    const { imagen } = props;

    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div onClick={() => setIsOpen(false)}>
            {imagen?.available && isOpen ? (
                <div className='w-full'>
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full fixed inset-0 flex justify-center items-center z-50 overflow-hidden "
                    >
                        <div
                            className="relative bg-white p-0.5 rounded shadow-lg max-w-[90vw] max-h-[90vh] overflow-auto"
                        >
                            <div
                                onClick={() => setIsOpen(false)}
                                className="absolute cursor-pointer bg-gray-700 rounded-lg p-0.5 right-3 top-3 z-10"
                            >
                                <MultiplicationSignIcon className="text-white" size={10} />
                            </div>
                            {imagen?.imagen?.url && (
                                <img
                                    src={imagen.imagen.url}
                                    alt="imagen"
                                    className="object-contain rounded max-w-full max-h-[80vh]"
                                />
                            )}
                        </div>
                    </motion.div>

                </div>) : (
                <div className='hidden' />
            )}
        </div>

    );
};

export default ModalHome;
