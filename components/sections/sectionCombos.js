import Modal from "components/modal";
import Image from "next/image";
import { useState } from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

export default function sectionCombos({ products, imagefront }) {
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
    <Element name="combos" className=" w-full h-full relative  element">
      <Image src={imagefront} layout="fill" objectFit="cover" objectPosition={"center"}
        priority={false} />

      <div className=" font-nunito w-full h-full bg-cover pt-10 md:py-10 lg:py-10 ">
        <div className="absolute inset-0 bg-black bg-opacity-50  h-full"> </div>

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
          Nuestros Combos
        </h1>
        <div className="flex justify-center h-28 items-center w-full gap-10">
          <div className="text-center h-28 w-auto flex flex-col justify-between">
            <div className="h-24 flex justify-center items-center">
              <Image src={"/images/empanadaBlanca.webp"} width={90} height={75} alt="empanada" />
            </div>
          </div>
          <div className="text-center h-28 w-auto flex flex-col justify-between ">
            <div className="h-24  flex justify-center items-center ">
              <Image src={"/images/pizza.png"} width={70} height={70} alt="pizza" />
            </div>
          </div>
          <div className="text-center h-28 w-auto flex flex-col justify-between ">
            <div className="h-24  flex justify-center items-center ">
              <Image src={"/images/canastitaBlanca.webp"} width={90} height={90} alt="canastita" />
            </div>
          </div>
        </div>
        <div className="relative z-10 bg-black h-full bg-opacity-40  rounded-lg w-full lg:w-4/5 mx-auto text-white block md:grid md:grid-cols-3   py-2 pt-4 ">
          <p className="italic col-span-3 text-white text-center text-xs pb-2">
            * Hacer click sobre el titulo para ver descripcion.
          </p>

          {products
            ?.filter(item => item?.nombre?.includes("Combo"))
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
                    <div className="text-center py-8">
                      <p
                        onClick={() => handleOpenModal(producto)}
                        className="w-1/2 col-span-3 md:text-3xl text-xl font-bold font-roboto cursor-pointer text-white text-center  md:w-3/5 mx-auto rounded-md hover:bg-slate-50 hover:text-neutral-900 transition-colors duration-500"
                      >
                        {producto.nombre}
                      </p>
                      <p className="text-sm text-gray-200 ">
                        Pizza {producto.tamanio.charAt(0).toUpperCase() + producto.tamanio.slice(1)}
                      </p>
                      <p className="text-sm lg:text-md px-8">{producto.descripcion}</p>
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
