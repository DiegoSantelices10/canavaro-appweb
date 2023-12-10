/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */

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
        <div className="font-nunito grid grid-cols-3 items-center justify-between w-full mb-3">
          <div className="text-lg font-semibold text-neutral-800">
            <h2>Gigante</h2>
          </div>
          <div className="font-semibold text-lg text-neutral-800 flex items-center text-center ">{<h2>$ {gigante}</h2>}</div>
          <div className=" flex  items-center justify-end bottom-0 right-0 w-auto   text-end gap-3 text-base">
            <div
              className={
                quantityZero("gigante") ? "rounded-md w-7 h-7 grid content-center  shadow  bg-slate-50" : "invisible"
              }
            >
              <button
                type="button"
                className="text-red-500 text-3xl "
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
                -
              </button>
            </div>

            <span className="font-normal text-xl  h-6">{productQuantity("gigante")}</span>
            <div className="rounded-md w-8 h-8 grid content-center p-0 shadow  bg-slate-50">
              <button
                type="button"
                className="text-sky-800 text-3xl"
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
                +
              </button>
            </div>
          </div>
        </div>
      )}
      {mediana !== null && mediana !== 0 && (
        <div className="font-nunito grid grid-cols-3 justify-between items-center mb-3">
          <div className="text-lg font-semibold text-neutral-800">
            <h2>Mediana</h2>
          </div>
          <div className="text-lg font-semibold text-neutral-800 ">{<h2>$ {mediana}</h2>}</div>
          <div className=" flex items-center justify-end bottom-0 right-0 w-auto  text-end gap-3 text-base">
            <div
              className={
                quantityZero("mediana") ? "rounded-md w-7 h-7 grid content-center  shadow  bg-slate-50" : "invisible"
              }
            >
              <button
                type="button"
                className="text-red-500 text-3xl "
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
                -
              </button>
            </div>

            <span className="font-normal text-xl  h-6">{productQuantity("mediana")}</span>
            <div className="rounded-md w-8 h-8 grid content-center p-0 shadow  bg-slate-50">
              <button
                type="button"
                className="text-sky-800 text-3xl"
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
                +
              </button>
            </div>
          </div>
        </div>
      )}
      {chica !== null && chica !== 0 && (
        <div className=" font-nunito grid grid-cols-3 justify-between items-center mb-3">
          <div className="text-lg font-semibold text-neutral-800">
            <h2>Chica</h2>
          </div>
          <div className="text-lg text-neutral-800 font-semibold">{<h2>$ {chica}</h2>}</div>
          <div className=" flex items-center justify-end bottom-0 right-0 w-auto  text-end gap-3 text-base">
            <div
              className={
                quantityZero("chica") ? "rounded-md w-7 h-7 grid content-center  shadow  bg-slate-50" : "invisible"
              }
            >
              <button
                type="button"
                className="text-red-500 text-3xl "
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
                -
              </button>
            </div>

            <span className="font-normal text-xl  h-6">{productQuantity("chica")}</span>
            <div className="rounded-md w-8 h-8 grid content-center p-0 shadow  bg-slate-50">
              <button
                type="button"
                className="text-sky-800 text-3xl"
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
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
