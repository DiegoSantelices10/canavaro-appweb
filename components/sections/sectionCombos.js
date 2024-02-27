
export default function sectionCombos({ products }) {
  return (
    <div className=" w-full  bg-zinc-900">
      <div className="relative p-2 h-full  
          rounded-lg w-full lg:w-4/5 mx-auto 
					gap-5 content-center pb-6 ">
        <h1 className="relative font-poppins  w-full 
              text-center text-gray-200  text-2xl lg:text-3xl 
              font-semibold ">
          Nuestros Combos
        </h1>
        <hr className="py-2" />
        <div className="h-full w-full mx-auto text-white overflow-y-auto">
          <div className="flex flex-col gap-y-5 mt-4">
            {products
              ?.filter(item => item?.nombre.includes("Combo"))
              ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
              .map(producto => {
                return (
                  <div key={producto._id}>
                    <div className="text-center">
                      <p
                        className="text-2xl font-poppins text-white text-center font-medium "
                      >
                        {producto.nombre}
                      </p>
                      <p className="text-sm  md:text-sm lg:text-base font-poppins text-zinc-300 px-3">{producto.descripcion}</p>
                      <p className="text-2xl font-poppins text-white font-light pt-2">${producto.precio}</p>
                    </div>
                    <hr className="w-6/12 mx-auto mt-5" />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
