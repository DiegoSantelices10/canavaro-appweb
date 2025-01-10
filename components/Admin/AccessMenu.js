import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { getImageModal, getPromo, logout } from "services/fetchData";
import Image from "next/image";
import axios from "axios";

import Hamburger from 'hamburger-react'
import { AnimatePresence, motion } from "framer-motion";

const AccessMenu = () => {
  const [selected, setSelected] = useState("/admin");
  const [barra, setBarra] = useState([]);

  const [isOpen, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    setSelected(currentPath);
  }, [selected]);

  useEffect(() => {
    (async () => {
      const res = await getPromo();
      const imageModal = await getImageModal();
      setBarra([...res.data, ...imageModal]);
    })();

  }, []);

  const signOut = async () => {
    const res = await logout();

    if (res === "ok") {
      return router.push("/admin/auth/login");
    }
  };

  const promoBarra = async (id, available) => {
    const idImage = "67816cd547f387e5c3442668"

    try {
      const response = await axios.put(`/api/settings/${id === idImage ? "imageModal" : "promo"}/${id === idImage ? idImage : id}`, { available: !available })
      if (response.status === 200) {
        const updatedBarra = barra?.map(item => {
          if (item._id === id) {
            return {
              ...item,
              available: !available
            };
          }
          return item;
        });
        setBarra(updatedBarra);
      }
    } catch (error) {
      alert("Error al realizar la accion")
    }
  }

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };


  return (
    <>
      <div className="w-full bg-red-600  h-16 lg:h-screen lg:fixed lg:w-2/12  mx-auto p-2">
        <div className="h-full flex justify-between lg:flex lg:flex-col">
          <div className="lg:flex lg:justify-center lg:items-center hidden mt-5">
            <Image height={100} width={100} src={"/images/logocanavaro.webp"} />
          </div>
          <div className="relative lg:hidden grid content-center">
            <Hamburger
              size={24}
              color="white"
              toggled={isOpen}
              toggle={setOpen}
            />
          </div>

          <div className="hidden lg:block w-full space-y-2">
            <div>
              <Link href="/admin" passHref>
                <button
                  className={`transition duration-500 ease-in-out hover:bg-white hover:text-red-500 w-full p-1 px-2 rounded-md ${selected === "/admin" ? " bg-white text-red-500 tracking-wider" : "text-white"
                    } mx-auto w-auto h-auto`}
                >
                  <p className="text-base font-montserrat lg:text-left md:text-center text-center">Pedidos</p>
                </button>
              </Link>
            </div>
            <div>
              <Link href="/admin/products/list" passHref>
                <button
                  className={`transition duration-500 ease-in-out hover:bg-white hover:text-red-500 w-full p-1 px-2 rounded-md ${selected === "/admin/products/list"
                    ? "bg-white text-red-500 tracking-wider"
                    : "font-normal text-white"
                    } mx-auto w-auto  h-auto  `}
                >
                  <p className="lg:text-left md:text-center text-center text-base font-montserrat ">Productos</p>
                </button>
              </Link>
            </div>
            <div>
              <Link href="/admin/sales/list" passHref>
                <button
                  className={`transition duration-500 ease-in-out hover:bg-white hover:text-red-500 w-full p-1 px-2 rounded-md ${selected === "/admin/sales/list"
                    ? "bg-white text-red-500 tracking-wider"
                    : "font-normal text-white"
                    } mx-auto w-auto h-auto `}
                >
                  <p className="text-base font-montserrat lg:text-left md:text-center text-center">Ventas</p>
                </button>
              </Link>
            </div>
            <div>
              <Link href="/admin/settings" passHref>
                <button
                  className={`transition duration-500 ease-in-out hover:bg-white hover:text-red-500 w-full p-1 px-2 rounded-md ${selected === "/admin/settings"
                    ? "bg-white text-red-500 tracking-wider"
                    : "font-normal text-white"
                    } mx-auto w-auto  h-auto  `}
                >
                  <p className="lg:text-left md:text-center text-center text-base font-montserrat ">Configuración</p>
                </button>
              </Link>
            </div>
          </div>

          <div className="rounded-md hidden lg:block bottom-20   w-full">
            {barra?.map(item => (
              <div
                key={item._id + 'menu'}
                className="mt-2 w-full flex justify-between items-center gap-5"
              >
                <h1 className="text-white font-montserrat text-sm">
                  {item.nombre || "Imagen destacable"}
                </h1>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id={item._id + 'menu'}
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.available}
                    onChange={() => promoBarra(item._id, item.available)}
                  />
                  <div className="w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-0 
                   rounded-full 
                  dark:bg-gray-300 peer-checked:after:translate-x-full 
                    after:content-[''] after:absolute 
                   after:top-[2px] after:left-[2px] after:bg-white  
                  after:rounded-full after:h-4 after:w-4 after:transition-all 
                 dark:border-gray-600 peer-checked:bg-red-700 "></div>
                </label>

              </div>
            ))}
          </div>

          <button onClick={signOut} className="pr-2 lg:pb-3 lg:self-end">
            <AiOutlineLogout size={24} className="mx-auto text-white" />
          </button>
        </div>
      </div>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className="w-2/5 h-56 mt-2 ml-2 fixed z-10 bg-red-600 rounded-lg grid gap-4 p-3 pt-8 pb-4"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div>
              <Link href="/admin" passHref>
                <button
                  className={`${selected === "/admin" ? " text-white  font-bold tracking-wider" : "font-normal text-white"
                    } mx-auto w-auto h-auto`}
                >
                  <p className="text-base font-montserrat">Pedidos</p>
                </button>
              </Link>
            </div>
            <div>
              <Link href="/admin/products/list" passHref>
                <button
                  className={`${selected === "/admin/products/list"
                    ? "text-white tracking-wider font-semibold "
                    : "font-normal text-white"
                    }  w-auto  h-auto  `}
                >
                  <p className="text-base font-montserrat">Productos</p>
                </button>
              </Link>
            </div>

            <div>
              <Link href="/admin/sales/list" passHref>
                <button
                  className={`${selected === "/admin/sales/list"
                    ? "text-white tracking-wider font-semibold "
                    : "font-normal text-white"
                    } mx-auto w-auto h-auto `}
                >
                  <p className="text-base font-montserrat">Ventas</p>
                </button>
              </Link>
            </div>

            <div>
              <Link href="/admin/settings" passHref>
                <button
                  className={`${selected === "/admin/settings"
                    ? "text-white tracking-wider font-semibold "
                    : "font-normal text-white"
                    } mx-auto w-auto  h-auto  `}
                >
                  <p className="text-base font-montserrat">Configuración</p>
                </button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
export default AccessMenu;
