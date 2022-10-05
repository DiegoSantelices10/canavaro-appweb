import { getItemData, getPathsFromTitle } from "lib/items";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ProductLayout from '../../components/productLayout'
import Layout from '../../components/layout'



export default function Product({ productInfo: { data } }) {

  return (
    <div className='bg-slate-50 '>
          <div className="w-full md:w-3/5 lg:w-2/5  mx-auto bg-white">
              <div>
                {data.map(item => <ProductLayout key={item.id} data={item} />)}
              </div>
              <div className="fixed bottom-0 w-full lg:w-2/5">
                  <button type="button"
                          className="w-full md:w-2/5 lg:w-2/5 bg-cyan-600 p-4  rounded-t-2xl font-poppins mx-auto hover:bg-cyan-500 hover:-translate-y-1 transition-all duration-500 
                                   text-white font-semibold ">Ver Carrito</button>
              </div>
          </div>
    </div>

    
  )
  
}

export async function getStaticPaths() {
  const res = await getPathsFromTitle()
  const paths = res[0].concat(res[1], res[2])
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const obj = await getItemData(id);
  const productInfo = Object.assign({}, obj)
  return {
    props: {
      productInfo,
    },
  };
}
