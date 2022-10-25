import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PizzaInfo from "./pizzaInfo";
import { FiShoppingCart, FiChevronsLeft } from "react-icons/fi";
import { getProducts } from "services/fetchData";

import { addProductPizza, 
  addProductEmpanada, 
  decrementProduct, 
  calculateSubTotal, 
  calculateTotalQuantity 
} from "store/reducers/orderSlice";

  import { useDispatch, useSelector } from "react-redux";


export default function ProductLayout({ data, data: { id, nombre, descripcion, categoria, imagen, tamanio, precio } }) {
  const { products } = useSelector(state => state.product)
  const { orderList } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
dispatch(calculateSubTotal())
dispatch(calculateTotalQuantity())
  }, [orderList, dispatch])

  const productQuantity = (id) => {
    const pre = orderList.find(item => item.id == id)
    return pre?.cantidad ? pre.cantidad : 0
  }

  const incrementCartEmpanada = (data) => {
    dispatch(addProductEmpanada(data))
  }
  const incrementCartPizza = (data) => {
    dispatch(addProductPizza(data));
  };

  const decrementCart = (data) => {
    dispatch(decrementProduct(data));
  };
  const removeFromCart = (data) => {
    dispatch(removeProduct(data));
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

      <div className="grid grid-col-3 bg-slate-100 content-between pt-1   w-full sm:w-1/2 md:w-2/5  lg:w-auto  h-auto   height-pro">
        <style jsx>{`
          .height-pro {
            height: -webkit-fill-available;
          }
        `}</style>

        <div className="flex flex-col tracking-wide">
          <div className="w-full bg-white p-3 py-5 ">
            <h1 className="font-bold text-base text-gray-800">{nombre}</h1>
            <p className="font-roboto font-normal text-sm py-1 text-gray-400">{descripcion}</p>
            {categoria == "promociones" ? <p className="font-roboto font-normal  text-sm text-gray-400">$ {precio}</p> : ""}
          </div>

          <div className="text-sm font-semibold text-left bg-white p-3 my-1">
            {categoria == "pizzas" ? (

              <div className=" flex flex-col gap-y-2 pt-5 justify-evenly">
                <PizzaInfo data={data} incrementCart={incrementCartPizza} decrementCart={decrementCart} cart={orderList} />
              </div>

            ) : categoria == "empanadas" ? (

              <div className="flex gap-y-2 py-2 justify-between items-center">
                <div className="w-auto">
                  <h2 className="font-semibold text-normal text-gray-800">Empanada <span className="text-xs font-normal font-roboto text-gray-400">x unidad</span></h2>
                </div>
                <div className="w-1/3 font-medium text-base pl-1">
                  {<h2>$ {precio}</h2>}
                </div>
                <div className="w-auto rounded-3xl border  px-3 text-end space-x-4 text-base">
                  <button type="button"
                    onClick={() => decrementCart({id, nombre, categoria, tamanio, precio })}>-</button>
                  <span>{productQuantity(id)}</span>
                  <button type="button"
                    onClick={() => incrementCartEmpanada({id, nombre, categoria, tamanio, precio })}>+</button>
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

        <div className="font-normal text-left text-sm pb-24 pt-5 bg-white p-3 max-h-full">
          <h1 className="pb-1">Comentarios</h1>
          <input type="text" className="border border-slate-500 rounded-md w-full p-2" />
        </div>
      </div>
      <div className='w-full fixed bottom-0 p-4 border-t-2 bg-slate-50 lg:w-1/3'>
        <Link href="/cart">
          <a className="flex justify-center gap-3 w-full bg-red-600 p-3  
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