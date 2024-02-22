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
        const delivery = data.filter(item => item.nombre === "Delivery")
        const barra = data.filter(item => item.nombre === "Promo Barra")
        dispatch(setSetting({ deliveryButton: delivery[0], promoBarra: barra[0] }))
        localStorage.setItem('buttom delivery', { buttomDelivery: delivery[0] })
      }
    })()

  }, [])
  return (
    <div>
      <Image src={imagefront} layout="fill" objectFit="cover" objectPosition={"center"} />
      <div className={` font-poppins w-full min-h-screen mx-auto `}>
        <div className="absolute inset-0 bg-black bg-opacity-30 h-full"> </div>

        <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
          <div className="relative text-center h-full">
            <div className="w-full flex sm:flex-col md:flex-row lg:flex-row flex-col justify-center items-center min-h-screen gap-3">

              <div className="w-full md:w-1/2">
                <p className="font-poppins text-4xl lg:text-6xl text-center  font-bold text-gray-200">Pizzeria Canavaro</p>
                <p className="text-base md:text-xl font-medium text-white">¡Todo lo que necesitas en un solo lugar!</p>
                <p className="text-sm lg:text-base text-zinc-200 font-normal">De martes a domingo de 19 a 23hs.</p>
                <p className="text-zinc-200  text-sm lg:text-base">Pelliza 1794 - Olivos</p>
                <div className="w-full flex items-center my-5 lg:mb-2">
                  <Link href={"/digitalMenu"}>
                    <a
                      className={`p-3 px-5 rounded-3xl font-medium text-white font-poppins  text-lg  mx-auto 
                          hover:bg-black hover:text-white bg-red-600 
                          hover:-translate-y-1 transition-all duration-500`}
                    >
                      Men&uacute; digital
                    </a>
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-1/3  h-auto p-5 lg:py-10 mx-auto flex flex-col justify-center items-center gap-1  relative text-center">
                <div className="absolute bg-black  mx-auto rounded-md h-full opacity-40 inset-0 z-0"></div>
                <div className="relative z-10 flex flex-col justify-center items-center">
                  <Image src="/images/logocanavaro.webp" width={130} height={130} alt="logo" />
                  {deliveryButton.available && (
                    <div className="w-full flex items-center my-5 lg:mb-2">
                      <Link href={"/welcomeLogo"}>
                        <a
                          className={`p-3 px-5 rounded-3xl font-medium  font-poppins  text-lg  mx-auto 
                          hover:bg-black hover:text-white bg-red-600  text-white 
                          hover:-translate-y-1 transition-all duration-500`}
                        >
                          Hac&eacute; tu pedido
                        </a>
                      </Link>
                    </div>
                  )}

                  <h1 className="text-xl text-gray-200 font-semibold">¡ Nosotros te lo llevamos !</h1>
                  <h1 className="text-base text-gray-200 font-normal">Delivery & Take Away</h1>
                </div>

              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HomeFront;
