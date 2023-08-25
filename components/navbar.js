/* eslint-disable react/prop-types */
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { orderList } = useSelector(state => state.order);

  return (
    <nav className="w-full bg-white   mx-auto fixed h-[7%]  top-0 py-8  z-50  ">
      <div className="w-full flex justify-between px-3  items-center sm:w-4/5 md:w-4/5 lg:w-3/5 mx-auto  h-full ">
        <div className="font-nunito font-bold text-lg tracking-wide">
          ¡Hola!<span className="font-medium italic text-slate-700"> Que vas a pedir hoy?</span>{" "}
        </div>
        {orderList.length > 0 && (
          <div className="p-1 rounded-3xl w-auto bg-sky-800 hover:bg-sky-700  px-4 hover:-translate-y-1 transition-all duration-500">
            <Link href={"/order/cart"}>
              <a className="flex justify-center items-center gap-2">
                <p className=" text-white p-1 font-poppins text-sm font-semibold">Tu carrito</p>
                <FiShoppingCart className="text-white" size={18} />
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
