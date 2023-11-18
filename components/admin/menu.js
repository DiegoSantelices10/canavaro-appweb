import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "services/fetchData";

const AccessMenu = () => {
  const [selected, setSelected] = useState("/admin");
  const router = useRouter();

  useEffect(() => {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    setSelected(currentPath);
  }, [selected]);

  const signOut = async () => {
    const res = await logout();

    if (res === "ok") {
      return router.push("/admin/auth/login");
    }
  };

  return (
    <div className="w-full  h-20 lg:h-full relative flex justify-between mx-auto lg:flex  lg:flex-col lg:justify-between lg:items-center gap-4 p-4 ">
      <div className="flex flex-row lg:flex-col lg:gap-3 gap-0 w-full lg:pt-10 pt-0 ">
        <Link href="/admin" passHref>
          <button
            className={`${selected === "/admin" ? " text-white font-semibold border-gray-200 border-b" : "font-normal text-white"
              } mx-auto w-full h-auto`}
          >
              <p className="text-base font-nunito lg:text-left md:text-center text-center">Pedidos</p>
          </button>
        </Link>

        <Link href="/admin/products/list" passHref>
          <button
            className={`${selected === "/admin/products/list" ? "text-white border-b font-semibold border-gray-200" : "font-normal text-white"
              } mx-auto w-full  h-auto  `}
          >
              <p className="lg:text-left md:text-center text-center text-base font-nunito ">Productos</p>
          </button>
        </Link>

        <Link href="/admin/sales/list" passHref>
          <button
            className={`${selected === "/admin/sales/list" ? "text-white border-b font-semibold border-gray-200" : "font-normal text-white"
              } mx-auto w-full h-auto `}
          >
              <p className="text-base font-nunito lg:text-left md:text-center text-center">Ventas</p>
          </button>
        </Link>
      </div>
      <button onClick={signOut} className="font-semibold">
        <AiOutlineLogout size={25} className="mx-auto text-white" />
      </button>
    </div>
  );
}
export default AccessMenu;