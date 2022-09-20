import React from 'react'
import Image from 'next/image'


export default function ProductLayout({data: {id, nombre, descripcion, categoria, imagen, tamanio, precio} }) {
  return (
    <div className="relative h-screen">
       <div className="w-full text-center block ">
        <Image
          className="rounded-md mx-auto "
          src={imagen}
          width={200}
          height={200}
          alt={nombre}
        />
      </div>


      <div className="rounded-t-xl w-full h-max">
        <div className=" bg-white rounded-xl w-full p-6">
          <h1 className="font-medium text-2xl">{nombre}</h1>
          <p className="font-normal text-sm text-gray-600">{descripcion}</p>
          <div className="text-sm font-semibold pt-5">
            {categoria == "pizzas" ? (
              <div className="flex flex-col gap-y-3">
                <div className="flex justify-between items-center">
                  <div className="w-1/2">
                    <h2>Tamaño Gigante</h2>
                  </div>
                  <div className="w-1/4 text-center ">
                    <h2>${tamanio.Gigante["precio"]}</h2>
                  </div>
                  <div className="w-1/4 text-center flex flex-row gap-5 justify-end">
                    <button type="button" className="">-</button>
                    <span>1</span>
                    <button type="button" className="">+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-1/2">
                    <h2>Tamaño Mediana</h2>
                  </div>
                  <div className="w-1/4 text-center">
                    <h2>${tamanio.Mediana["precio"]}</h2>
                  </div>
                  <div className="w-1/4 text-center flex flex-row gap-5 justify-end">
                    <button type="button" className="">-</button>
                    <span>1</span>
                    <button type="button" className="">+</button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-1/2">
                    <h2>Tamaño Chica</h2>
                  </div>
                  <div className="w-1/4 text-center">
                    <h2>${tamanio.Chica["precio"]}</h2>
                  </div>
                  <div className="w-1/4  flex flex-row gap-5 justify-end">
                    <button type="button" className="">-</button>
                    <span>1</span>
                    <button type="button" className="">+</button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2>
                  {nombre} <span> ${precio}</span>
                </h2>
              </>)
            }
          </div>

          <div className="pt-10 font-normal text-md">
            <h1>Comentarios</h1>
            <input type="text" className="border rounded-md w-full" />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-white  rounded-t-xl h-20 flex justify-center items-center">
        <button type="button"
          className="w-full bg-cyan-600 py-2 rounded-md mx-auto hover:bg-cyan-500 
                         hover:-translate-y-1 transition-all duration-500 text-white 
                         font-semibold mb-2">Ver Carrito
        </button>
      </div>
    </div>
  )
}
