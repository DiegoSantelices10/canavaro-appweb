/* eslint-disable react/prop-types */
import { convertToPath } from "libs/items";
import Image from "next/image";
import Link from "next/link";

export default function CardPromotion({ data: { nombre, descripcion, imagen } }) {
  return (
    <div>
      <div className="w-60">
        <Link href={`/order/products/${convertToPath(nombre)}`}>
          <a className="font-bold text-sm text-gray-800">
            <Image
              src={imagen?.url || "/images/sin-imagen-center.png"}
              layout="responsive"
              width={200}
              height={100}
              objectFit="cover"
              objectPosition="center"
              className="rounded-lg"
              alt={nombre}
            />
          </a>
        </Link>
      </div>
      <div className="py-2 w-full flex flex-col flex-wrap">
        <Link href={`/order/products/${convertToPath(nombre)}`}>
          <a className="font-semibold text-sm font-montserrat text-neutral-800 ">{nombre.length > 65 ? nombre.substring(0, 65) + "..." : nombre}</a>
        </Link>

      </div>
    </div>
  );
}
