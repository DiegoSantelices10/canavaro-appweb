/* eslint-disable react/prop-types */
import { convertToPath } from "libs/items";
import Link from "next/link";

export default function CardPromotion({ data: { nombre, descripcion, imagen } }) {
  return (
    <div>
      <div className="w-60 relative h-36 overflow-hidden rounded-lg">
        {/* Fondo blureado */}
        <img
          src={imagen?.url || "/images/sin-imagen-center.png"}
          alt={`fondo-${nombre}`}
          className="absolute top-0 left-0 w-full h-full object-cover filter blur-md scale-110 z-0"
        />

        {/* Imagen principal */}
        <Link href={`/order/products/${convertToPath(nombre)}`}>
          <a className="relative z-10 flex items-center justify-center w-full h-full">
            <img
              src={imagen?.url || "/images/sin-imagen-center.png"}
              className="object-contain max-h-full"
              alt={nombre}
            />
          </a>
        </Link>
      </div>

      <div className="pt-2 pb-1 px-1 w-full flex flex-col flex-wrap">
        <Link href={`/order/products/${convertToPath(nombre)}`}>
          <a className="font-semibold text-sm font-montserrat text-neutral-800 ">{nombre.length > 65 ? nombre.substring(0, 65) + "..." : nombre}</a>
        </Link>

      </div>
    </div>
  );
}
