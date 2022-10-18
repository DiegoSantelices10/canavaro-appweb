import React from 'react'
import ButtonDownUp from './buttonDownUp'

export default function PizzaInfo({ data }) {
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="w-1/3 font-medium">
                    <h2>Gigante</h2>
                </div>
                <div className="w-1/3 font-medium text-center ">
                    {<h2>$ {data.Gigante.precio}</h2>}
                </div>
                <ButtonDownUp/>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-1/3 font-medium">
                    <h2>Mediana</h2>
                </div>
                <div className="w-1/3 font-medium text-center ">
                    {<h2>$ {data.Mediana.precio}</h2>}

                </div>
                <ButtonDownUp/>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-1/3 font-medium">
                    <h2>Chica</h2>
                </div>
                <div className="w-1/3 font-medium text-center ">
                    {<h2>$ {data.Chica.precio}</h2>}
                </div>
                <ButtonDownUp/>
            </div>

        </>
    )
}
