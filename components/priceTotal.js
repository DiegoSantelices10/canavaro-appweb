/* eslint-disable react/prop-types */
import { useFormikContext } from 'formik';
import { formatearNumero } from 'libs/items';
import React, { useEffect, useState } from 'react'

const PriceTotal = ({ totalAmount, totalPedido, available }) => {

    const { values, setFieldValue } = useFormikContext();
    const [isPromo, setIsPromo] = useState(false);



    useEffect(() => {
        if (values.medioDePago === 'Efectivo' && available) {
            const desc = totalAmount * 0.10
            const total = totalAmount - desc
            const convert = Math.floor(total);
            setFieldValue('total', convert)
            setIsPromo(true)

        } else {
            setFieldValue('total', totalPedido)
            setIsPromo(false)
        }
    }, [values.medioDePago])

    return (
        <div className="w-1/2 flex flex-col ">
            <>
                {isPromo && (
                    <div className="flex gap-1 justify-start items-end font-poppins">
                        <p className="text-sm text-neutral-800 font-bold">Subtotal<span className="font-normal"> ${totalPedido}</span></p>
                        <p className="text-neutral-800 text-sm font-normal"> - 10%</p>
                    </div>
                )}
                <div className="font-poppins p-0">
                    <p className="font-bold  text-lg text-neutral-800">Total</p>
                    <h3 className="text-2xl text-neutral-800 font-normal">{formatearNumero(totalAmount)}</h3>
                </div>
            </>


        </div>
    )
}

export default PriceTotal;