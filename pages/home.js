import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getProducts } from "services/storeService"
import Navbar from 'components/navbar'
import Card from 'components/card'
import Layout from 'components/layout'



export default function Home( { products }) {

  const [renderProducts, setRenderProductos] = useState("Pizzas")
  
  const renderStore = (renderProductos) => {
    return products?.filter(data => data.categoria == renderProductos)
                                 .map( data =>  <Card key={data.id} data={data}/>)
  }


  return (
    <Layout>
    <div className='p-2'>
      <div className="flex justify-center items-center py-4">
        <div className='rounded-3xl border border-slate-200 text-sm p-0.5'>
          <button onClick={() => setRenderProductos("Pizzas")} className={renderProducts !== "Pizzas" ? "w-32 rounded-3xl font-medium" : "w-32 font-medium bg-gray-300 text-white rounded-3xl"}>Pizzas</button>
          <button onClick={() => setRenderProductos("Empanadas")} className={renderProducts !== "Empanadas" ? "w-32 rounded-3xl font-medium" : "w-32 font-medium bg-gray-300 text-white rounded-3xl"}>Empanadas</button>
          <button onClick={() => setRenderProductos("Promociones")} className={renderProducts !== "Promociones" ? "w-32 rounded-3xl font-medium" : "w-32 font-medium bg-gray-300 text-white rounded-3xl"}>Promociones</button>
        </div>
      </div>

        <div className=''>
          <h1 className='font-semibold text-lg'>{renderProducts}</h1>
          <hr className="pb-5"/>
          <div>
            {renderStore(renderProducts)}
          </div>
        </div>
      
    </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await getProducts()
  
  return {
    props: {
      products: res,
    }
  }
}