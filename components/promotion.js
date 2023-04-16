/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addProductPromo, decrementProductPromo, setQuantityDemanded } from "store/reducers/orderSlice";

export default function Promotion({ cantMax, data, setSelectCombo }) {
	const [select, setSelect] = useState("");
	const [promotions, setPromotions] = useState("");

	const dispatch = useDispatch();

	const { orderPromo, quantityDemanded } = useSelector(state => state.order);
	const { products } = useSelector(state => state.product);

	const { promociones } = products;

	useEffect(() => {
		setPromotions(promociones);
		dispatch(setQuantityDemanded(cantMax));
	}, []);

	const addItems = value => {
		dispatch(addProductPromo(value));
	};

	const decrementItems = value => {
		dispatch(decrementProductPromo(value));
	};

	const setQuantity = value => {
		dispatch(setQuantityDemanded(value));
	};

	const productQuantity = id => {
		const pre = orderPromo?.find(item => item.id === id);
		return pre?.cantidad ? pre.cantidad : 0;
	};
	const onChangeValue = e => {
		setSelect(e.target.value);
		const { id, nombre, descripcion } = promociones?.find(item => item.nombre === e.target.value);
		const res = { id, nombre, descripcion };
		setSelectCombo(res);
	};
	return (
		<div>
			{data.nombre === "Combo 4" || data.nombre === "Combo 5" ? (
				<>
					<div className="p-4 flex gap-2 justify-start items-center">
						<input
							id="1"
							type="radio"
							value="Combo 1"
							name="combo"
							onChange={onChangeValue}
							checked={select === "Combo 1"}
						/>
						<div>
							<h3>{promotions && promotions[2].nombre}</h3>
							<h4 className="text-gray-400 font-normal">{promotions && promotions[2].descripcion}</h4>
						</div>
					</div>
					<div className="p-4 flex gap-2 justify-start items-center">
						<input
							id="2"
							type="radio"
							value="Combo 2"
							name="combo"
							onChange={onChangeValue}
							checked={select === "Combo 2"}
						/>
						<div>
							<h3>{promotions && promotions[3].nombre}</h3>
							<h4 className="text-gray-400 font-normal">{promotions && promotions[3].descripcion}</h4>
						</div>
					</div>
				</>
			) : data.nombre === "Combo 6" ? (
				setSelectCombo(promotions[4])
			) : (
				<></>
			)}

			{data.nombre === "Combo 3" || data.nombre === "Combo 2" || data.nombre === "Combo 1" ? (
				<div className="flex justify-between py-2  my-2 ">
					<div className="w-1/2 font-medium">
						<h2>{data.nombre}</h2>
					</div>
					<div className="w-auto   px-3 text-end space-x-4 text-base">
						<button
							type="button"
							className="text-red-500 down"
							onClick={e => {
								decrementItems(data);
								setQuantity(quantityDemanded + 1);
							}}
						>
							-
						</button>
						<span className="font-normal">{productQuantity(data.id)}</span>
						<button
							type="button"
							className="text-green-500 up"
							onClick={e => {
								addItems(data);
								setQuantity(quantityDemanded - 1);
							}}
						>
							+
						</button>
					</div>
				</div>
			) : (
				<div>
					{
						<>
							{quantityDemanded < 1 ? (
								<div className="bg-green-500 w-auto p-2">
									<p className="text-white text-center">¡ Se completo la cantidad requerida !</p>
								</div>
							) : (
								<div className="bg-red-500 w-auto p-2">
									<p className="text-white text-center">
										Selecciona {quantityDemanded} empanadas para completar la promo
									</p>
								</div>
							)}

							{products.empanadas?.map(({ id, nombre }) => {
								return (
									<div key={id} className="flex justify-between py-2  my-2 ">
										<div className="w-1/2 font-medium">
											<h2>{nombre}</h2>
										</div>
										<div className="w-auto   px-3 text-end space-x-4 text-base">
											<button
												type="button"
												className="text-red-500 down"
												onClick={e => {
													setQuantity(quantityDemanded + 1);
													decrementItems({ id, nombre });
												}}
											>
												-
											</button>
											<span className="font-normal">{productQuantity(id)}</span>
											<button
												type="button"
												className={quantityDemanded < 1 ? `invisible` : `text-green-500`}
												onClick={e => {
													setQuantity(quantityDemanded - 1);
													addItems({ id, nombre });
												}}
											>
												+
											</button>
										</div>
									</div>
								);
							})}
						</>
					}
				</div>
			)}
		</div>
	);
}
