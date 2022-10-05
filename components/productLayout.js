import React from 'react'
import Image from 'next/image'
import PizzaInfo from './pizzaInfo'
import { FiChevronsLeft } from "react-icons/fi";

export default function ProductLayout({ data: { id, nombre, descripcion, categoria, imagen, tamanio, precio } }) {
  return (
    <>
      <div className=" h-screen font-poppins">
        <div className="relative overflow-hidden h-80 w-full mx-auto  border-none bg-slate-100">
          <div className=" overflow-hidden w-auto">
            <Image src={imagen}
                   layout="responsive"
                   width={200}
                   height={200}
                   objectFit="cover"
                   objectPosition="center"
                   alt={nombre} />
            <FiChevronsLeft className='text-white absolute top-4 left-4' size={45} />
          </div>
          <div className='w-screen h-10 pl-5 pt-3 bg-white rounded-t-2xl bottom-0 absolute'>
            <h1 className="font-bold text-lg text-gray-800">{nombre}</h1>
          </div>
        </div>

        <div className="w-full px-5">
          <p className="font-normal text-sm text-gray-400">{descripcion}</p>
          <div className="text-sm font-semibold pt-5">
            {categoria == "pizzas"
              ? (<PizzaInfo data={tamanio} />)
              : (
                <>
                  <h2>
                    {nombre} <span> ${precio}</span>
                  </h2>
                </>)
            }
          </div>
          <div className="pt-10 font-normal text-md">

            <h1>Comentarios</h1>
            <textarea className="border rounded-md w-full p-3" />
          </div>
        </div>
      </div>
    </>

  )
}
