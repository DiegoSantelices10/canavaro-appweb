import React, { useState, useEffect } from 'react'
import { getProducts } from "services/fetchData"

import CardPromotion from 'components/cardPromotion'
import Card from 'components/card'
import Layout from 'components/layout'
import { useSelector, useDispatch } from 'react-redux'
import { addProduct } from 'store/reducers/productSlice'


export default function Home({ products }) {
    const [renderProducts, setRenderProductos] = useState("pizzas")
    const { direccion } = useSelector(state => state.user)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(addProduct(products))
    })



    const renderStore =  (renderProductos) => {
    return products[`${renderProductos}`]?.map(data => <Card key={data.id} data={data} />  )
  }

    const renderPromotions = () => {
    return products[`promociones`]?.map(data => <CardPromotion key={data.id} data={data} />)
  }


  return (
    <Layout title={direccion}>
      <div className="container p-4 pt-7 mx-auto w-full bg-zinc-50 rounded-t-3xl">
          <h1 className="text-sm font-bold text-gray-800">Promociones</h1>
          <hr className="pb-5" />
        <div className="flex overflow-x-scroll flexp   space-x-6 w-full pt-1 pb-3 pl-1">
        <style jsx>
          {`
           .flexp::-webkit-scrollbar-thumb { 
            background: #E4E4E4;    
            border-radius: 20px;  
            }
           
            .flexp::-webkit-scrollbar {
              height: 4px;
              
            }
          `}</style>
         {renderPromotions()}
        </div>
        <div className="flex justify-center items-center w-full gap-3 py-6 text-sm f">
            <button onClick={() => setRenderProductos("pizzas")} className={renderProducts !== "pizzas" ? "w-32 rounded-3xl font-medium" : "w-32 font-medium bg-gray-300 text-white rounded-3xl"}>Pizzas</button>
            <button onClick={() => setRenderProductos("empanadas")} className={renderProducts !== "empanadas" ? "w-32 rounded-3xl font-medium" : "w-32 font-medium bg-gray-300 text-white rounded-3xl"}>Empanadas</button>
            <button onClick={() => setRenderProductos("promociones")} className={renderProducts !== "promociones" ? "w-32 rounded-3xl font-medium" : "w-32 font-medium bg-gray-300 text-white rounded-3xl"}>Promociones</button>
        </div>

        <div>
          <h1 className='text-sm font-bold text-gray-800'>{renderProducts[0].toUpperCase() + renderProducts.substring(1) }</h1>
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