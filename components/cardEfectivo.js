/* eslint-disable react/prop-types */
import { convertToPath, formatearNumero } from "libs/items";
import Link from "next/link";

const CardEfectivo = ({ data: { nombre, descripcion, precio } }) => {

    return (
        <div className="rounded-xl shadow p-3">
            <Link href={`/order/products/${convertToPath(nombre)}`}>
                <a>
                    <div className="w-60 flex flex-col h-full justify-between">
                        <div>
                            <p className=" text-gray-800 text-sm font-bold">{nombre}</p>
                            <p className=" text-gray-400 text-xs tracking-wider">{descripcion}</p>
                            <p className=" text-gray-400 text-sm font-poppins py-1">{formatearNumero(precio)}</p>
                        </div>
                    </div>

                </a>
            </Link>
        </div>
    );
};

export default CardEfectivo;
