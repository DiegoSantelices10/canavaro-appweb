/* eslint-disable react/prop-types */
import ControllerInput from 'components/ControllerInput';
import { Field } from 'formik';
import Image from 'next/image';
import React from 'react'
import { BsChatDotsFill } from 'react-icons/bs';

const WhatsappPayInfo = ({ logo, logoWidth = 70, logoHeight = 40, logoAlt, selectionCurrent }) => (
    <div className="mt-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex flex-col items-center gap-1.5 shadow-sm">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-md">
            <BsChatDotsFill className="text-white" size={17} />
        </div>

        <p className="font-montserrat font-bold text-xs tracking-widest text-slate-800 uppercase text-center">
            Pago por WhatsApp
        </p>
        {selectionCurrent === "Open Pay" && (
            <div className="mt-3 rounded-xl px-4 py-3 flex flex-col items-center gap-1.5">
                <p className="font-montserrat text-[10px] text-slate-500 text-center font-bold leading-snug uppercase tracking-wide max-w-xs">
                    Martes y viernes con tarjeta de credito Banco Frances tenes reintegro.
                </p>
            </div>
        )}
        {selectionCurrent === "Cuenta DNI" && (
            <div className="mt-3 rounded-xl px-4 py-3 flex flex-col items-center gap-1.5">
                <p className="font-montserrat text-[10px] text-slate-500 text-center font-bold leading-snug uppercase tracking-wide max-w-xs">
                    Aprovecha el reintegro de Cuenta DNI.
                </p>
            </div>
        )}
        <p className="font-montserrat text-[10px] text-slate-500 text-center font-medium leading-snug uppercase tracking-wide max-w-xs">
            Al confirmar tu pedido, te enviaremos el QR o alias por WhatsApp para completar el pago.
        </p>

        {logo && (
            <div className="flex justify-center">
                <Image src={logo} width={logoWidth} height={logoHeight} alt={logoAlt || 'logo'} />
            </div>
        )}
    </div>
);

const MeansOfPayment = (props) => {

    const {
        verificarSoloEfectivo,
        values,
        medios
    } = props;

    return (
        <div className="h-full px-3">
            <h2 className="font-montserrat font-semibold text-xs pb-1 pl-1 text-gray-900">Medios de pago</h2>
            {verificarSoloEfectivo() ? (
                <p>solo podes abonar en efectivo</p>
            ) : (
                <>
                    <div className="w-full border border-gray-200 rounded-lg">
                        <Field
                            as="select"
                            name="medioDePago"
                            className="border-none font-montserrat px-3 py-2.5 text-gray-900 font-normal text-sm rounded-lg block w-full focus:ring-gray-300"
                        >
                            {medios.map((item, index) => (
                                <option key={index} value={item} className="text-sm text-gray-500 font-montserrat font-semibold">
                                    {item}
                                </option>
                            ))}
                        </Field>
                    </div>

                    <div className="mt-2">
                        {values.medioDePago === 'Efectivo' && (
                            <ControllerInput
                                type="number"
                                name="pagaCon"
                                label='Efectivo'
                                placeholder="¿Con cuánto vas a pagar?"
                            />
                        )}

                        {values.medioDePago === 'Mercado Pago' && (
                            <WhatsappPayInfo
                                logo="/images/logo-mercadopago.png"
                                logoWidth={80}
                                logoHeight={80}
                                logoAlt="Logo Mercado Pago"
                            />
                        )}

                        {values.medioDePago === 'Cuenta DNI' && (
                            <WhatsappPayInfo
                                logo="/images/cuenta-dni.jpg"
                                logoWidth={130}
                                selectionCurrent={values.medioDePago}
                                logoHeight={50}
                                logoAlt="Logo Cuenta DNI"
                            />
                        )}

                        {values.medioDePago === 'Open Pay' && (
                            <WhatsappPayInfo
                                logo="/images/openpay.png"
                                selectionCurrent={values.medioDePago}
                                logoWidth={160}
                                logoHeight={60}
                                logoAlt="Logo Open Pay"
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default MeansOfPayment;