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

	useEffect(() => {
		setPromotions(products?.filter(item => item.categoria === "promociones"));
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

	const productQuantity = _id => {
		const pre = orderPromo?.find(item => item._id === _id);
		return pre?.cantidad ? pre.cantidad : 0;
	};
	const onChangeValue = e => {
		setSelect(e.target.value);
		if (products !== null) {
			const { _id, nombre, descripcion } =
				products.filter(item => item.categoria === "promociones").find(item => item.nombre === e.target.value) || {};
			const res = { _id, nombre, descripcion };
			setSelectCombo(res);
		}
	};
	const quantityZero = _id => {
		return orderPromo?.find(item => item._id === _id);
	};
	return (
		<div>
			{data.nombre === "Combo 4" || data.nombre === "Combo 5" ? (
				<>
					<div className="p-4 flex gap-2 justify-start items-center">
						<input id="1" type="radio" value="Combo 1" name="combo" onChange={onChangeValue} checked={select === "Combo 1"} />
						<div>
							<h3>{promotions && promotions[2].nombre}</h3>
							<h4 className="text-gray-400 font-normal">{promotions && promotions[2].descripcion}</h4>
						</div>
					</div>
					<div className="p-4 flex gap-2 justify-start items-center">
						<input id="2" type="radio" value="Combo 2" name="combo" onChange={onChangeValue} checked={select === "Combo 2"} />
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

			{data.addEmpanadas === "no" ? (
				<div className="flex justify-between py-2  my-2 ">
					<div className="w-1/2 font-medium">
						<h2>{data.nombre}</h2>
					</div>
					<div className="w-auto   px-3 text-end space-x-4 text-base">
						<button
							type="button"
							className={orderPromo.length < 1 ? "invisible" : "text-red-500 down "}
							onClick={e => {
								decrementItems(data);
								setQuantity(quantityDemanded + 1);
							}}
						>
							-
						</button>
						<span className="font-normal">{productQuantity(data._id)}</span>
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
									<p className="text-white text-center">Selecciona {quantityDemanded} empanadas para completar la promo</p>
								</div>
							)}

							{products
								?.filter(item => item.categoria === "empanadas")
								.map(({ _id, nombre }) => {
									return (
										<div key={_id} className="flex justify-between py-2  my-2 ">
											<div className="w-1/2 font-medium">
												<h2>{nombre}</h2>
											</div>
											<div className="w-auto   px-3 text-end space-x-4 text-base">
												<button
													type="button"
													className={quantityZero(_id) ? "text-red-500 down " : "invisible"}
													onClick={e => {
														setQuantity(quantityDemanded + 1);
														decrementItems({ _id, nombre });
													}}
												>
													-
												</button>
												<span className="font-normal">{productQuantity(_id)}</span>
												<button
													type="button"
													className={quantityDemanded < 1 ? `invisible` : `text-green-500`}
													onClick={e => {
														setQuantity(quantityDemanded - 1);
														addItems({ _id, nombre });
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
