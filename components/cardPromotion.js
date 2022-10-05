import React from 'react'
import Image from 'next/image'

export default function CardPromotion({ data: { nombre, descripcion, imagen } }) {
    return (
        <div className="shadow-md rounded-md">
            <div className="relative bg-white  rounded-t-md w-60 h-32 ">
                <div className="overflow-hidden w-full">
                    <Image src={imagen}
                        unoptimized
                        layout="responsive"
                        width={220}
                        height={115}
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-t-md "
                        alt={nombre} />
                </div>
            </div>
            <div className="bg-white h-16 rounded-b-md px-2 pt-1">
                <h1 className='font-semibold text-sm text-gray-800'>{nombre} </h1>
                <p className=' text-gray-400 text-xs '>{descripcion}</p>
            </div>
        </div>



    )
}
