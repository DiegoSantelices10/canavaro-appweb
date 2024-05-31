/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { getPromo } from "services/fetchData";
import { useDispatch, useSelector } from "react-redux";
import { setSetting } from "store/reducers/settingSlice";

function HomeFront({ imagefront }) {
  const dispatch = useDispatch();

  const { deliveryButton } = useSelector(state => state.setting);

  useEffect(() => {
    (async () => {
      const { data, status } = await getPromo();
      if (status === 200) {

        const delivery = data.find(item => item.nombre === "Delivery")
        const barra = data.find(item => item.nombre === "Promo Barra")
        const efectivo = data.find(item => item.nombre === "Promo efectivo")
        dispatch(setSetting({ deliveryButton: delivery, promoBarra: barra, promoEfectivo: efectivo }));
        localStorage.setItem('buttom delivery', { buttomDelivery: delivery[0] })
      }
    })()

  }, [])
  return (
    <div className="font-poppins w-full min-h-screen mx-auto flex flex-col">
      <Image src={imagefront} layout="fill" objectFit="cover" objectPosition={"center"} />
      <div className="absolute inset-0 bg-black bg-opacity-40 h-full"> </div>
      <motion.div
        className="flex items-center flex-col md:flex-row gap-y-36 md:gap-0 justify-center  w-full relative flex-grow "
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}>
        <div className="  md:w-1/2  flex flex-col justify-center items-center">
          <div className="md:absolute md:bottom-4 md:right-4 md:w-28">
            <Image src="/images/logocanavaro.webp" width={130} height={130} alt="logo" />
          </div>
          <p className="font-poppins text-3xl lg:text-5xl text-center font-bold text-gray-200">Pizzeria Canavaro</p>
          <p className="text-sm md:text-base font-normal text-white ">¡Todo lo que necesitas en un solo lugar!</p>

          <div className="w-full flex items-center mt-3">
            <Link href={"/digitalMenu"}>
              <a
                className={`p-2 px-4 rounded-lg font-normal text-white font-poppins  text-base  mx-auto 
                          hover:bg-black hover:text-white bg-red-600 
                          hover:-translate-y-1 transition-all duration-500`}
              >
                Men&uacute; digital
              </a>
            </Link>
          </div>
        </div>

        <div
          className="md:w-1/3 lg:mt-0  
                         mx-auto flex flex-col 
                        justify-center items-center gap-1 text-center">
          <div className="flex flex-col justify-center items-center relative">
            <div className="absolute bg-black rounded-xl opacity-50 h-full w-full z-0"></div>
            <div className="z-10 p-6 rounded-xl">
              <h1 className="text-xl text-gray-200 font-semibold">¡Nosotros te lo llevamos!</h1>
              <h1 className="text-base text-gray-200 font-normal">Delivery & Take Away</h1>
              <p className="text-sm lg:text-base text-zinc-200 font-normal">De martes a domingo de 19 a 23hs.</p>
              <p className="text-zinc-200  text-sm lg:text-base">Pelliza 1794 - Olivos</p>
              {deliveryButton.available && (
                <div className="w-full flex items-center mt-3">
                  <Link href={"/welcomeLogo"}>
                    <a
                      className={`p-2 px-4 rounded-lg font-normal  font-poppins  text-base  mx-auto 
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
        </div>
      </motion.div>
      <div className="w-full flex justify-center items-start gap-4 p-1 bg-red-600 z-50">
        <div className="flex items-center">
          <h1 className="text-white font-poppins tracking-wider font-light text-sm">
            Desarrollado por <span
              className="font-poppins text-white font-medium text-sm tracking-wider"

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
