/* eslint-disable dot-notation */
/* eslint-disable react/prop-types */

export default function PizzaInfo({
	data: {
		nombre,
		precioPizza: { gigante, mediana, chica },
		categoria,
	},
	incrementCart,
	decrementCart,
	cart,
}) {
	const productQuantity = tamanio => {
		const pre = cart.find(item => item.tamanio === tamanio);
		return pre?.cantidad ? pre.cantidad : 0;
	};
	const quantityZero = tamanio => {
		return cart.find(item => item.tamanio === tamanio);
	};

	const removeSpaces = str => {
		return str.replace(/\s/g, "");
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
						className={quantityZero("gigante") ? "text-red-500 down " : "invisible"}
						onClick={() =>
							decrementCart({
								_id: removeSpaces(nombre) + "gigante",
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
								_id: nombre + "gigante",
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
						className={quantityZero("mediana") ? "text-red-500 down " : "invisible"}
						onClick={() =>
							decrementCart({
								_id: nombre + "mediana",
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
								_id: nombre + "mediana",
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
						className={quantityZero("chica") ? "text-red-500 down " : "invisible"}
						onClick={() =>
							decrementCart({
								_id: nombre + "chica",
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
								_id: nombre + "chica",
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
