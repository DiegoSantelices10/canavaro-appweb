/* eslint-disable react/prop-types */
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
            <h2 className="font-montserrat font-medium text-xs pb-1 pl-1 text-neutral-800">Medios de pago</h2>
            {verificarSoloEfectivo() ? (
                <p>solo podes abonar en efectivo</p>
            ) : (
                <>
                    <div className="w-full  border border-gray-200 rounded-lg ">
                        <Field
                            as="select"
                            name="medioDePago"
                            className=" border-none font-montserrat p-3  text-gray-900 font-normal text-sm rounded-lg  block w-full focus:ring-gray-300 "
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
                            <Field
                                id="pagaCon"
                                type="number"
                                name="pagaCon"
                                className="border rounded-lg placeholder:text-gray-400  
                           border-gray-200 font-montserrat text-sm w-full p-3 focus:ring-0 focus:border-gray-200"
                                placeholder="¿Con cuanto vas a pagar?"
                            />
                        )}
                        {values.medioDePago === "Mercado Pago" && (
                            <>
                                <p className="font-montserrat text-center font-semibold ">
                                    por transferencia a <span className="text-md font-semibold font-montserrat text-sky-500">pizzeria.canavaro</span>
                                </p>
                                <p className="font-montserrat text-center font-semibold">
                                    o mediante QR
                                </p>
                                <div className="flex justify-center w-full">
                                    <Image src="/images/logo-mercadopago.png" width={100} height={100} alt="logoMP" />
                                </div>
                                <p className="font-montserrat text-center text-xs text-gray-400 font-normal">
                                    Abonas al momento de confirmar el pedido por whatsapp
                                </p>
                            </>
                        )}
                        {values.medioDePago === "Cuenta DNI" && (
                            <>
                                <p className="font-montserrat text-center font-semibold">
                                    De lunes a viernes 20% de reintegro
                                </p>
                                <p className="font-montserrat text-center font-semibold">
                                    pagando con Cuenta DNI
                                </p>
                                <div className="flex justify-center w-full">
                                    <Image src="/images/cuenta-dni.jpg" width={170} height={70} alt="logoOpen" />
                                </div>
                                <p className="font-montserrat text-center text-xs text-gray-400">
                                    El reintegro lo realiza la billetera virtual, tope $6000 por mes.
                                </p>
                                <p className="font-montserrat text-center text-xs text-gray-400">
                                    Abonas al momento de confirmar el pedido por whatsapp
                                </p>
                            </>
                        )}
                        {values.medioDePago === "Open Pay" && (
                            <>
                                <p className="font-montserrat text-center font-semibold ">
                                    Los martes y viernes
                                </p>
                                <p className="font-montserrat text-center font-semibold">
                                    30% de reintegro pagando con BBVA
                                </p>

                                <div className="flex justify-center w-full">
                                    <Image src="/images/openpay.png" width={180} height={70} alt="logoOpen" />
                                </div>
                                <p className="font-montserrat text-center text-xs text-gray-400">
                                    El reintegro lo realiza el banco, tope $5000 por mes.
                                </p>
                                <p className="font-montserrat text-center text-xs text-gray-400">
                                    Abonas al momento de confirmar el pedido por whatsapp
                                </p>
                            </>
                        )}
                    </div>
                </>
            )}


        </div>
    )
}

export default MeansOfPayment;