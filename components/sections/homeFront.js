/* eslint-disable react/no-unknown-property */
import Link from "next/link";
import { Element } from "react-scroll";
import Image from "next/image";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { motion } from "framer-motion";
function HomeFront() {
  return (
    <Element name="home" className="relative element">
      <div
        style={{
          "backgroundImage": "url(/images/fondonuevo.webp)",
        }}
        className={` font-nunito w-full min-h-screen mx-auto bg-cover bg-center`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 h-full"> </div>

        <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
          <div className="relative text-center h-full">
            <div className=" flex flex-col justify-center items-center min-h-screen gap-7">
              <div className="mx-auto mt-20 ">
                <Image priority src="/images/logocanavaro.webp" width={150} height={150} alt="logo" />
                <p className="text-xl font-extrabold text-gray-200">¡Todo lo que necesitas en un solo lugar!</p>
                <p className="text-gray-200 font-medium text-base">Pelliza 1794 - Olivos</p>
              </div>

              <div className="w-full h-auto p-3 mx-auto flex flex-col justify-center items-center gap-1   text-center">
                <MdOutlineDeliveryDining size={60} className="text-white" />

                <div className="text-2xl font-extrabold text-gray-200">
                  <h1>Hac&eacute; tu pedido.</h1>
                  <h2>¡Nosotros te lo llevamos!</h2>
                  <p className="text-base font-medium">De martes a domingo de 19 a 23hs.</p>
                </div>

                <div className="w-full h-20 flex items-center">
                  <Link href={"/welcomeLogo"}>
                    <a
                      className={`p-5 rounded-xl  font-bold font-poppins px-7 text-base  mx-auto   bg-gray-900 text-white hover:bg-white hover:text-gray-900   hover:-translate-y-1
										transition-all duration-500`}
                    >
                      HAC&Eacute; TU PEDIDO
                    </a>
                  </Link>
                </div>
                <h1 className="text-lg text-gray-200">Delivery & Take Away</h1>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Element>
  );
}

export default HomeFront;
