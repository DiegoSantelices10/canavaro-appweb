/* eslint-disable react/prop-types */
import ControllerInput from 'components/ControllerInput';
import { Field } from 'formik';
import Image from 'next/image';
import React from 'react'

const MeansOfPayment = (props) => {

    const {
        verificarSoloEfectivo,
        values,
        medios
    } = props;
    return (
        <div className="h-full">
            <h2 className="font-montserrat font-semibold text-xs pb-1 pl-1 text-gray-900">Medios de pago</h2>
            {verificarSoloEfectivo() ? (
                <p>solo podes abonar en efectivo</p>
            ) : (
                <>
                    <div className="w-full  border border-gray-200 rounded-lg ">
                        <Field
                            as="select"
                            name="medioDePago"
                            className=" border-none font-montserrat px-3 py-2.5  text-gray-900 font-normal text-sm rounded-lg  block w-full focus:ring-gray-300 "
                        >
                            {medios.map((item, index) => (
                                <option key={index} value={item} className="text-sm text-gray-500 font-montserrat font-semibold">
                                    {item}
                                </option>
                            ))}
                        </Field>
                    </div>
                    <div className="mt-8">
                        {values.medioDePago === "Efectivo" && (
                            <ControllerInput
                                type="number"
                                name="pagaCon"
                                label='Efectivo'
                                placeholder="¿Con cuanto vas a pagar?"
                            />
                        )}
                        {values.medioDePago === "Mercado Pago" && (
                            <div className='text-sm'>
                                <p className="font-montserrat text-center font-semibold ">
                                    por transferencia a <span className="text-md font-semibold font-montserrat text-sky-500">pizzeria.canavaro</span>
                                </p>
                                <p className="font-montserrat text-center font-semibold">
                                    o mediante QR
                                </p>
                                <div className="flex justify-center w-full">
                                    <Image src="/images/logo-mercadopago.png" width={80} height={80} alt="logoMP" />
                                </div>
                                <p className="font-montserrat text-center text-xs text-gray-400 font-normal">
                                    Abonas al momento de confirmar el pedido por whatsapp
                                </p>
                            </div>
                        )}
                        {values.medioDePago === "Cuenta DNI" && (
                            <div className='text-sm'>
                                <div className="flex justify-center w-full">
                                    <Image src="/images/cuenta-dni.jpg" width={130} height={50} alt="logoOpen" />
                                </div>
                           
                                <p className="font-montserrat text-center text-xs text-gray-400">
                                    Abonas al momento de confirmar el pedido por whatsapp
                                </p>
                            </div>
                        )}
                        {values.medioDePago === "Open Pay" && (
                            <div className='text-sm'>
                                <p className="font-montserrat text-center font-semibold ">
                                    Los martes y viernes
                                </p>
                                <p className="font-montserrat text-center font-semibold">
                                    30% de reintegro pagando con BBVA
                                </p>

                                <div className="flex justify-center w-full">
                                    <Image src="/images/openpay.png" width={160} height={60} alt="logoOpen" />
                                </div>
                                <p className="font-montserrat text-center text-xs text-gray-400">
                                    El reintegro lo realiza el banco, tope $8500 por mes.
                                </p>
                                <p className="font-montserrat text-center text-xs text-gray-400">
                                    Abonas al momento de confirmar el pedido por whatsapp
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}


        </div>
    )
}

export default MeansOfPayment;