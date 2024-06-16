import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { getPromo, logout } from "services/fetchData";
import Image from "next/image";
import axios from "axios";

const AccessMenu = () => {
  const [selected, setSelected] = useState("/admin");
  const [barra, setBarra] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    setSelected(currentPath);
  }, [selected]);

  useEffect(() => {
    (async () => {
      const res = await getPromo();

      setBarra(res.data)
    })();

  }, []);

  const signOut = async () => {
    const res = await logout();

    if (res === "ok") {
      return router.push("/admin/auth/login");
    }
  };

  const promoBarra = async (id, available) => {

    try {
      const response = await axios.put(`/api/settings/promo/${id}`, { available: !available })
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


  return (
    <div className="w-full bg-red-600 rounded-xl  h-16 lg:h-full relative flex justify-between mx-auto lg:flex  lg:flex-col lg:justify-start lg:items-center gap-4 p-4 ">
      <div className="lg:flex lg:justify-center lg:items-center hidden mt-5 ">
        <Image height={100} width={100} src={"/images/logocanavaro.webp"} />
      </div>
      <div className="w-11/12 lg:w-full flex justify-between items-center lg:block lg:pt-10 pt-0">
        <div>
          <Link href="/admin" passHref>
            <button
              className={`${selected === "/admin" ? " text-white  font-bold tracking-wider" : "font-normal text-white"
                } mx-auto w-auto h-auto`}
            >
              <p className="text-base font-poppins lg:text-left md:text-center text-center">Pedidos</p>
            </button>
          </Link>
        </div>
        <div className="lg:mt-4">
          <Link href="/admin/products/list" passHref>
            <button
              className={`${selected === "/admin/products/list"
                ? "text-white tracking-wider font-semibold "
                : "font-normal text-white"
                } mx-auto w-auto  h-auto  `}
            >
              <p className="lg:text-left md:text-center text-center text-base font-poppins ">Productos</p>
            </button>
          </Link>

        </div>
        <div className="lg:mt-4">
          <Link href="/admin/sales/list" passHref>
            <button
              className={`${selected === "/admin/sales/list"
                ? "text-white tracking-wider font-semibold "
                : "font-normal text-white"
                } mx-auto w-auto h-auto `}
            >
              <p className="text-base font-poppins lg:text-left md:text-center text-center">Ventas</p>
            </button>
          </Link>
        </div>
        <div className="lg:mt-4">
          <Link href="/admin/settings" passHref>
            <button
              className={`${selected === "/admin/settings"
                ? "text-white tracking-wider font-semibold "
                : "font-normal text-white"
                } mx-auto w-auto  h-auto  `}
            >
              <p className="lg:text-left md:text-center text-center text-base font-poppins ">Ajustes</p>
            </button>
          </Link>
        </div>
      </div>
      <div className="rounded-md hidden lg:block absolute bottom-20 px-3  w-full">
        {barra?.map(item => (
          <div
            key={item._id + 'menu'}
            className="mt-2 w-full flex justify-between items-center gap-5"
          >
            <h1 className="text-white font-poppins">
              {item.nombre}
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
      <button onClick={signOut} className="font-semibold absolute right-3 top-1/2 -translate-y-1/2 lg:right-4 lg:bottom-1 lg:top-auto">
        <AiOutlineLogout size={20} className="mx-auto text-white" />
      </button>
    </div>
  );
};
export default AccessMenu;
