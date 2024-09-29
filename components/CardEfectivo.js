/* eslint-disable react/prop-types */
import { convertToPath, formatearNumero } from "libs/items";
import Link from "next/link";

const CardEfectivo = ({ data: { nombre, descripcion, precio } }) => {

    return (
        <div className="shadow-sm rounded-lg bg-[#fcfcfc] p-3 border-gray-200">
            <Link href={`/order/products/${convertToPath(nombre)}`}>
                <a>
                    <div className="w-60 flex flex-col h-full justify-between font-montserrat">
                        <div className="space-y-2">
                            <div>
                                <p className=" text-gray-800 text-sm font-semibold">{nombre}</p>
                                <p className=" text-gray-400 text-xs tracking-wider">{descripcion}</p>
                            </div>
                            <p className=" text-gray-400 text-sm font-montserrat">{formatearNumero(precio)}</p>
                        </div>
                    </div>

                </a>
            </Link>
        </div>
    );
};

export default CardEfectivo;
