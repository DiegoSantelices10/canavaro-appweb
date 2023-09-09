import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <div className="w-full  h-full relative flex justify-between  mx-auto lg:flex  lg:flex-col lg:justify-between lg:items-center gap-4 p-4 ">

      <div className="flex flex-row lg:flex-col gap-3">
        <Link href="/admin" passHref>
          <button
            className={`${selected === "/admin" ? "border-2 font-bold border-gray-400" : "bg-white"
              } mx-auto rounded-2xl shadow p-2 h-auto w-20`}
          >
            <div>
              <Image priority={true} src="/images/pedidosblack.webp" width={25} height={25} alt="pedidoblack" />
              <p className="text-sm font-nunito">Pedidos</p>
            </div>
          </button>
        </Link>

        <Link href="/admin/products/list" passHref>
          <button
            className={`${selected === "/admin/products/list" ? "border-2 font-bold border-gray-400" : "bg-white"
              } mx-auto rounded-2xl shadow py-2 h-auto w-20 `}
          >
            <div>
              <Image priority={true} src="/images/productsblack.webp" width={25} height={25} alt="black" />
              <p className="text-center text-sm font-nunito ">Productos</p>
            </div>
          </button>
        </Link>

        <Link href="/admin/sales/list" passHref>
          <button
            className={`${selected === "/admin/sales/list" ? "border-2 font-bold border-gray-400" : "bg-white"
              } mx-auto rounded-2xl shadow p-2 h-auto w-20 `}
          >
            <div>
              <Image priority={true} src="/images/salesblack.webp" width={35} height={35} alt="salesblack" />
              <p className="text-sm font-nunito ">Ventas</p>
            </div>
          </button>
        </Link>
      </div>
      <button onClick={signOut} className="font-semibold">
        <AiOutlineLogout size={30} className="mx-auto" />
      </button>
    </div>
  );
}
export default AccessMenu;