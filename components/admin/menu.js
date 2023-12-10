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
    <div className="w-full  h-16 lg:h-full relative flex justify-between mx-auto lg:flex  lg:flex-col lg:justify-start lg:items-center gap-4 p-4 ">
      <div className="lg:flex lg:justify-center lg:items-center hidden">
        <Image height={110} width={110} src={"/images/logocanavaro.webp"} />
      </div>
      <div className="w-11/12 lg:w-full flex justify-around items-center lg:block lg:pt-10 pt-0">
        <div>
          <Link href="/admin" passHref>
            <button
              className={`${selected === "/admin" ? " text-white  font-semibold border-gray-200 border-b" : "font-normal text-white"
                } mx-auto w-auto h-auto`}
            >
              <p className="text-base font-poppins lg:text-left md:text-center text-center">Pedidos</p>
            </button>
          </Link>
        </div>
        <div className="lg:mt-1">
          <Link href="/admin/products/list" passHref>
            <button
              className={`${selected === "/admin/products/list"
                ? "text-white border-b font-semibold border-gray-200"
                : "font-normal text-white"
                } mx-auto w-auto  h-auto  `}
            >
              <p className="lg:text-left md:text-center text-center text-base font-poppins ">Productos</p>
            </button>
          </Link>

        </div>
        <div className="lg:mt-1">
          <Link href="/admin/sales/list" passHref>
            <button
              className={`${selected === "/admin/sales/list"
                ? "text-white border-b font-semibold border-gray-200"
                : "font-normal text-white"
                } mx-auto w-auto h-auto `}
            >
              <p className="text-base font-poppins lg:text-left md:text-center text-center">Ventas</p>
            </button>
          </Link>
        </div>
      </div>
      <div className="rounded-md hidden lg:block mt-3">
        {barra?.map(item => (
          <div key={item._id} className="w-full py-1 h-auto mx-auto text-center">
            <button
              className={`w-32 h-8 font-nunito whitespace-nowrap font-semibold rounded-md text-sm border" ${item?.available ? "text-white border-2 border-white bg-sky-700" : "text-sky-900 bg-white border "}`}
              type="button"
              onClick={() => promoBarra(item?._id, item?.available)}
            >
              {item.nombre}
            </button>
          </div>
        ))}
      </div>
      <button onClick={signOut} className="font-semibold absolute right-3 top-1/2 -translate-y-1/2 lg:right-4 lg:bottom-1 lg:top-auto">
        <AiOutlineLogout size={25} className="mx-auto text-white" />
      </button>
    </div>
  );
};
export default AccessMenu;
