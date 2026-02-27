/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */

import { formatearNumero } from "libs/items";
import Add01Icon from "public/images/add-01-stroke-rounded";
import MinusSignIcon from "public/images/minus-sign-stroke-rounded";
import { motion, AnimatePresence } from "framer-motion";

export default function PizzaInfo({
  data: {
    nombre,
    precioPizza: { gigante, mediana, chica },
    categoria,
  },
  incrementCart,
  decrementCart,
  cart,
}) {
  const productQuantity = tamanio => {
    const pre = cart.find(item => item.tamanio === tamanio);
    return pre?.cantidad ? pre.cantidad : 0;
  };

  const hasQuantity = tamanio => {
    return cart.some(item => item.tamanio === tamanio);
  };

  const removeSpaces = str => {
    return str.replace(/\s/g, "");
  };

  const renderSizeRow = (tamanioLabel, price, tamanioKey) => {
    if (price === null || price === 0) return null;

    return (
      <div className="flex items-center justify-between py-5 border-b border-neutral-100 last:border-0">
        <div>
          <h3 className="text-lg font-bold text-neutral-800 font-montserrat">{tamanioLabel}</h3>
          <p className="text-neutral-500 font-medium font-montserrat text-sm">{formatearNumero(price)}</p>
        </div>

        <div className="flex items-center gap-3 bg-neutral-100 p-1 rounded-2xl">
          <AnimatePresence mode="wait">
            {hasQuantity(tamanioKey) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <button
                  type="button"
                  className="w-9 h-9 flex items-center justify-center bg-neutral-800 rounded-xl text-white shadow-sm active:scale-90 transition-transform"
                  onClick={() =>
                    decrementCart({
                      _id: removeSpaces(nombre) + tamanioKey,
                      nombre,
                      categoria,
                      tamanio: tamanioKey,
                      precio: price,
                    })
                  }
                >
                  <MinusSignIcon width={16} height={16} color="white" />
                </button>
                <span className="font-bold text-neutral-800 text-sm w-4 text-center font-montserrat">
                  {productQuantity(tamanioKey)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center bg-neutral-800 rounded-xl text-white shadow-md active:scale-95 transition-transform"
            onClick={() =>
              incrementCart({
                _id: removeSpaces(nombre) + tamanioKey,
                nombre,
                categoria,
                tamanio: tamanioKey,
                precio: price,
              })
            }
          >
            <Add01Icon width={18} height={18} color="white" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-2 px-1">
      {renderSizeRow("Gigante", gigante, "gigante")}
      {renderSizeRow("Mediana", mediana, "mediana")}
      {renderSizeRow("Chica", chica, "chica")}
    </div>
  );
}

