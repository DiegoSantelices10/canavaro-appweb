import React from 'react'
import ButtonDownUp from './buttonDownUp'

export default function PizzaInfo({ data: { id, nombre, tamanio: { Gigante, Mediana, Chica }, categoria }, incrementCart, decrementCart }) {


    return (
        <>
            <div className="flex justify-between items-center">
                <div className="w-1/3 font-medium">
                    <h2>Gigante</h2>
                </div>
                <div className="w-1/3 font-medium text-center ">
                    {<h2>$ {Gigante.precio}</h2>}
                </div>
                <div className="font-roboto w-auto rounded-3xl border  px-3 text-end space-x-4 text-normal">
                    <button type="button"
                        onClick={() => decrementCart({ id, nombre, tamanio: 'gigante' , precio: Gigante.precio, categoria })}>-</button>
                    <span>0</span>
                    <button type="button"
                        onClick={() => incrementCart({ id, nombre, tamanio: 'gigante', precio: Gigante.precio, categoria })}>+</button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-1/3 font-medium">
                    <h2>Mediana</h2>
                </div>
                <div className="w-1/3 font-medium text-center ">
                    {<h2>$ {Mediana.precio}</h2>}

                </div>
                <div className="font-roboto w-auto rounded-3xl border  px-3 text-end space-x-4 text-normal">
                    <button type="button"
                        onClick={() => decrementCart({ id, nombre, tamanio: 'mediana' , precio: Mediana.precio, categoria })}>-</button>
                    <span>0</span>
                    <button type="button"
                        onClick={() => incrementCart({ id, nombre, tamanio: 'mediana' , precio: Mediana.precio, categoria })}>+</button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-1/3 font-medium">
                    <h2>Chica</h2>
                </div>
                <div className="w-1/3 font-medium text-center ">
                    {<h2>$ {Chica.precio}</h2>}
                </div>
                <div className="font-roboto w-auto rounded-3xl border  px-3 text-end space-x-4 text-normal">
                    <button type="button"
                        onClick={() => decrementCart({ id, nombre, tamanio: 'chica' , precio: Chica.precio, categoria })}>-</button>
                    <span>0</span>
                    <button type="button"
                        onClick={() => incrementCart({ id, nombre, tamanio: 'chica' , precio: Chica.precio, categoria })}>+</button>
                </div>
            </div>

        </>
    )
}
