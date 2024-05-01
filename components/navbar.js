/* eslint-disable react/prop-types */
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import ShoppingCart02Icon from "public/images/shopping-cart-02-stroke-rounded";

export default function Navbar() {
  const { orderList } = useSelector(state => state.order);
  const [loader, setLoader] = useState(false);

  const handleLoader = () => {
    setLoader(true)
  }
  return (
    <nav className="w-full    mx-auto fixed lg:h-[11%] h-[8%] top-0  z-50  ">
      <div className="w-full flex justify-between px-3 h-full md:shadow-md  bg-white  items-center sm:w-4/5 md:w-4/5 lg:w-3/5 mx-auto">
        <div className="font-poppins tracking-wide py-6">
          <p className="font-semibold text-lg lg:text-base text-zinc-800">¡Bienvenido!</p>
        </div>
        {orderList.length > 0 && (
          <div className="rounded-xl p-2 px-4  bg-red-600 hover:bg-red-500  hover:-translate-y-1 transition-all duration-500">
            {loader ?
              <ColorRing
                visible={true}
                height="24"
                width="24"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
              /> : (
                <Link href={"/order/cart"} >
                  <a className="flex justify-center items-center gap-2" onClick={handleLoader}>
                    {/* <p className=" text-white font-poppins text-sm font-normal">Ver pedido</p>
                    <FiShoppingCart className="text-white" size={16} /> */}
                    <ShoppingCart02Icon className="text-white" size={16} />
                  </a>
                </Link>
              )
            }
          </div>
        )}
      </div>
    </nav>
  );
}
