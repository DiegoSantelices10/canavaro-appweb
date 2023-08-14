/* eslint-disable react/prop-types */
import { convertToPath } from "libs/items";
import Image from "next/image";
import Link from "next/link";

export default function CardPromotion({ data: { nombre, descripcion, imagen } }) {
  return (
    <div className="rounded-md">
      <div className="relative bg-white  rounded-t-md" style={{ width: "260px", height: "150px" }}>
        <div className="w-full">
          <Link href={`/order/products/${convertToPath(nombre)}`}>
            <a className="font-bold text-sm text-gray-800">
              <Image
                src={imagen?.url || "/images/logocanavaro.webp"}
                layout="responsive"
                width={220}
                height={130}
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl "
                alt={nombre}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className="bg-white h-16 rounded-b-md px-1 pt-2 py-0">
        <Link href={`/order/products/${convertToPath(nombre)}`}>
          <a className="font-bold text-sm text-gray-800 whitespace-nowrap">{nombre.substring(0, 35)}</a>
        </Link>

        <p className=" text-gray-400 text-xs font-medium ">{descripcion.substring(0, 55) + "..."}</p>
      </div>
    </div>
  );
}
