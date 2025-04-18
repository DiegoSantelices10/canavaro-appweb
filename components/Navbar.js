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
    <nav className="w-full mx-auto fixed top-0 z-50 bg-red-600">
      <div className="w-full flex justify-between p-2 px-3 h-full items-center sm:w-4/5 md:w-4/5 lg:w-3/5 mx-auto">
        <div className="font-montserrat tracking-wide">
          <p className="font-semibold text-lg lg:text-base text-white">CANAVARO</p>
        </div>
        {orderList.length > 0 && (

          <div className="rounded-lg py-2 px-2.5 flex gap-2 items-center   bg-white hover:bg-red-500  hover:-translate-y-1 transition-all duration-500">
            {loader ?
              <ColorRing
                visible={true}
                height="20"
                width="20"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#E21D1D', '#E21D1D', '#E21D1D', '#E21D1D', '#E21D1D']}
              /> : (
                <Link href={"/order/cart"} >
                  <a className="flex justify-center items-center gap-2" onClick={handleLoader}>
                    <ShoppingCart02Icon className="text-red-600 w-5 h-5 hover:text-white" />
                    <div className="rounded-full flex justify-center items-center h-5 w-5 bg-red-500">
                      <p className="font-semibold text-white text-sm">{orderList.length}</p>
                    </div>
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
