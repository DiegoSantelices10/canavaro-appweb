import { MultiplicationSignIcon } from 'public/images/exit-icon';
import React from 'react';
import Modal from 'react-modal';
import { motion } from "framer-motion";

Modal.setAppElement('#__next');

const ModalHome = (props) => {
    const { imagen } = props;

    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div  onClick={() => setIsOpen(false)}>
            {imagen.available && isOpen ? (
                <div className='w-full'>
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }} // Empieza fuera de la pantalla, en la parte inferior
                        animate={{ y: "0%", opacity: 1 }}  // Se mueve hacia el centro y aparece
                        exit={{ y: "100%", opacity: 0 }}   // Vuelve a salir hacia abajo al cerrar
                        transition={{ duration: 0.8, ease: "easeOut" }} //
                        className=" w-full absolute inset-0 flex justify-center items-center z-50 overflow-hidden"
                    >
                        <div className="relative rounded-lg shadow-lg flex justify-center items-center overflow-hidden">
                            <div
                                onClick={() => setIsOpen(false)}
                                className="absolute cursor-pointer bg-gray-700 rounded-lg p-0.5 right-3 top-3 z-10"
                            >
                                <MultiplicationSignIcon className="text-white" />
                            </div>
                            <img
                                src={imagen.imagen.url}
                                alt="imagen"
                                className="object-contain sm:max-w-sm md:max-w-md"
                            />
                        </div>
                    </motion.div>
                </div>) : (
                <div className='hidden' />
            )}
        </div>

    );
};

export default ModalHome;
