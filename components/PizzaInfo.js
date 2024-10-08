/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */

import { formatearNumero } from "libs/items";
import Add01Icon from "public/images/add-01-stroke-rounded";
import MinusSignIcon from "public/images/minus-sign-stroke-rounded";

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
  const quantityZero = tamanio => {
    return cart.find(item => item.tamanio === tamanio);
  };

  const removeSpaces = str => {
    return str.replace(/\s/g, "");
  };


  return (
    <>
      {" "}
      {gigante !== null && gigante !== 0 && (
        <div className="font-montserrat grid grid-cols-2 z-20 items-start justify-between w-full my-3 ">
          <div className="text-lg font-medium text-neutral-800">
            <h2>Gigante</h2>
            <h2 className='text-gray-400 font-normal font-montserrat text-sm'>{formatearNumero(gigante)}</h2>
          </div>
          <div className=" flex  items-center justify-end bottom-0 right-0 w-auto   text-end gap-3 text-base">
            <div
              className={
                quantityZero("gigante") ? "rounded-full w-7 h-7 grid content-center  shadow  bg-slate-50" : "invisible"
              }
            >
              <button
                type="button"
                className="text-red-500 font-normal text-2xl flex justify-center items-center "
                onClick={() =>
                  decrementCart({
                    _id: removeSpaces(nombre) + "gigante",
                    nombre,
                    categoria,
                    tamanio: "gigante",
                    precio: gigante,
                  })
                }
              >
                <MinusSignIcon color={"bg-red-500"} width={18} height={18} />

              </button>
            </div>

            <span className="font-normal text-xl  h-6">{productQuantity("gigante") === 0 ? "" : productQuantity("gigante")}</span>
            <div className="rounded-full w-8 h-8 grid content-center p-0 shadow  bg-slate-50">
              <button
                type="button"
                className="text-green-500 font-normal text-2xl flex justify-center items-center"
                onClick={() =>
                  incrementCart({
                    _id: removeSpaces(nombre) + "gigante",
                    nombre,
                    categoria,
                    tamanio: "gigante",
                    precio: gigante,
                  })
                }
              >
                <Add01Icon color={"bg-green-500"} width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      {mediana !== null && mediana !== 0 && (
        <div className="font-montserrat grid grid-cols-2 justify-between items-start my-3">
          <div className="text-lg font-medium text-neutral-800">
            <h1>Mediana</h1>
            <h2 className='text-gray-400 font-normal font-montserrat text-sm'>{formatearNumero(mediana)}</h2>
          </div>
          <div className=" flex items-center justify-end bottom-0 right-0 w-auto  text-end gap-3 text-base">
            <div
              className={
                quantityZero("mediana") ? "rounded-full w-7 h-7 grid content-center  shadow  bg-slate-50" : "invisible"
              }
            >
              <button
                type="button"
                className="text-red-500 font-normal text-2xl flex justify-center items-center "
                onClick={() =>
                  decrementCart({
                    _id: removeSpaces(nombre) + "mediana",
                    nombre,
                    categoria,
                    tamanio: "mediana",
                    precio: mediana,
                  })
                }
              >
                <MinusSignIcon color={"bg-red-500"} width={18} height={18} />

              </button>
            </div>

            <span className="font-normal text-xl  h-6">{productQuantity("mediana") === 0 ? "" : productQuantity("mediana")}</span>
            <div className="rounded-full w-8 h-8 grid content-center p-0 shadow  bg-slate-50">
              <button
                type="button"
                className="text-green-500 font-normal text-2xl flex justify-center items-center"
                onClick={() =>
                  incrementCart({
                    _id: removeSpaces(nombre) + "mediana",
                    nombre,
                    categoria,
                    tamanio: "mediana",
                    precio: mediana,
                  })
                }
              >
                <Add01Icon color={"bg-green-500"} width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      {chica !== null && chica !== 0 && (
        <div className=" font-montserrat grid grid-cols-2 justify-between items-start my-3">
          <div className="text-lg font-medium text-neutral-800">
            <h2>Chica</h2>
            <h2 className='text-gray-400 font-normal font-montserrat text-sm'>{formatearNumero(chica)}</h2>
          </div>
          <div className=" flex items-center justify-end bottom-0 right-0 w-auto  text-end gap-3 text-base">
            <div
              className={
                quantityZero("chica") ? "rounded-full w-7 h-7 grid content-center  shadow  bg-slate-50" : "invisible"
              }
            >
              <button
                type="button"
                className="text-red-500 font-normal text-2xl flex justify-center items-center "
                onClick={() =>
                  decrementCart({
                    _id: removeSpaces(nombre) + "chica",
                    nombre,
                    categoria,
                    tamanio: "chica",
                    precio: chica,
                  })
                }
              >
                <MinusSignIcon color={"bg-red-500"} width={18} height={18} />
              </button>
            </div>

            <span className="font-normal text-xl  h-6">{productQuantity("chica") === 0 ? "" : productQuantity("chica")}</span>
            <div className="rounded-full w-8 h-8 grid content-center p-0 shadow  bg-slate-50">
              <button
                type="button"
                className="text-green-500 font-normal text-2xl flex justify-center items-center"
                onClick={() =>
                  incrementCart({
                    _id: removeSpaces(nombre) + "chica",
                    nombre,
                    categoria,
                    tamanio: "chica",
                    precio: chica,
                  })
                }
              >
                <Add01Icon color={"bg-green-500"} width={18} height={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
