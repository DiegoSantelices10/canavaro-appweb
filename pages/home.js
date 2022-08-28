import React, { useEffect, useState } from 'react'
import Navbar from 'components/Navbar'
import { useRouter } from 'next/router'
import Card from 'components/Card'

export default function Home() {

  const [productos, setProductos] = useState([])
  const [renderProductos, setRenderProductos] = useState("Pizzas")
  


  useEffect(() => {
    fetch("./datosJSON/datos.json")
      .then(res => res.json())
      .then(datos => setProductos(datos))
  }, [])



   const renderProducts = (renderProductos) => {
  return productos[renderProductos]?.map(data => <Card key={data.id} data={data}/> )
   }



  return (
    <div className='bg-slate-50'>
      <Navbar />
      <div className="flex justify-center items-center mt-5">
        <div className='p-2 rounded-3xl border border-slate-200 text-sm'>
          <button onClick={() => setRenderProductos("Pizzas")} className={renderProductos !== "Pizzas" ? "w-32 rounded-3xl" : "w-32 font-medium bg-gray-400 text-white rounded-3xl"}>Pizzas</button>
          <button onClick={() => setRenderProductos("Empanadas")} className={renderProductos !== "Empanadas" ? "w-32 rounded-3xl" : "w-32 font-medium bg-gray-400 text-white rounded-3xl"}>Empanadas</button>
          <button onClick={() => setRenderProductos("")} className='w-32  rounded-3xl'>Promociones</button>
        </div>
      </div>

      <div className='p-2'>
        <div className='p-2'>
          <h1 className='font-semibold text-lg'>{renderProductos}</h1>
          <hr />
          <div>
            {renderProducts(renderProductos)}
          </div>
        </div>
      
      </div>
    </div>
  )
}
