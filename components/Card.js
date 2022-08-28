import React from 'react'
import Image from 'next/image'

export default function Card({data: {nombre, imagen, descripcion}}) {
  return (
        <div  className="rounded-md mb-2 p-2 shadow-sm bg-white">
          <div className='flex justify-between items-center gap-x-2'>
            <Image
              className='rounded-md'
              unoptimized
              src={imagen} width={110} height={110} />
            <div className='w-full self-start'>
              <h1 className='font-bold'>{nombre}</h1>
              <p className='font-normal text-gray-400 text-xs'>{descripcion}</p>
            </div>
          </div>
        </div>
  )
}