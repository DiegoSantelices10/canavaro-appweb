/* eslint-disable react/prop-types */
import Image from "next/image";
import Link from "next/link";
import { convertToPath } from "lib/items";

const Card = ({ data: { nombre, imagen, descripcion } }) => {
	return (
		<div>
			<div className="p-3 bg-white">
				<div className="flex justify-between items-center gap-x-2">
					<div className="w-full self-start">
						<Link href={`/products/${convertToPath(nombre)}`}>
							<a className="font-bold text-sm text-gray-800">{nombre}</a>
						</Link>
						<p className="text-gray-400 text-xs">{descripcion}</p>
					</div>
					<Image className="rounded-md" src={imagen} width={140} height={140} alt={nombre} />
				</div>
			</div>
			<hr />
		</div>
	);
};

export default Card;
