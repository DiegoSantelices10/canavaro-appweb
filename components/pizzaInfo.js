/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid";

export default function PizzaInfo({
	data: {
		nombre,
		precio: { gigante, mediana, chica },
		categoria,
	},
	incrementCart,
	decrementCart,
	cart,
}) {
	const idGenerator = uuidv4();

	const productQuantity = tamanio => {
		const pre = cart.find(item => item.tamanio === tamanio);
		return pre?.cantidad ? pre.cantidad : 0;
	};

	return (
		<>
			<div className="flex justify-between items-center">
				<div className="w-1/3 font-medium">
					<h2>Gigante</h2>
				</div>
				<div className="w-1/3 font-medium text-center ">{<h2>$ {gigante}</h2>}</div>
				<div className="font-roboto w-auto   px-3 text-end space-x-4 text-base">
					<button
						type="button"
						className="text-red-500"
						onClick={() =>
							decrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: "gigante",
								precio: gigante,
							})
						}
					>
						-
					</button>
					<span className="font-normal">{productQuantity("gigante")}</span>
					<button
						type="button"
						className="text-green-500"
						onClick={() =>
							incrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: "gigante",
								precio: gigante,
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
				<div className="w-1/3 font-medium text-center ">{<h2>$ {mediana}</h2>}</div>
				<div className="font-roboto w-auto   px-3 text-end space-x-4 text-base">
					<button
						type="button"
						className="text-red-500"
						onClick={() =>
							decrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: "mediana",
								precio: mediana,
							})
						}
					>
						-
					</button>
					<span className="font-normal">{productQuantity("mediana")}</span>
					<button
						type="button"
						className="text-green-500"
						onClick={() =>
							incrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: "mediana",
								precio: mediana,
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
				<div className="w-1/3 font-medium text-center ">{<h2>$ {chica}</h2>}</div>
				<div className="font-roboto w-auto  px-3 text-end space-x-4 text-base">
					<button
						type="button"
						className="text-red-500"
						onClick={() =>
							decrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: "chica",
								precio: chica,
							})
						}
					>
						-
					</button>
					<span className="font-normal">{productQuantity("chica")}</span>
					<button
						type="button"
						className="text-green-500"
						onClick={() =>
							incrementCart({
								idGenerator,
								nombre,
								categoria,
								tamanio: "chica",
								precio: chica,
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
