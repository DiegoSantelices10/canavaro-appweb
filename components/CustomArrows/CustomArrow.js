import React from 'react'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";


// eslint-disable-next-line react/prop-types
export default function CustomArrow({ next, previous }) {
    return (
        <div
            className='carousel-buttom-group absolute mb-4 gap-4 flex justify-between px-5 items-center w-full'
        >
            <button
                onClick={() => previous()}
                className='block p-2 '
            >
                <MdKeyboardDoubleArrowLeft size={35} className='text-white' />
            </button>
            <button
                onClick={() => next()}
                className='block p-2 '

            >
                <MdKeyboardDoubleArrowRight size={35} className='text-white' />
            </button>
        </div>
    )
}
