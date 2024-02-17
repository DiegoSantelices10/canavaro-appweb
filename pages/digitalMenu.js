import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Header from 'components/header';

import 'react-multi-carousel/lib/styles.css';
import { setProductData } from 'store/reducers/productSlice';
import Image from 'next/image'



// eslint-disable-next-line react/prop-types
function DigitalMenu() {
    const [renderProductos, setRenderProductos] = useState('promociones')
    const { products } = useSelector(state => state.product);
    const dispatch = useDispatch()

    useEffect(() => {
        if (products?.length <= 0) {
            const res = JSON.parse(localStorage.getItem("productos"));
            dispatch(setProductData(res));
        }

    }, []);

    const renderStore = renderProductos => {
        return products
            ?.filter(item => item.categoria === renderProductos && item.available === true)
            ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
            .map(data => (
                <div
                    key={data._id}
                >
                    <div
                        className="flex justify-between items-center gap-x-2 p-2">
                        <Image
                            className="rounded-xl"
                            src={data.imagen?.url || "/images/canavaro-image.png"}
                            width={140}
                            height={140}
                            alt={data.nombre}
                        />
                        <div className="relative w-full h-24 self-start">
                            <h1 className="font-semibold font-poppins text-sm text-white">{data.nombre}</h1>
                            <p className="text-gray-400 text-xs">{data.descripcion}</p>
                            {data.categoria === 'pizzas' ? (
                                <div className='flex gap-4'>
                                    <p className="text-gray-400 text-xs py-1"> G ${data.precioPizza.gigante}</p>
                                    <p className="text-gray-400 text-xs py-1"> M ${data.precioPizza.mediana}</p>
                                    <p className="text-gray-400 text-xs py-1"> CH ${data.precioPizza.chica}</p>

                                </div>
                            ) : (
                                <p className="text-gray-400 text-xs py-1">$ {data.precio}</p>
                            )}
                        </div>
                    </div>
                    <hr className='text-white  w-full' />
                </div>
            ));
    };

    return (
        <div className='bg-zinc-900 min-h-screen'>
            <Header />
            <hr className='my-3' />

            <div className=' flex flex-wrap justify-around md:justify-center md:gap-4 my-3 gap-y-2 font-medium'>
                <button
                    onClick={() => setRenderProductos('promociones')}
                    className={renderProductos === 'promociones' ? 'bg-white rounded p-1' : 'text-white bg-transparent'}>

                    COMBOS
                </button>
                <button
                    onClick={() => setRenderProductos('pizzas')}
                    className={renderProductos === 'pizzas' ? 'bg-white rounded p-1' : 'text-white bg-transparent'}>
                    PIZZAS
                </button>
                <button
                    onClick={() => setRenderProductos('empanadas')}
                    className={renderProductos === 'empanadas' ? 'bg-white rounded p-1' : 'text-white bg-transparent'}>

                    EMPANADAS & CANASTITAS
                </button>
            </div>

            {renderStore(renderProductos)}
        </div>
    )
}



export default DigitalMenu;
