/* eslint-disable react/prop-types */
import { convertToPath } from "libs/items";
import Image from "next/image";
import Link from "next/link";

export default function CardPromotion({ data: { nombre, descripcion, imagen } }) {
  return (
    <div className="rounded-md shadow-sm bg-[#fdfcfc]">
      <div className="relative w-[255px]">
        <div className="w-auto">
          <Link href={`/order/products/${convertToPath(nombre)}`}>
            <a className="font-bold text-sm text-gray-800">
              <Image
                src={imagen?.url || "/images/producto-sin-imagen.png"}
                layout="responsive"
                width={240}
                height={130}
                objectFit="cover"
                objectPosition="center"
                className="rounded-md"
                alt={nombre}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="p-2">
        <Link href={`/order/products/${convertToPath(nombre)}`}>
          <a className="font-semibold text-sm font-montserrat text-neutral-800 whitespace-nowrap">{nombre.substring(0, 35)}</a>
        </Link>
        <p className=" text-gray-400 text-xs tracking-wider">{descripcion.substring(0, 65) + "..."}</p>
      </div>
    </div>
  );
}
