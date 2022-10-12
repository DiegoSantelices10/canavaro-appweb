import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PizzaInfo from './pizzaInfo'
import { FiShoppingCart } from "react-icons/fi";

export default function ProductLayout({ data: { id, nombre, descripcion, categoria, imagen, tamanio, precio } }) {
  return (
    <div className="font-poppins min-h-screen rounded-md bg-white mx-auto w-full sm:w-1/2 md:w-2/5 lg:w-1/3">

      <div className="relative overflow-hidden h-auto  w-full mx-auto  border-none">
        <div className=" overflow-hidden w-auto">
          <Image src={imagen}
            layout="responsive"
            width={100}
            height={70}
            objectFit="cover"
            objectPosition="center"
            alt={nombre} />
        </div>
      </div>

      <div className="absolute grid grid-col-3 content-between p-3  w-full sm:w-1/2 md:w-2/5  lg:w-1/3  h-auto  text-center  height-pro">
        <style jsx>{`
              .height-pro {
                  height: -webkit-fill-available
              }`}</style>

        <div className='flex flex-col gap-5'>
          <div>
            <h1 className="font-semibold text-base text-gray-800">{nombre}</h1>
            <p className="font-normal text-xs text-gray-400">{descripcion}</p>
          </div>
          
          <div className="text-sm font-semibold text-left">
            {categoria == "pizzas"
              ? (<PizzaInfo data={tamanio} />)
              : (
                <>
                  <h2 >Empanada de {nombre} <span> ${precio}</span> </h2>
                </>)
            }
          </div>

        </div>

        <div className='space-y-10'>
          <div className="font-normal text-left text-sm">
            <h1>Comentarios</h1>
            <input type="text" className="border rounded-md w-full p-2" />
          </div>
          <div>
          <button type="button"
            className=" flex justify-center gap-3 w-full bg-cyan-600 p-3  rounded-xl font-poppins mx-auto hover:bg-cyan-500 hover:-translate-y-1 transition-all duration-500 
                                   text-white text-base font-semibold ">Ver Carrito<FiShoppingCart size={23} /></button>
          </div>
          
        </div>

      </div>
    </div>
  )
}
