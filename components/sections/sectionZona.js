import Image from "next/image";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

export default function SectionZona() {
  return (
    <Element name="zonaCobertura" className=" bg-gray-100 w-full h-full element font-nunito py-5">
      <h1 className="text-center text-sky-950 p-3 pt-10 text-3xl font-extrabold">Contacto</h1>
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className=" w-full lg:w-4/5 mx-auto text-sky-950 md:flex md:justify-center  gap-5 content-center py-5 ">
            <div className="md:w-1/2 text-center grid gap-10">
              <div>
                <h1 className="font-bold font-nunito text-lg">Horarios de atencion</h1>
                <p className="font-normal">De Martes a Domingo</p>
                <p className="font-normal">De 19 a 23hs.</p>
              </div>
              <div>
                <h1 className="font-bold  text-lg">Direccion del local</h1>
                <p className="font-normal">Mariano Pelliza 1794, Esquina D. F. Sarmiento</p>
                <p className="font-normal">Zona Olivos</p>
              </div>

              <div>
                <h1 className="font-bold  text-lg">Telefonos de Contacto</h1>
                <p className="font-normal">4711 3259</p>
                <p className="font-normal">11 2714 5669</p>
              </div>
              <div>
                <h1 className="font-bold  text-lg">Zona de envío</h1>
                <p className="font-normal">Vicente Lopez - Florida - Olivos</p>
                <p className="font-normal">La Lucila - Martinez - Munro</p>
              </div>
              <div>
                <h1 className="font-bold  text-lg">Nuestras Redes</h1>
                <div className="text-center mx-auto flex w-full gap-2 justify-center">
             
                  <div className="flex justify-center items-center w-1/4 h-12 rounded-md shadow bg-white ">
                    <a
                      className="flex items-center justify-center"
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.instagram.com/pizzeria_canavaro/"
                    >
                      <Image src="/images/logoig.webp" width={30} height={30} alt="logo" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Element>
  );
}
