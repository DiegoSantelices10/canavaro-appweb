import React from 'react';
import ButtonDownUp from './buttonDownUp';
import { v4 as uuidv4 } from 'uuid';
export default function PizzaInfo({
	data: {
		id,
		nombre,
		tamanio: { Gigante, Mediana, Chica },
		categoria,
	},
	incrementCart,
	decrementCart,
	cart,
}) {
	const idGenerator = uuidv4();

	const productQuantity = tamanio => {
		const pre = cart.find(item => item.tamanio == tamanio);
		return pre?.cantidad ? pre.cantidad : 0;
	};

	return (
		<>
			<div className="flex justify-between items-center">
				<div className="w-1/3 font-medium">
					<h2>Gigante</h2>
				</div>
				<div className="w-1/3 font-medium text-center ">{<h2>$ {Gigante.precio}</h2>}</div>
				<div className="font-roboto w-auto   px-3 text-end space-x-4 text-base">
					<button
						type="button"
						className="text-red-500"
						onClick={() =>
							decrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: 'gigante',
								precio: Gigante.precio,
							})
						}
					>
						-
					</button>
					<span className="font-normal">{productQuantity('gigante')}</span>
					<button
						type="button"
						className="text-green-500"
						onClick={() =>
							incrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: 'gigante',
								precio: Gigante.precio,
							})
						}
					>
						+
					</button>
				</div>
			</div>
			<div className="flex justify-between items-center">
				<div className="w-1/3 font-medium">
					<h2>Mediana</h2>
				</div>
				<div className="w-1/3 font-medium text-center ">{<h2>$ {Mediana.precio}</h2>}</div>
				<div className="font-roboto w-auto   px-3 text-end space-x-4 text-base">
					<button
						type="button"
						className="text-red-500"
						onClick={() =>
							decrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: 'mediana',
								precio: Mediana.precio,
							})
						}
					>
						-
					</button>
					<span className="font-normal">{productQuantity('mediana')}</span>
					<button
						type="button"
						className="text-green-500"
						onClick={() =>
							incrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: 'mediana',
								precio: Mediana.precio,
							})
						}
					>
						+
					</button>
				</div>
			</div>
			<div className="flex justify-between items-center">
				<div className="w-1/3 font-medium">
					<h2>Chica</h2>
				</div>
				<div className="w-1/3 font-medium text-center ">{<h2>$ {Chica.precio}</h2>}</div>
				<div className="font-roboto w-auto  px-3 text-end space-x-4 text-base">
					<button
						type="button"
						className="text-red-500"
						onClick={() =>
							decrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: 'chica',
								precio: Chica.precio,
							})
						}
					>
						-
					</button>
					<span className="font-normal">{productQuantity('chica')}</span>
					<button
						type="button"
						className="text-green-500"
						onClick={() =>
							incrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: 'chica',
								precio: Chica.precio,
							})
						}
					>
						+
					</button>
				</div>
			</div>
		</>
	);
}
