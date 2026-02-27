/* eslint-disable react/prop-types */
import { convertToPath, formatearNumero } from "libs/items";
import Image from "next/image";
import Link from "next/link";
import Add01Icon from "public/images/add-01-stroke-rounded";
import MinusSignIcon from "public/images/minus-sign-stroke-rounded";
import { useDispatch, useSelector } from "react-redux";
import { addProductPromo, decrementProductPromo } from "store/reducers/orderSlice";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ data: { _id, nombre, imagen, descripcion, categoria, precio, precioExtra } }) => {
  const { orderPromo } = useSelector(state => state.order);
  const dispatch = useDispatch();

  const addItems = value => {
    dispatch(addProductPromo(value));
  };

  const decrementItems = value => {
    dispatch(decrementProductPromo(value));
  };

  const productQuantity = _id => {
    const pre = orderPromo?.find(item => item._id === _id);
    return pre?.cantidad ? pre.cantidad : 0;
  };

  const hasQuantity = _id => {
    return orderPromo?.some(item => item._id === _id);
  };

  const isQuickAddCategory = () => {
    const cat = categoria?.toLowerCase();
    return cat === "postres" || cat === "empanadas" || cat === "bebidas" || cat === "porciones";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-4 border-b border-neutral-100 last:border-0"
    >
      <div className="flex gap-4 items-center">
        {/* Image Section */}
        <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28">
          {isQuickAddCategory() ? (
            <div className="w-full h-full relative">
              <Image
                className="rounded-2xl overflow-hidden"
                src={imagen?.url || "/images/producto-sin-imagen.png"}
                layout="fill"
                objectFit="cover"
                alt={nombre}
              />
            </div>
          ) : (
            <Link href={`/order/products/${convertToPath(nombre)}`}>
              <a className="block w-full h-full relative">
                <Image
                  className="rounded-2xl overflow-hidden"
                  src={imagen?.url || "/images/producto-sin-imagen.png"}
                  layout="fill"
                  objectFit="cover"
                  alt={nombre}
                />
              </a>
            </Link>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 min-w-0 pr-2">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="font-bold font-montserrat text-neutral-800 text-sm sm:text-base leading-tight">
                {nombre}
              </h3>
              <p className="text-neutral-400 text-xs mt-1 line-clamp-2 font-montserrat leading-tight">
                {descripcion}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div>
              {categoria?.toLowerCase() !== "pizzas" && (
                <p className="font-bold text-neutral-900 text-base font-montserrat">
                  {precioExtra ? formatearNumero(precioExtra + precio) : formatearNumero(precio)}
                </p>
              )}
            </div>

            {isQuickAddCategory() ? (
              <div className="flex items-center gap-3 bg-neutral-100 p-1 rounded-2xl">
                <AnimatePresence mode="wait">
                  {hasQuantity(_id) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-3"
                    >
                      <button
                        type="button"
                        className="w-9 h-9 flex items-center justify-center bg-neutral-800 rounded-xl text-white shadow-sm active:scale-90 transition-transform"
                        onClick={() => decrementItems({ _id, nombre, precio, precioExtra, categoria })}
                      >
                        <MinusSignIcon width={16} height={16} color="white" />
                      </button>
                      <span className="font-bold text-neutral-800 text-sm w-4 text-center font-montserrat">
                        {productQuantity(_id)}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center bg-neutral-800 rounded-xl text-white shadow-md active:scale-95 transition-transform"
                  onClick={() => addItems({ _id, nombre, precio, precioExtra, categoria })}
                >
                  <Add01Icon width={18} height={18} color="white" />
                </button>
              </div>


            ) : (
              <Link href={`/order/products/${convertToPath(nombre)}`}>
                <a className="px-3.5 py-1.5 border border-neutral-200 hover:border-red-600 hover:text-red-600 text-neutral-400 text-[9px] font-black uppercase tracking-[0.15em] rounded-xl transition-all active:scale-95 whitespace-nowrap bg-white shadow-sm">
                  {categoria?.toLowerCase() === "pizzas" ? "Elegir tamaño" : "Ver más"}
                </a>
              </Link>
            )}


          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
