/* eslint-disable react/prop-types */
import { useFormikContext } from 'formik';
import { formatearNumero } from 'libs/items';
import React, { useEffect, useState } from 'react'

const PriceTotal = ({ totalPedido, promoEfectivo: { available, descuento }, orderList }) => {
    const { values, setFieldValue } = useFormikContext();
    const [subTotal, setSubTotal] = useState(0);

    const hasProductosEfectivo = () => {
        return orderList.filter(product => product.categoria === "soloEfectivo");
    }
    const hasProductosGeneral = () => {
        return orderList.filter(product => product.categoria !== "soloEfectivo");
    }
    useEffect(() => {
        const productosEfectivo = hasProductosEfectivo()
        const productosGeneral = hasProductosGeneral()

        if (available) {
            if (values.medioDePago === 'Efectivo') {
                if (productosEfectivo.length > 0 && productosGeneral.length > 0) {
                    const sumGeneral = productosGeneral.reduce((acumulador, producto) => {
                        return acumulador + (producto.precio * producto.cantidad);
                    }, 0);
                    const sumEfectivo = productosEfectivo.reduce((acumulador, producto) => {
                        return acumulador + (producto.precio * producto.cantidad);
                    }, 0);
                    setSubTotal(sumGeneral)
                    const desc = sumGeneral * (descuento / 100)
                    const total = sumGeneral - desc
                    const convert = Math.floor(total + sumEfectivo);
                    setFieldValue('total', convert)
                } else if (productosGeneral.length > 0) {
                    const desc = values.total * (descuento / 100)
                    const total = values.total - desc
                    const convert = Math.floor(total);
                    setFieldValue('total', convert)
                }
            } else {
                setFieldValue('total', totalPedido)
            }
        }
    }, [values.medioDePago])


    const renderSubtotal = (descuento) => {
        const sumTotal = hasProductosGeneral().reduce((acumulador, producto) => {
            return acumulador + (producto.precio * producto.cantidad);
        }, 0);
        return sumTotal - (sumTotal * (descuento / 100));
    }

    return (
        <div className="w-full font-poppins mb-20 relative">
            {available && hasProductosEfectivo().length > 0 && hasProductosGeneral().length > 0 && (
                <>
                    <div className='p-2 border rounded-xl border-red-500 my-2'>
                        {hasProductosGeneral().map(product => (
                            <div key={product._id} className='flex justify-between items-center w-full py-1'>
                                <h3 className='text-sm font-semibold text-slate-800'>{product.nombre} <span className='text-xs text-gray-800 font-light'>{product.categoria === "empanadas" ? ` ${product.cant}u` : ` ${product.cantidad}u`}</span> </h3>
                                <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                            </div>
                        ))}
                        <hr className='my-1' />
                        <div className='flex items-center justify-between'>
                            <p className='py-1 text-sm font-semibold text-slate-800'>Subtotal</p>
                            <p className='text-sm'>{formatearNumero(subTotal)}</p>
                        </div>
                        {values.medioDePago === 'Efectivo' && (
                            <div className='flex text-red-500 items-center justify-between w-full'>
                                <p className='text-xs'>Abonando en efectivo, descuento del {descuento}%</p>
                                <p className='text-sm'>{formatearNumero(renderSubtotal(descuento))}</p>
                            </div>
                        )}
                    </div>
                    <h3 className='text-xs px-2 font-medium mt-2 text-gray-400'>Solo efectivo</h3>
                    {hasProductosEfectivo().map(product => (
                        <div key={product._id} className='flex px-2 justify-between w-full items-center py-1'>
                            <h3 className='text-sm font-semibold text-slate-800'>{product.nombre}<span className='text-xs text-gray-800 font-light'>{` ${product.cantidad}u`}</span></h3>
                            <div className='flex gap-4 items-center'>
                                <h3 className='text-sm'>{formatearNumero(product.precio * product.cantidad)}</h3>
                            </div>
                        </div>

                    ))}
                </>
            )}
            <div className='mb-6'>
                {hasProductosEfectivo().length === 0 && values.medioDePago === 'Efectivo' && available && (
                    <>
                        <div className="bg-red-500 w-auto p-2 rounded-xl my-2">
                            <p className="text-white text-center font-normal text-sm">¡ Abonando en efectivo tenes un {descuento}% de descuento !</p>
                        </div>
                        <div className='flex px-2 justify-between w-full items-center py-1 mt-2'>
                            <p className='font-normal'>Subtotal</p>
                            <p className='font-normal'>{formatearNumero(totalPedido)}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default PriceTotal;