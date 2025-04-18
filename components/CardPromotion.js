/* eslint-disable react/prop-types */
import { convertToPath } from "libs/items";
import Link from "next/link";

export default function CardPromotion({ data: { nombre, descripcion, imagen } }) {
  return (
    <div>
      <div className="w-64">
        <Link href={`/order/products/${convertToPath(nombre)}`}>
          <a className="font-bold text-sm text-gray-800">
            <img
              src={imagen?.url || "/images/sin-imagen-center.png"}
              className="rounded-lg object-contain w-full h-40"
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
