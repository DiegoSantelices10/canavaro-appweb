import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { convertToPath } from 'lib/items';

export default function Card({ data: { id, nombre, imagen, descripcion } }) {
	return (
		<div className=" rounded-md mb-4 p-3 shadow-md bg-white">
			<div className="flex justify-between items-center gap-x-2">
				<div className="w-full self-start">
					<Link href={`/products/${convertToPath(nombre)}`}>
						<a className="font-semibold text-sm text-gray-800">{nombre}</a>
					</Link>
					<p className="text-gray-400 text-xs">{descripcion}</p>
				</div>
				<Image className="rounded-md" src={imagen} width={140} height={140} alt={nombre} />
			</div>
		</div>
	);
}
