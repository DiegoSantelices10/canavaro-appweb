import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PizzaInfo from "./pizzaInfo";
import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";
import { getProducts } from "services/fetchData";

import { addProductList, removeProductList, decreaseProductList } from "store/reducers/orderSlice";
import { useDispatch, useSelector } from "react-redux";


export default function ProductLayout({ data, data: { id, nombre, descripcion, categoria, imagen, tamanio, precio } }) {
  const { products } = useSelector(state => state.product)
  const { orderList } = useSelector(state => state.order)
  const dispatch = useDispatch()

  const product = orderList.find((item) => item.id == id)


  const productQuantity = (id) => {
    const pre = orderList.find(item => item.id == id)
    return pre?.cantidad ? pre.cantidad : 0

  }

  const increaseCart = (data) => {
    dispatch(addProductList(data));
  };

  const decreaseCart = (data) => {
    dispatch(decreaseProductList(data));
  };
  const removeFromCart = (data) => {
    dispatch(removeProductList(data));
  };

  return (
    <div className="font-poppins min-h-screen  mx-auto w-full  sm:w-1/2 md:w-2/5 lg:w-1/3">
      <div className="relative overflow-hidden h-auto  mx-auto  ">
        <div className=" overflow-hidden w-auto">
          <Image
            src={imagen}
            layout="responsive"
            width={100}
            height={40}
            objectFit="cover"
            objectPosition="center"
            alt={nombre}
          />
          <Link href="/home" passHref>
            <a>
              <FiChevronsLeft
                className="absolute text-slate-800 bg-slate-50 rounded-full p-1 top-4 left-4"
                size={30}
              />
            </a>
          </Link>
        </div>
      </div>

      <div className="grid grid-col-3 bg-slate-100 content-between pt-1   w-full sm:w-1/2 md:w-2/5  lg:w-1/3  h-auto   height-pro">
        <style jsx>{`
          .height-pro {
            height: -webkit-fill-available;
          }
        `}</style>

        <div className="flex flex-col ">
          <div className="w-full bg-slate-50 p-3  ">
            <h1 className="font-semibold text-base text-gray-800">{nombre}</h1>
            <p className="font-roboto font-normal text-sm py-1 text-gray-300">{descripcion}</p>
            {categoria == "promociones" ? <p className="font-roboto font-normal  text-sm text-gray-400">$ {precio}</p> : ""}
          </div>

          <div className="text-sm font-semibold text-left bg-slate-50 p-3 my-2">
            {categoria == "pizzas" ? (

              <div className=" flex flex-col gap-y-2 pt-5 justify-evenly">
                <PizzaInfo data={tamanio} />
              </div>

            ) : categoria == "empanadas" ? (

              <div className="flex gap-y-2 pt-5 justify-between items-center">
                <div className="w-auto font-medium text-base">
                  <h2>Empanada <span className="text-xs font-light text-gray-500">x unidad</span></h2>
                </div>
                <div className="w-1/3 font-medium text-base pl-1">
                  {<h2>$ {precio}</h2>}
                </div>
                <div className="w-auto rounded-3xl border  px-3 text-end space-x-4 text-base">
                  <button type="button"
                    onClick={() => decreaseCart(data)}>-</button>
                  <span>{productQuantity(id)}</span>
                  <button type="button"
                    onClick={() => increaseCart(data)}>+</button>
                </div>
              </div>

            ) : (

              <div>
                {products['empanadas']?.map((item) => {
                  return (
                    <div key={item.id} className="flex justify-between py-2">
                      <div className="w-1/2 font-medium">
                        <h2>{item.nombre}</h2>
                      </div>
                      <div className="w-auto rounded-3xl border  px-3 text-end space-x-4 text-base">
                        <button type="button"
                          onClick={() => decreaseCart(item)}>-</button>
                        <span>{productQuantity(item.id)}</span>
                        <button type="button"
                          onClick={() => increaseCart(item)}>+</button>
                      </div>
                    </div>)
                })}
              </div>
            )}
          </div>
        </div>

        <div className="font-normal text-left text-sm pb-24 pt-5 bg-slate-50 p-3 max-h-full">
          <h1>Comentarios</h1>
          <input type="text" className="border rounded-md w-full p-2" />
        </div>
      </div>
      <div className='w-full fixed bottom-0 p-4 border-t-2 bg-slate-50'>
        <Link href="/cart">
          <a className="flex justify-center gap-3 w-4/5 bg-red-600 p-3  
                      rounded-3xl font-poppins mx-auto hover:bg-red-500 hover:-translate-y-1 
                      transition-all duration-500 text-white text-base font-semibold ">
            Ver Carrito<FiShoppingCart size={23} /> </a>
        </Link>

      </div>

    </div>
  );
}


export async function getServerSideProps() {
  const res = await getProducts()


  return {
    props: {
      products: res,
    }
  }
}