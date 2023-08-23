/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
// import Link from "next/link";
import { Element } from "react-scroll";
import Image from "next/image";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
// import { BsTelephone } from "react-icons/bs"
import { motion } from "framer-motion";

function HomeFront({ imagefront }) {
  return (
    <Element name="home" className="relative element">
      <Image src={imagefront} layout="fill" objectFit="cover" objectPosition={"center"} />
      <div className={` font-nunito w-full min-h-screen mx-auto `}>
        <div className="absolute inset-0 bg-black bg-opacity-40 h-full"> </div>

        <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
          <div className="relative text-center h-full">
            <div className=" flex flex-col justify-center items-center min-h-screen gap-7">
              <div className="mx-auto mt-20 ">
                <Image src="/images/logocanavaro.webp" width={150} height={150} alt="logo" />
                <p className="text-xl font-extrabold text-gray-200">¡Todo lo que necesitas en un solo lugar!</p>
                <p className="text-gray-200 font-medium text-base">Pelliza 1794 - Olivos</p>
              </div>

              <div className="w-full h-auto  p-3 mx-auto flex flex-col justify-center items-center gap-1  relative text-center">
                <div className="absolute bg-black mx-auto rounded-md h-full opacity-40 inset-0 z-0"></div>
                <div className="relative z-10 flex flex-col justify-center items-center">
                  <MdOutlineDeliveryDining size={60} className="text-white" />
                  <div className="text-xl font-extrabold text-gray-200">
                    <h1>Hac&eacute; tu pedido.</h1>
                    <h2>¡Nosotros te lo llevamos!</h2>
                    <p className="text-base font-semibold">De martes a domingo de 19 a 23hs.</p>
                  </div>

                  {/* <div className="w-full h-20 flex items-center">
                        <Link href={"/welcomeLogo"}>
                          <a
                            className={`p-5 rounded-xl  font-bold font-poppins px-7 text-base  mx-auto   bg-gray-900 text-white hover:bg-white hover:text-gray-900   hover:-translate-y-1
                          transition-all duration-500`}
                          >
                            HAC&Eacute; TU PEDIDO
                          </a>
                        </Link>
                      </div> */}
                  {/* <div className="flex items-center justify-between gap-2">
                    <BsTelephone size={17} className="text-white" />
                    <h1 className="text-lg text-gray-200 font-semibold">4711 3259</h1>
                  </div> */}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola%20quiero%20hacer%20un%20pedido!">
                    <div className="flex gap-2 items-center px-3 bg-black my-2 hover:bg-sky-950 shadow p-2 rounded-md">
                      <FaWhatsapp size={20} className="text-white" />
                      <h1 className="text-lg text-gray-200 font-semibold">Hace tu pedido</h1>
                    </div>
                  </a>
                  <h1 className="text-xl text-gray-200 font-bold">Delivery & Take Away</h1>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </Element>
  );
}

export default HomeFront;
