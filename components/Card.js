/* eslint-disable react/prop-types */
import Image from "next/image";
import Link from "next/link";
import { convertToPath } from "libs/items";
import { useDispatch, useSelector } from "react-redux";
import { addProductPromo, decrementProductPromo } from "store/reducers/orderSlice";

const Card = ({ data, data: { id, nombre, imagen, descripcion, categoria, precio } }) => {
	const { orderPromo } = useSelector(state => state.order);

	const dispatch = useDispatch();

	const addItems = value => {
		dispatch(addProductPromo(value));
	};

	const decrementItems = value => {
		dispatch(decrementProductPromo(value));
	};

	const productQuantity = id => {
		const pre = orderPromo?.find(item => item.id === id);
		return pre?.cantidad ? pre.cantidad : 0;
	};
	return (
		<div>
			<div className="p-3 bg-white">
				{categoria === "empanadas" ? (
					<div className="flex justify-between items-center gap-x-2">
						<Image
							className="rounded-md"
							src={imagen?.url}
							width={140}
							height={140}
							alt={nombre}
						/>
						<div className="relative w-full h-24 self-start">
							<h1 className="font-bold text-sm text-gray-800">{nombre}</h1>
							<p className="text-gray-400 text-xs">{descripcion}</p>
							<p className="text-gray-400 text-xs py-1">$ {precio}</p>

							<div className="absolute bottom-0 right-0 w-auto px-3 text-end  space-x-4 text-base">
								<button
									type="button"
									className="text-red-500 down"
									onClick={e => {
										decrementItems({ id, nombre, precio });
									}}
								>
									-
								</button>
								<span className="font-normal">{productQuantity(data.id)}</span>
								<button
									type="button"
									className="text-green-500 up"
									onClick={e => {
										addItems({ id, nombre, precio });
									}}
								>
									+
								</button>
							</div>
						</div>
					</div>
				) : (
					<Link href={`/order/products/${convertToPath(nombre)}`}>
						<a>
							<div className="flex justify-between items-center gap-x-2">
								<Image
									className="rounded-md"
									src={imagen?.url}
									width={140}
									height={140}
									alt={nombre}
								/>
								<div className="w-full self-start">
									<h1 className="font-bold text-sm text-gray-800">{nombre}</h1>
									<p className="text-gray-400 text-xs">{descripcion}</p>
									{categoria === "promociones" && (
										<p className="text-gray-400 text-xs py-1">$ {precio}</p>
									)}
								</div>
							</div>
						</a>
					</Link>
				)}
			</div>
			<hr />
		</div>
	);
};

export default Card;
