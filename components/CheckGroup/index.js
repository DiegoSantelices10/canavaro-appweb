/* eslint-disable react/prop-types */
import React from 'react'

const CheckGroup = (props) => {
    const {
        barra,
        promoBarra
    } = props;

    return (
        <div className="rounded-md mx-auto flex flex-col items-center justify-center lg:hidden mt-4">
            {barra?.map(item => (
                <div
                    key={item._id}
                    className="mt-2 w-1/2 flex justify-between items-center "
                >
                    <h1 className=" font-montserrat">
                        {item.nombre}
                    </h1>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            id={item._id}
                            type="checkbox"
                            className="sr-only peer"
                            checked={item.available}
                            onChange={() => promoBarra(item._id, item.available)}
                        />
                        <div className="w-9 h-5 bg-gray-400 peer-focus:outline-none peer-focus:ring-0 
                                    rounded-full 
                                    dark:bg-gray-200 peer-checked:after:translate-x-full 
                                    after:content-[''] after:absolute 
                                    after:top-[2px] after:left-[2px] after:bg-white   
                                    after:rounded-full after:h-4 after:w-4 after:transition-all 
                                    dark:border-gray-600 peer-checked:bg-red-600 "></div>
                    </label>

                </div>
            ))}
        </div>
    )
}

export default CheckGroup;