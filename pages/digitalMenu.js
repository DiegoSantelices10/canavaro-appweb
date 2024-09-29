import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";


import 'react-multi-carousel/lib/styles.css';
import { setProductData } from 'store/reducers/productSlice';
import Image from 'next/image'
import { formatearNumero } from 'libs/items';



// eslint-disable-next-line react/prop-types
function DigitalMenu() {
    const [renderProductos, setRenderProductos] = useState('promociones')
    const { deliveryButton } = useSelector(state => state.setting);

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
                        className="flex bg-white p-1 rounded justify-between items-center h-full  gap-x-2">
                        <Image
                            className="rounded-[4px]"
                            src={data?.imagen?.url || "/images/producto-sin-imagen.png"}
                            width={160}
                            height={160}
                            objectFit='cover'
                            objectPosition='center'
                            alt={data.nombre}
                        />
                        <div className="relative w-full h-full flex flex-col justify-between">
                            <div>
                                <h1 className="font-semibold font-montserrat text-left text-base ">{data.nombre}</h1>
                                <p className="text-gray-500 font-montserrat text-left  text-xs">{data.descripcion}</p>
                            </div>
                            {data.categoria === 'pizzas' ? (
                                <div className='flex font-montserrat justify-center gap-5 mt-2'>

                                    {data.precioPizza.gigante && (
                                        <div>
                                            <p className="text-xs font-medium  px-1 text-center ">Gigante</p>
                                            <p className="text-lg font-montserrat tracking-wider font-semibold   px-1  text-center">{formatearNumero(data.precioPizza.gigante)}</p>
                                        </div>
                                    )}
                                    {data.precioPizza.mediana && (
                                        <div>
                                            <p className="text-xs font-medium  px-1 text-center ">Mediana</p>
                                            <p className="text-lg font-montserrat tracking-wider font-semibold   px-1 text-center ">{formatearNumero(data.precioPizza.mediana)}</p>
                                        </div>
                                    )}
                                    {data.precioPizza.chica && (
                                        <div>
                                            <p className="text-xs font-medium  px-1 text-center ">Chica</p>
                                            <p className="text-lg font-montserrat tracking-wider font-semibold   px-1 text-center ">{formatearNumero(data.precioPizza.chica)}</p>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                <div>
                                    <p className="text-xl tracking-wider text-right pr-2 font-montserrat font-semibold"> {data.precioExtra ? `${formatearNumero(data.precioExtra + data.precio)}` : formatearNumero(data.precio)}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ));
    };

    return (
        <div className='bg-gradient-to-t from-zinc-900 to-zinc-800 min-h-screen'>
            <div className='flex justify-between px-3 items-center'>
                <h1 className='text-white font-bold font-montserrat text-xl tracking-wider'>CANAVARO</h1>
                <div className='py-5'>
                    {deliveryButton.available && (
                        <div className="w-full flex items-center">
                            <Link href={"/welcomeLogo"}>
                                <a
                                    className={`p-2 px-5 rounded-lg font-normal  font-montserrat  text-sm  mx-auto 
                               hover:bg-black hover:text-white bg-white  text-gray-900   
                                 hover:-translate-y-1 transition-all duration-500`}
                                >
                                    Hac&eacute; tu pedido
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <hr />
            <div className=' px-6 py-4 flex flex-wrap justify-center md:justify-center my-3 gap-2 gap-x-6 font-normal  font-montserrat'>
                <button
                    onClick={() => setRenderProductos('promociones')}
                    className={renderProductos === 'promociones' ? 'bg-white rounded-lg p-0.5 px-4 tracking-wider text-sm' : 'text-sm text-white tracking-wider bg-transparent p-1 px-4'}>

                    Combos
                </button>
                <button
                    onClick={() => setRenderProductos('pizzas')}
                    className={renderProductos === 'pizzas' ? 'bg-white rounded-lg p-0.5 px-4 tracking-wider text-sm' : 'text-sm text-white tracking-wider bg-transparent p-1 px-4'}>
                    Pizzas
                </button>
                <button
                    onClick={() => setRenderProductos('bebidas')}
                    className={renderProductos === 'bebidas' ? 'bg-white rounded-lg p-0.5 px-4 tracking-wider text-sm' : 'text-sm text-white tracking-wider bg-transparent p-1 px-4'}>

                    Bebidas
                </button>
                <button
                    onClick={() => setRenderProductos('porciones')}
                    className={renderProductos === 'porciones' ? 'bg-white rounded-lg p-0.5 px-4 tracking-wider text-sm' : 'text-sm text-white tracking-wider bg-transparent p-1 px-4'}>

                    Porciones
                </button>
                <button
                    onClick={() => setRenderProductos('empanadas')}
                    className={renderProductos === 'empanadas' ? 'bg-white rounded-lg p-0.5 px-4 tracking-wider text-sm' : 'text-sm text-white tracking-wider bg-transparent p-1 px-4'}>

                    Empanadas & Canastitas
                </button>
            </div>
            <div >
                <div className=' grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 lg:px-4 pb-4'>
                    {renderStore(renderProductos)}
                </div>
            </div>
        </div>

    )
}



export default DigitalMenu;
