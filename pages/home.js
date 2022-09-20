import React, { useEffect, useState } from 'react'


import { getProducts } from "services/storeService"
import Card from 'components/card'
import Layout from 'components/layout'
import Image from 'next/image'


export default function Home({ products }) {

  const [renderProducts, setRenderProductos] = useState("pizzas")

  const renderStore =  (renderProductos) => {
   
return products[`${renderProductos}`]?.map(data => <Card key={data.id} data={data} />  )
  }


  return (
    <Layout>


      <div className="container p-3">
        <div className="flex overflow-x-auto space-x-8 ">
          <section className="flex-shrink-0 rounded-full ">
            <span><Image src="/images/logocanavaro.png" width={200} height={200} alt="" /></span>
            <span>John</span>
          </section>
          <section className="flex-shrink-0 rounded-full">
            <span><Image src="/images/logocanavaro.png" width={200} height={200} alt="" /></span>
            <span>John</span>
          </section>
          <section className="flex-shrink-0 rounded-full">
            <span><Image src="/images/logocanavaro.png" width={200} height={200} alt="" /></span>
            <span>John</span>
          </section>
          <section className="flex-shrink-0 rounded-full">
            <span><Image src="/images/logocanavaro.png" width={200} height={200} alt="" /></span>
            <span>John</span>
          </section>
        </div>
        <div className="flex justify-center items-center py-4 w-full">
          <div className='rounded-3xl border border-slate-200 text-base '>
            <button onClick={() => setRenderProductos("pizzas")} className={renderProducts !== "pizzas" ? "w-32 rounded-3xl font-medium" : "w-32 font-medium bg-gray-300 text-white rounded-3xl"}>Pizzas</button>
            <button onClick={() => setRenderProductos("empanadas")} className={renderProducts !== "empanadas" ? "w-32 rounded-3xl font-medium" : "w-32 font-medium bg-gray-300 text-white rounded-3xl"}>Empanadas</button>
            <button onClick={() => setRenderProductos("promociones")} className={renderProducts !== "promociones" ? "w-32 rounded-3xl font-medium" : "w-32 font-medium bg-gray-300 text-white rounded-3xl"}>Promociones</button>
          </div>
        </div>

        <div >
          <h1 className='font-semibold text-xl px-2 pt-5'>{renderProducts}</h1>
          <hr className="pb-5" />
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