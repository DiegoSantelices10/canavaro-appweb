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

const HomeFront = () => {

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
    <div className="relative font-montserrat w-full min-h-screen mx-auto flex flex-col bg-no-repeat bg-cover bg-[url('/images/fondonuevo.webp')] md:bg-[url('/images/porcionfuga.jpg')]">
      <ModalHome imagen={imageModal} />
      <div className="absolute inset-0 bg-black bg-opacity-40 h-full"> </div>
      <motion.div
        className="relative flex flex-col w-full flex-grow z-10 gap-8 items-center justify-center"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}>

        {/* Contenido Superior Centrado */}
        <div className=" flex flex-col justify-center items-center px-4 gap-6 md:gap-6">
          <div className="flex flex-col justify-center items-center text-center">
            <div className="mb-4">
              <Image src="/images/logocanavaro.webp" width={130} height={130} alt="logo" />
            </div>
            <p className="font-montserrat text-4xl lg:text-6xl font-bold text-gray-200">Pizzeria Canavaro</p>
            <p className="text-base font-montserrat md:text-xl font-normal text-white mt-2">¡Todo lo que necesitas en un solo lugar!</p>
          </div>

          <div className="flex font-montserrat flex-col justify-center items-center relative overflow-hidden rounded-xl shadow-2xl">
            <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
            <div className="z-10 p-8 flex flex-col items-center text-center">
              <h1 className="text-xl text-gray-100 font-semibold mb-1">¡Nosotros te lo llevamos!</h1>
              <p className="text-base text-gray-300 mb-2">Delivery & Take Away</p>
              <h2 className="text-xl text-white font-bold mb-2">Tel. 2197 8752</h2>
              <p className="text-sm text-gray-200">De martes a domingo de 19 a 23hs.</p>
              <p className="text-sm text-gray-300">Pelliza 1794 - Olivos</p>
              {deliveryButton?.available && (
                <div className="mt-6">
                  <Link href={"/order/home"}>
                    <a className="inline-block p-3 px-8 rounded-full font-bold font-montserrat text-base bg-red-600 text-white hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 shadow-lg">
                      Hac&eacute; tu pedido
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botón de Menú Abajo */}
        <div className="w-full flex justify-center pb-12 md:pb-16">
          <Link href={"/digitalMenu"}>
            <a className="p-3 px-10 rounded-full font-bold font-montserrat text-lg bg-white text-red-600 hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 shadow-xl">
              Men&uacute;
            </a>
          </Link>
        </div>

        {/* Botón de WhatsApp flotante o posicionado */}
        {buttonWhatsapp?.available && (
          <div className="fixed bottom-24 right-6 z-40">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://api.whatsapp.com/send?phone=5491127145669&text=¡Hola!%20quiero%20hacer%20un%20pedido`}
              className="flex items-center bg-green-500 p-4 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
            >
              <FaWhatsapp size={32} />
            </a>
          </div>
        )}
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
    </div >
  );
}

export default HomeFront;
