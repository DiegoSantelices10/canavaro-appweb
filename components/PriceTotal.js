/* eslint-disable react/prop-types */
import { useFormikContext } from 'formik';
import { formatearNumero } from 'libs/items';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSetting } from 'store/reducers/settingSlice';

const PriceTotal = ({ promoEfectivo, promoEfectivo: { available, descuento } }) => {
    const { values, setFieldValue } = useFormikContext();
    const [subTotal, setSubTotal] = useState(0);
    const { totalAmount, orderList } = useSelector(state => state.order);

    const dispatch = useDispatch();

    const hasProductosEfectivo = () => {
        return orderList.filter(product => product.categoria === "solo efectivo");
    }
    const hasProductosGeneral = () => {
        return orderList.filter(product => product.categoria !== "solo efectivo");
    }


    const getPromoEfectivo = () => {
        if (Object.keys(promoEfectivo).length === 0) {
            const res = JSON.parse(localStorage.getItem('promo efectivo'))
            dispatch(setSetting({ promoEfectivo: res }))
        }
        return JSON.parse(localStorage.getItem('promo efectivo'))
    }


    const promoEfectivoCalculo = (productosEfectivo, productosGeneral, available, descuento) => {
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
                    const desc = totalAmount * (descuento / 100)
                    const total = totalAmount - desc
                    const convert = Math.floor(total);
                    setFieldValue('total', convert)
                }
            } else {
                setFieldValue('total', totalAmount)
            }
        } else {
            setFieldValue('total', totalAmount)
        }
    }
    useEffect(() => {
        const productosEfectivo = hasProductosEfectivo()
        const productosGeneral = hasProductosGeneral()
        const { available, descuento } = getPromoEfectivo();

        promoEfectivoCalculo(productosEfectivo, productosGeneral, available, descuento)

    }, [values.medioDePago, orderList])


    return (
        <div className="w-full font-montserrat mb-24 relative space-y-4">
            {available && hasProductosEfectivo().length > 0 && hasProductosGeneral().length > 0 && (
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-neutral-100 overflow-hidden">

                    <div className="space-y-3">
                        {hasProductosGeneral().map(product => (
                            <div key={product._id} className="flex justify-between items-center group">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-tight">
                                    {product.nombre}
                                    <span className="ml-2 text-[10px] text-neutral-400 font-medium">
                                        {product.categoria === "empanadas" ? `${product.cant}u` : `${product.cantidad}u`}
                                    </span>
                                </h3>
                                <span className="text-xs font-black text-neutral-800">
                                    {formatearNumero(product.precio * product.cantidad)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="my-5 h-px bg-neutral-100"></div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Subtotal</p>
                            <p className="text-xs font-black text-neutral-800">{formatearNumero(subTotal)}</p>
                        </div>

                        {values.medioDePago === 'Efectivo' && (
                            <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                                <p className="text-[10px] font-black uppercase text-emerald-700 tracking-tight">
                                    Desc. Efectivo {descuento}%
                                </p>
                                <p className="text-xs font-black text-emerald-700">
                                    -{formatearNumero(subTotal * (descuento / 100))}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-neutral-200">
                        <h3 className="text-[10px] font-black uppercase text-neutral-400 tracking-widest mb-4">Solo efectivo</h3>
                        <div className="space-y-3">
                            {hasProductosEfectivo().map(product => (
                                <div key={product._id} className="flex justify-between items-center">
                                    <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-tight">
                                        {product.nombre}
                                        <span className="ml-2 text-[10px] text-neutral-400 font-medium">{product.cantidad}u</span>
                                    </h3>
                                    <span className="text-xs font-black text-neutral-800">{formatearNumero(product.precio * product.cantidad)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="px-1">
                {hasProductosEfectivo().length === 0 && values.medioDePago === 'Efectivo' && available && (
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-neutral-100 space-y-4">
                        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 border border-emerald-100 shadow-sm">
                            <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm shadow-sm ring-4 ring-emerald-50">
                                %
                            </div>
                            <p className="text-[11px] font-black uppercase tracking-tight">
                                Abonando en efectivo tenés un <span className="underline">{descuento}% de descuento</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center px-2">
                            <p className="text-[10px] font-black uppercase text-neutral-400 tracking-widest">Subtotal</p>
                            <p className="text-sm font-black text-neutral-800 tracking-tighter">{formatearNumero(totalAmount)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PriceTotal;