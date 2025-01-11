/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa"

import { getImageModal, getPromo } from "services/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "store/reducers/settingSlice";
import ModalHome from "components/ModalHome";
import { FaWhatsapp } from "react-icons/fa";

function HomeFront() {

  const [imageModal, setImageModal] = useState({});
  const [buttonWhatsapp, setButtonWhatsapp] = useState({});
  const dispatch = useDispatch();
  const { deliveryButton } = useSelector(state => state.setting);

  useEffect(() => {
    (async () => {
      const { data, status } = await getPromo();
      const imageModal = await getImageModal();
      setImageModal(...imageModal);

      if (status === 200) {
        const delivery = data.find(item => item.nombre === "Delivery")
        const whatsapp = data.find(item => item.nombre === "Boton whatsapp")
        setButtonWhatsapp(whatsapp)
        dispatch(setSetting({ deliveryButton: delivery }));
        localStorage.setItem('buttom delivery', { buttomDelivery: delivery[0] })
      }
    })()

  }, [])
  return (
    <div className="font-montserrat w-full min-h-screen mx-auto flex flex-col bg-no-repeat bg-cover bg-[url('/images/fondonuevo.webp')] md:bg-[url('/images/porcionfuga.jpg')]">
      <ModalHome imagen={imageModal} />
      <div className="absolute inset-0 bg-black bg-opacity-40 h-full"> </div>
      <motion.div
        className="flex items-center pb-4 flex-col md:flex-row gap-y-28 md:gap-0 justify-center  w-full relative flex-grow "
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}>
        <div className="md:w-1/2  flex flex-col justify-center p-6 items-center z-40">
          <div className="md:absolute md:bottom-4 md:right-4 md:w-28">
            <Image src="/images/logocanavaro.webp" width={130} height={130} alt="logo" />
          </div>
          <p className="font-montserrat text-3xl lg:text-5xl text-center font-bold text-gray-200">Pizzeria Canavaro</p>
          <p className="text-sm font-montserrat md:text-base font-normal text-white ">¡Todo lo que necesitas en un solo lugar!</p>

          <div className="w-full flex items-center mt-3 md:mt-6">
            <Link href={"/digitalMenu"}>
              <a
                className={`p-2 px-6 rounded-lg font-medium  font-montserrat  text-sm  mx-auto 
                          hover:bg-black hover:text-white bg-white text-red-600  
                          hover:-translate-y-1 transition-all duration-500`}
              >
                Men&uacute;
              </a>
            </Link>
          </div>
        </div>

        <div className="md:w-1/3 lg:mt-0 mx-auto flex space-y-4 flex-col justify-center items-center gap-4 text-center">
          <div className="flex font-montserrat flex-col justify-center items-center relative">
            <div className="absolute bg-black rounded-lg opacity-50 h-full w-full z-0"></div>
            <div className="z-10 p-6 rounded-lg font-montserrat">
              <h1 className="text-bse text-gray-200 font-semibold">¡Nosotros te lo llevamos!</h1>
              <h1 className="text-sm text-gray-200 font-normal">Delivery & Take Away</h1>
              <p className="text-sm  text-zinc-200 font-normal">De martes a domingo de 19 a 23hs.</p>
              <p className="text-zinc-200  text-sm ">Pelliza 1794 - Olivos</p>
              {deliveryButton.available && (
                <div className="w-full flex items-center mt-3">
                  <Link href={"/welcomeLogo"}>
                    <a
                      className={`p-2 px-6 rounded-lg font-medium  font-montserrat  text-sm  mx-auto 
                          hover:bg-black hover:text-white bg-red-600  text-white 
                          hover:-translate-y-1 transition-all duration-500`}
                    >
                      Hac&eacute; tu pedido
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
          {buttonWhatsapp.available && (
            <div className="md:absolute transition-all duration-500 focus:-translate-y-2 hover:-translate-y-2 md:bottom-6 md:z-30 md:left-6 flex gap-4 justify-center items-center">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20hacer%20un%20pedido`}
              >
                <div className="flex items-center bg-green-500 p-3 text-white font-semibold rounded-full shadow-md">
                  <FaWhatsapp size={36} />
                </div>
              </a>
            </div>
          )}
        </div>
      </motion.div>
      <div className="w-full flex justify-center md:justify-start items-start gap-4 p-1 px-5 bg-red-600 z-50">
        <div className="flex items-center">
          <h1 className="text-white font-montserrat tracking-wider font-light text-sm">
            Desarrollado por <span
              className="font-montserrat text-white font-medium text-sm tracking-wider"

            >
              dinhodev
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HomeFront;
