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
                className='block p-2 bg-slate-300 rounded-full opacity-80'
            >
                <MdKeyboardDoubleArrowLeft size={25} />
            </button>
            <button
                onClick={() => next()}
                className='block p-2 bg-slate-300 rounded-full opacity-80'

            >
                <MdKeyboardDoubleArrowRight size={25} />
            </button>
        </div>
    )
}
