import React from 'react'

export default function PizzaInfo({ data }) {


    return (
        <>
            <div className="flex justify-between items-center">
                <div className="w-1/3 font-medium">
                    <h2>Gigante</h2>
                </div>
                <div className="w-1/3 font-medium text-center ">
                    {<h2>$ {data.Gigante.precio}</h2> }
                </div>
                <div className="w-1/3 text-center flex flex-row gap-5 justify-end">
                    <button type="button" className="">-</button>
                    <span>0</span>
                    <button type="button" className="">+</button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-1/3 font-medium">
                    <h2>Mediana</h2>
                </div>
                <div className="w-1/3 font-medium text-center ">
                {<h2>$ {data.Mediana.precio}</h2> }
                  
                </div>
                <div className="w-1/3 text-center flex flex-row gap-5 justify-end">
                    <button type="button" className="">-</button>
                    <span>0</span>
                    <button type="button" className="">+</button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="w-1/3 font-medium">
                    <h2>Chica</h2>
                </div>
                <div className="w-1/3 font-medium text-center ">
                {<h2>$ {data.Chica.precio}</h2> }
                </div>
                <div className="w-1/3 text-center flex flex-row gap-5 justify-end">
                    <button type="button" className="">-</button>
                    <span>0</span>
                    <button type="button" className="">+</button>
                </div>
            </div>

        </>
    )
}
