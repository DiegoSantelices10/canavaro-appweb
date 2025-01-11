import { MultiplicationSignIcon } from 'public/images/exit-icon';
import React from 'react';
import Modal from 'react-modal';
import { motion } from "framer-motion";

Modal.setAppElement('#__next');

const ModalHome = (props) => {
    const { imagen } = props;

    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <>
            {imagen.available && isOpen ? (
                <div className='flex-1 justify-center items-center p-4'>
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 overflow-hidden"
                    >
                        <div className="relative rounded-lg shadow-lg flex justify-center items-center overflow-hidden">
                            <div
                                onClick={() => setIsOpen(false)}
                                className="absolute cursor-pointer bg-gray-400/30 rounded-lg p-0.5 right-3 top-3 z-10"
                            >
                                <MultiplicationSignIcon className="text-white" />
                            </div>
                            {imagen && (
                                <img
                                    src={imagen.imagen.url}
                                    alt="imagen"
                                    className="object-contain max-h-[90vh] max-w-full"
                                />
                            )}
                        </div>
                    </motion.div>
                </div>) : (
                <div className='hidden' />
            )}
        </>

    );
};

export default ModalHome;
