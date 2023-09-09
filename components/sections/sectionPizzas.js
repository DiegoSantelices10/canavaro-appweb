/* eslint-disable react/prop-types */
import { useState } from "react";
import { Element } from "react-scroll";
import Image from "next/image";
import Modal from "components/modal";
import { motion } from "framer-motion";

export default function SectionPizzas({ products, imagefront }) {
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
    <Element name="pizzas" className="w-full relative  element font-nunito">
      <Image src={imagefront} layout="fill" objectFit="cover" objectPosition={"center"} priority={false} />

      <div className="font-nunito w-auto h-full mx-auto pt-10 sm:pt-10 md:py-10 lg:py-10 bg-cover bg-center  ">
        <div className="absolute inset-0 bg-black bg-opacity-50  h-full"> </div>

        {currentProducto !== null && (
          <Modal
            key={currentProducto._id}
            showModal={showModal}
            handleClose={handleCloseModal}
            producto={currentProducto}
          ></Modal>
        )}
        <h1 className="relative z-10 text-center text-gray-200  text-2xl lg:text-3xl font-extrabold">
          Nuestras Pizzas
        </h1>

        <div className="relative z-10 flex justify-center h-32  mb-8 items-center w-full gap-10">
          <div className="text-center h-28 w-auto flex flex-col justify-between ">
            <div className="h-24  flex justify-center items-center ">
              <Image priority={true} src={"/images/pizza.png"} width={60} height={60} alt="gigante" />
            </div>
            <p className="font-bold text-gray-200 text-lg">Gigante</p>
          </div>
          <div className="text-center h-28 w-auto flex flex-col justify-between">
            <div className="h-24 flex justify-center items-center">
              <Image src={"/images/pizza.png"} width={55} height={55} alt="mediana" />
            </div>
            <p className="font-bold text-lg text-gray-200">Mediana</p>
          </div>
          <div className="text-center h-28 w-auto flex flex-col justify-between">
            <div className="h-24 flex justify-center items-center">
              <Image priority={true} src={"/images/pizza.png"} width={50} height={50} alt="chica" />
            </div>
            <p className="font-bold text-gray-200 text-lg">Chica</p>
          </div>
        </div>

        <div
          className="relative z-10 bg-black bg-opacity-20  p-2 h-full  rounded-lg    w-full lg:w-4/5 mx-auto 
						 grid grid-cols-2 gap-5 content-center pb-6 pt-4 "
        >
          <p className="col-span-2 text-white text-center text-sm pb-4 italic font-poppins">
            * Hacer click sobre el titulo para ver descripcion.
          </p>
          {products
            ?.filter(item => item.categoria === "pizzas" && item.available === true)
            ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map(producto => {
              return (
                <div key={producto._id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-auto py-2 text-white">
                      <p
                        onClick={() => handleOpenModal(producto)}
                        className=" cursor-pointer  text-center font-nunito font-bold w-full md:w-3/5 mx-auto rounded-md hover:bg-slate-50 hover:text-neutral-900 transition-colors duration-500"
                      >
                        {producto.nombre}
                      </p>
                      <p className="font-normal text-xs  text-center">{producto.descripcion}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
        </div>
      </div>
    </Element>
  );
}
