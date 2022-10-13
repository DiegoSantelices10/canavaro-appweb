import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PizzaInfo from './pizzaInfo'
import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";

import { addProductList, 
          removeProductList, 
          decreaseProductList, 
          calculateSubTotal, 
          calculateTotalQuantity } from 'store/reducers/orderSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ProductLayout({data,  data: { id, nombre, descripcion, categoria, imagen, tamanio, precio } }) {
  const dispatch = useDispatch()


  const increaseCart = (data) => {
      dispatch(addProductList(data))
  }

  const decreaseCart = (data) => {
      dispatch(decreaseProductList(data))
  }

  const removeFromCart = (data) => {
    dispatch(removeProductList(data))
  }

  return (
    <div className="font-poppins min-h-screen  mx-auto w-full  sm:w-1/2 md:w-2/5 lg:w-1/3">
      <div className="relative overflow-hidden h-auto  mx-auto  rounded-b-3xl">
        <div className=" overflow-hidden w-auto">
          <Image src={imagen}
            layout="responsive"
            width={100}
            height={70}
            objectFit="cover"
            objectPosition="center"
            alt={nombre} />
          <Link href="/home" passHref >
            <a>
              <FiChevronsLeft className='absolute text-white top-4 left-4' size={30} />
            </a>
          </Link>
        </div>
      </div>

      <div className="absolute grid grid-col-3 bg-white content-between pt-1 px-4  w-full sm:w-1/2 md:w-2/5  lg:w-1/3  h-auto  text-center  height-pro">
        <style jsx>{`
              .height-pro {
                  height: -webkit-fill-available
              }`}</style>

        <div className='flex flex-col'>
          <div>
            <h1 className="font-semibold text-base text-gray-800">{nombre}</h1>
            <p className="font-normal text-xs text-gray-400">{descripcion}</p>
          </div>

          <div className="text-sm font-semibold text-left">
            {categoria == "pizzas"
              ? (
                <div className="flex flex-col gap-y-2 pt-5 justify-between">
                  <PizzaInfo data={tamanio} />
                </div>
              ) : (
                <div className='flex gap-y-2 pt-5 justify-between'>
                    <div className="w-1/3 font-medium">
                      <h2>Empanada</h2>
                    </div>
                    <div className="w-1/3 font-medium text-center ">
                      {<h2>$ {precio}</h2>}
                    </div>
                    <div className="w-1/3 text-center flex flex-row gap-5 justify-end">
                      <button type="button" 
                              onClick={() => decreaseCart(data)} className="">-</button>

                        <span>0</span>
                      
                      <button type="button" 
                              onClick={() => increaseCart(data)}>+</button>
                    </div>
                  </div>

              )
            }
          </div>

        </div>

        <div className="my-5">

          <div className="font-normal text-left text-sm">
            <h1>Comentarios</h1>
            <input type="text" className="border rounded-md w-full p-2" />
          </div>
          <div className='my-5'>
            <button type="button"
              className=" flex justify-center gap-3 w-full bg-cyan-600 p-3  rounded-xl font-poppins mx-auto hover:bg-cyan-500 hover:-translate-y-1 transition-all duration-500 
                                   text-white text-base font-semibold ">Ver Carrito<FiShoppingCart size={23} /></button>
          </div>

        </div>

      </div>
    </div>
  )
}
