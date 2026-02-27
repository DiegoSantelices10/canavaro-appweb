/* eslint-disable react/prop-types */
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const { orderList } = useSelector(state => state.order);
  const [loader, setLoader] = useState(false);

  const handleLoader = () => {
    setLoader(true)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[60] bg-red-700 shadow-lg shadow-black/10">
      <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center transition-all duration-300">
        <Link href="/">
          <a className="group flex items-center gap-1 active:scale-95 transition-transform">
            <span className="text-xl font-black font-montserrat tracking-tighter text-white uppercase italic">
              CANAVARO
            </span>
          </a>
        </Link>

        <AnimatePresence>
          {orderList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <Link href={"/order/cart"} >
                <a
                  onClick={handleLoader}
                  className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full text-red-700 shadow-lg transition-all active:scale-90"
                >
                  {loader ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-red-700/30 border-t-red-700 rounded-full"
                    />
                  ) : (
                    <>
                      <FiShoppingCart size={18} />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 rounded-full flex items-center justify-center border-2 border-white"
                      >
                        <span className="text-[9px] font-black text-white">{orderList.length}</span>
                      </motion.div>
                    </>
                  )}
                </a>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
