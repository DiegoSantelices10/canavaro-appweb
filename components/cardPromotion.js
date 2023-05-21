/* eslint-disable react/prop-types */
import Image from "next/image";
import Link from "next/link";
import { convertToPath } from "libs/items";

export default function CardPromotion({
	data,
	data: { nombre, descripcion, imagen, precio },
}) {
	return (
		<div className="  rounded-md ">
			<div className="relative bg-white  rounded-t-md w-60 h-32 ">
				<div className="w-full">
					<Image
						src={imagen?.url}
						layout="responsive"
						width={220}
						height={115}
						objectFit="cover"
						objectPosition="center"
						className="rounded-md "
						alt={nombre}
					/>
				</div>
			</div>
			<div className="bg-white h-12 rounded-b-md px-2 pt-1">
				<Link href={`/order/products/${convertToPath(nombre)}`}>
					<a className="font-bold text-sm text-gray-800">{nombre}</a>
				</Link>

				<p className=" text-gray-400 text-xs ">{descripcion}</p>
			</div>
		</div>
	);
}
