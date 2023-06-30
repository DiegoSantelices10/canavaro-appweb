import Image from "next/image";
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

export default function SectionZona() {
  return (
    <Element name="zonaCobertura" className=" w-full h-full element font-nunito py-5">
      <h1 className="text-center text-gray-200 p-3 pt-10 text-3xl font-extrabold">Contacto</h1>
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className=" w-full lg:w-4/5 mx-auto text-white md:flex md:justify-between  gap-5 content-center py-5 ">
            <div className="md:w-1/2 text-center grid grid-cols-1 gap-10">
              <div>
                <h1 className="font-bold font-nunito text-lg">Horarios de atencion</h1>
                <p className="font-light">De Martes a Domingo</p>
                <p className="font-light">De 19 a 23hs.</p>
              </div>
              <div>
                <h1 className="font-bold  text-lg">Direccion del local</h1>
                <p className="font-light">Mariano Pelliza 1794, Esquina D. F. Sarmiento</p>
                <p className="font-light">Zona Olivos</p>
              </div>

              <div>
                <h1 className="font-bold  text-lg">Telefonos de Contacto</h1>
                <p className="font-light">4711 3259</p>
                <p className="font-light">11 2714 5669</p>
              </div>
              <div>
                <h1 className="font-bold  text-lg">Zona de Cobertura</h1>
                <p className="font-light">Vicente Lopez - Florida - Olivos - La Lucila</p>
                <p className="font-light">Acassuso - Martinez - Munro</p>
              </div>
              <div>
                <h1 className="font-bold  text-lg">Nuestras Redes</h1>
                <div className="text-center mx-auto flex w-full gap-2 justify-center">
                  <div className="flex items-center justify-center w-1/4 h-12 rounded-md shadow  text-center bg-white ">
                    <a href="https://facebook.com/Canavaro-289165874501296/">
                      <FaFacebook className="text-blue-700" size={30} />
                    </a>
                  </div>
                  <div className="flex justify-center items-center w-1/4 h-12 rounded-md shadow bg-white ">
                    <a
                      className="flex items-center justify-center"
                      href="https://facebook.com/Canavaro-289165874501296/"
                    >
                      <Image src="/images/logoig.png" width={30} height={30} alt="logo" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md py-5 md:pr-5 md:py-0  mx-auto flex justify-center w-auto h-4/5 my-auto">
              <Image
                className="rounded-md mx-auto"
                src="/images/mapanuevocobertura.webp"
                width={600}
                height={400}
                alt="zona"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Element>
  );
}
