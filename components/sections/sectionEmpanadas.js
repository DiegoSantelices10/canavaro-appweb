/* eslint-disable react/prop-types */
import Image from "next/image";
import { Element } from "react-scroll";
import Modal from "components/modal";
import { useState } from "react";
import { motion } from "framer-motion";

export default function SectionEmpanadas({ products, imagefront }) {
  const [showModal, setShowModal] = useState(false);
  const [currentProducto, setCurrentProducto] = useState({});

  const handleOpenModal = producto => {
    setCurrentProducto(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentProducto(null);
    setShowModal(false);
  };
  return (
    <Element name="empanadas" className=" w-full  relative element font-nunito">
      <Image src={imagefront} layout="fill" objectFit="cover" objectPosition={"center"} 
      priority={false}
      />

      <div className=" w-full h-full mx-auto pt-10 md:py-10 lg:py-10  ">
        <div className="absolute inset-0 bg-black bg-opacity-50 h-full"> </div>

        {currentProducto !== null && (
          <Modal
            key={currentProducto._id}
            showModal={showModal}
            handleClose={handleCloseModal}
            producto={currentProducto}
          >
            {currentProducto}
          </Modal>
        )}
        <h1 className=" relative z-10 text-center p-3 text-2xl lg:text-3xl font-extrabold text-gray-200">
          Empanadas & Canastitas
        </h1>

        <div className="flex justify-center h-28 items-center w-full gap-10">
          <div className="text-center h-28 w-auto flex flex-col justify-between">
            <div className="h-24 flex justify-center items-center">
              <Image src={"/images/empanadaBlanca.webp"} width={90} height={75} alt="empanadas" />
            </div>
          </div>
          <div className="text-center h-28 w-auto flex flex-col justify-between ">
            <div className="h-24  flex justify-center items-center ">
              <Image src={"/images/canastitaBlanca.webp"} width={90} height={90} alt="canastitas" />
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-black  rounded-lg h-full p-1 bg-opacity-40 w-full lg:w-4/5 mx-auto text-white grid grid-cols-2 gap-2 content-center pb-6 pt-4">
          <p className="italic col-span-2 text-white text-center text-xs pb-4">
            * Hacer click sobre el titulo para ver descripcion.
          </p>
          <h1 className="col-span-2 font-bold text-2xl text-center">Canastitas</h1>
          {products
            ?.filter(item => item.categoria === "empanadas")
            ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map(producto => {
              return (
                producto.formato === "canastita" && (
                  <div key={producto._id}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-auto py-2">
                        <p
                          onClick={() => handleOpenModal(producto)}
                          className=" cursor-pointer font-bold font-nunito text-white text-center w-4/5 md:w-3/5 mx-auto rounded-md hover:bg-slate-50 hover:text-neutral-900 transition-colors duration-500"
                        >
                          {producto.nombre}
                        </p>
                        <p className="font-normal text-xs text-gray-300 text-center">{producto.descripcion}</p>
                      </div>
                    </motion.div>
                  </div>
                )
              );
            })}

          <h1 className="col-span-2 font-bold text-2xl text-center">Empanadas</h1>
          {products
            ?.filter(item => item.categoria === "empanadas")
            ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map(producto => {
              return (
                producto.formato === "empanada" && (
                  <div key={producto._id}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-auto">
                        <p
                          onClick={() => handleOpenModal(producto)}
                          className=" cursor-pointer font-bold font-nunito text-white text-center w-4/5 md:w-3/5 mx-auto rounded-md hover:bg-slate-50 hover:text-neutral-900 transition-colors duration-500"
                        >
                          {producto.nombre}
                        </p>
                        <p className="font-normal text-xs text-gray-300 text-center">{producto.descripcion}</p>
                      </div>
                    </motion.div>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </Element>
  );
}
