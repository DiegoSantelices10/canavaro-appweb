import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
export default function menu() {
  const [selected, setSelected] = useState("/admin");
  const router = useRouter();

  useEffect(() => {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    setSelected(currentPath);
  }, [selected]);

  const signOut = async () => {
    await axios
      .get("/api/auth/logout")
      .then(res => {
        if (res.data.message) {
          router.push("/admin/auth/login");
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  return (
    <div className="w-full px-2">
      <div className="w-full flex justify-end p-3 ">
        <button onClick={signOut} className=" rounded-md shadow p-3 font-semibold">
          <AiOutlineLogout size={30} />
        </button>
      </div>
      <div className="flex font-nunito font-bold justify-start w-full lg:w-2/5 lg:pl-3  h-auto ">
        <Link href="/admin" passHref>
          <button
            className={`${
              selected === "/admin" ? "border-2 border-gray-300" : "bg-white"
            } mx-auto rounded-2xl shadow-md p-2 h-auto w-28 `}
          >
            <div>
              <Image priority={true} src="/images/pedidosblack.webp" width={35} height={35} alt="pedidoblack" />
              <p className="font-bold text-base font-nunito lg:text-lg">Pedidos</p>
            </div>
          </button>
        </Link>

        <Link href="/admin/products/list" passHref>
          <button
            className={`${
              selected === "/admin/products/list" ? "border-2 border-gray-300" : "bg-white"
            } mx-auto rounded-2xl shadow-md p-2 h-auto w-28`}
          >
            <div>
              <Image priority={true} src="/images/productsblack.webp" width={35} height={35} alt="black" />
              <p className="font-bold text-base font-nunito lg:text-lg">Productos</p>
            </div>
          </button>
        </Link>

        <Link href="/admin/sales/list" passHref>
          <button
            className={`${
              selected === "/admin/sales/list" ? "border-2 border-gray-300" : "bg-white"
            } mx-auto rounded-2xl shadow-md p-2 h-auto w-28`}
          >
            <div>
              <Image priority={true} src="/images/salesblack.webp" width={35} height={35} alt="salesblack" />
              <p className="font-bold text-base font-nunito lg:text-lg">Ventas</p>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
