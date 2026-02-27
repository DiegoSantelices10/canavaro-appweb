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
            <h2 className="font-montserrat font-extrabold text-[11px] uppercase tracking-widest pb-3 pl-1 text-neutral-400">Medios de pago</h2>

            {verificarSoloEfectivo() ? (
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                    <p className="text-amber-800 font-bold text-sm text-center">Solo podés abonar en efectivo con estos productos.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 gap-3">
                        {medios.map((item, index) => (
                            <label key={index} className="cursor-pointer group">
                                <Field
                                    type="radio"
                                    name="medioDePago"
                                    value={item}
                                    className="peer hidden"
                                />
                                <div className="h-20 flex flex-col items-center justify-center rounded-2xl border-2 border-neutral-100 bg-white text-neutral-500 font-bold text-xs font-montserrat uppercase tracking-tight transition-all peer-checked:border-red-600 peer-checked:bg-red-50/30 peer-checked:text-red-700 group-hover:bg-neutral-50 group-hover:border-neutral-200">
                                    <span className="text-center px-2">{item}</span>
                                    {values.medioDePago === item && (
                                        <div className="mt-1 w-1 h-1 bg-red-600 rounded-full"></div>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="mt-8">
                        {values.medioDePago === "Efectivo" ? (
                            <div>
                                <ControllerInput
                                    type="number"
                                    name="pagaCon"
                                    label='¿Con cuánto vas a pagar?'
                                    placeholder="Ej: 5000"
                                />
                            </div>
                        ) : (
                            <div className="bg-white p-5 rounded-2xl border border-sky-100 flex flex-col items-center text-center gap-4">
                                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg shadow-sky-200">
                                    💬
                                </div>
                                <div className="space-y-2">
                                    <p className="font-montserrat font-black text-sky-900 text-sm uppercase tracking-tight">
                                        Pago por WhatsApp
                                    </p>
                                    <p className="font-montserrat text-sky-700 text-[11px] font-bold leading-relaxed max-w-[250px] mx-auto uppercase">
                                        Al confirmar tu pedido, te enviaremos el QR o Alias por WhatsApp para completar el pago.
                                    </p>
                                </div>

                                {values.medioDePago === "Mercado Pago" && (
                                    <div className="pt-2 transition-all flex justify-center">
                                        <Image src="/images/logo-mercadopago.png" width={80} height={35} objectFit="contain" alt="logoMP" />
                                    </div>
                                )}
                                {values.medioDePago === "Cuenta DNI" && (
                                    <div className="pt-2 transition-all flex justify-center">
                                        <Image src="/images/cuenta-dni.jpg" width={100} height={40} objectFit="contain" alt="logoOpen" />
                                    </div>
                                )}
                                {values.medioDePago === "Open Pay" && (
                                    <div className="pt-2 transition-all flex justify-center">
                                        <Image src="/images/openpay.png" width={120} height={45} objectFit="contain" alt="logoOpen" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default MeansOfPayment;