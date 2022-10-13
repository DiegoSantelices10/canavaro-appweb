import { getItemData, getPathsFromTitle } from "lib/items";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ProductLayout from '../../components/productLayout'
import Layout from '../../components/layout'



export default function Product({ productInfo: { data } }) {

  return (
            <div className='min-h-screen '>
                    {data.map(item => <ProductLayout key={item.id} data={item} />)}
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
