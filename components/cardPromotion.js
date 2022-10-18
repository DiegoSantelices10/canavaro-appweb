import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { convertToPath } from 'lib/items'



export default function CardPromotion({ data: { nombre, descripcion, imagen, gustos } }) {
    return (
        <div className="shadow-md rounded-md ">
            <div className="relative bg-white  rounded-t-md w-60 h-32 ">
                <div className="w-full">
                    <Image src={imagen}
                        priority
                        layout="responsive"
                        width={220}
                        height={115}
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-t-md "
                        alt={nombre} />
                </div>
            </div>
            <div className="bg-white h-12 rounded-b-md px-2 pt-1">
              <Link href={`/products/${convertToPath(nombre)}`}>
                <a className='font-semibold text-sm text-gray-800'>{nombre}</a>
              </Link>

                <p className=' text-gray-400 text-xs '>{ gustos ? gustos : descripcion }</p>
            </div>
        </div>



    )
}
