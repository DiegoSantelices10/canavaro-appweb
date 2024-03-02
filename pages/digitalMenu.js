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
                        className="flex justify-between items-center h-full  gap-x-2 p-2 py-3">
                        <Image
                            className="rounded-xl"
                            src={data?.imagen?.url || "/images/producto-sin-imagen.png"}
                            width={160}
                            height={160}
                            objectFit='cover'
                            objectPosition='center'
                            alt={data.nombre}
                        />
                        <div className="relative w-full h-full flex flex-col justify-between">
                            <div>
                                <h1 className="font-medium font-poppins text-base text-white">{data.nombre}</h1>
                                <p className="text-gray-300 font-nunito font-light text-sm">{data.descripcion}</p>
                            </div>
                            {data.categoria === 'pizzas' ? (
                                <div className='flex font-poppins justify-center gap-5 mt-2'>

                                    {data.precioPizza.gigante && (
                                        <div>
                                            <p className="text-xs font-normal text-gray-300 px-1 text-center ">Gigante</p>
                                            <p className="text-lg font-poppins font-normal   px-1 text-white text-center">${data.precioPizza.gigante}</p>
                                        </div>
                                    )}
                                    {data.precioPizza.mediana && (
                                        <div>
                                            <p className="text-xs font-normal text-gray-300 px-1 text-center ">Mediana</p>
                                            <p className="text-lg font-poppins font-normal   px-1 text-center text-white ">${data.precioPizza.mediana}</p>
                                        </div>
                                    )}
                                    {data.precioPizza.chica && (
                                        <div>
                                            <p className="text-xs font-normal text-gray-300 px-1 text-center ">Chica</p>
                                            <p className="text-lg font-poppins font-normal   px-1 text-center text-white">${data.precioPizza.chica}</p>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                <div>
                                    <p className="text-2xl whitespace-normal font-poppins font-normal text-white">${data.precio}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className='text-white  w-full' />
                </div>
            ));
    };

    return (
        <div className='bg-zinc-900'>
            <Header />
            <hr className='my-3' />
            <div className=' px-8 flex flex-wrap justify-center md:justify-center my-3 gap-2 gap-x-6 font-medium text-lg'>

                <button
                    onClick={() => setRenderProductos('empanadas')}
                    className={renderProductos === 'empanadas' ? 'bg-white rounded-3xl p-1 px-4' : 'text-white bg-transparent p-1 px-4'}>

                    EMPANADAS & CANASTITAS
                </button>
                <button
                    onClick={() => setRenderProductos('promociones')}
                    className={renderProductos === 'promociones' ? 'bg-white rounded-3xl p-1 px-4' : 'text-white bg-transparent p-1 px-4'}>

                    COMBOS
                </button>
                <button
                    onClick={() => setRenderProductos('pizzas')}
                    className={renderProductos === 'pizzas' ? 'bg-white rounded-3xl p-1 px-4' : 'text-white bg-transparent p-1 px-4'}>
                    PIZZAS
                </button>
                <button
                    onClick={() => setRenderProductos('bebidas')}
                    className={renderProductos === 'bebidas' ? 'bg-white rounded-3xl p-1 px-4' : 'text-white bg-transparent p-1 px-4'}>

                    BEBIDAS
                </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
                {renderStore(renderProductos)}
            </div>
        </div>

    )
}



export default DigitalMenu;
