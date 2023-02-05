/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	addProductPromo,
	addProductEmpanada,
	decrementProduct,
	decrementProductPromo,
} from 'store/reducers/orderSlice';

export default function Promotion({ cantMax, data, quantity }) {
	const [quantityDemanded, setQuantityDemanded] = useState(cantMax);

	const [promotions, setPromotions] = useState('');
	const [quantityPromo, setQuantityPromo] = useState('');

	const [combo, setCombo] = useState('1');
	const { orderPromo } = useSelector(state => state.order);
	const { products } = useSelector(state => state.product);

	const { promociones } = products;

	useEffect(() => {
		setPromotions(promociones);
		const res = productQuantityPromo();
		setQuantityDemanded(quantityDemanded - res);
		console.log('resultado final', res);
	}, []);
	const dispatch = useDispatch();

	const addItems = value => {
		dispatch(addProductPromo(value));
	};
	const decrementItems = value => {
		dispatch(decrementProductPromo(value));
	};

	const addProductItems = value => {
		dispatch(addProductEmpanada(value));
	};

	const decrementProductItems = value => {
		dispatch(decrementProduct(value));
	};

	const productQuantityPromo = () => {
		const array = [];
		orderPromo.map(item => {
			const { cantidad } = item;
			return array.push(cantidad);
		});
		const totalQuantity = array.reduce((a, b) => a + b, 0);
		return totalQuantity;
	};

	const productQuantity = id => {
		const pre = orderPromo?.find(item => item.id === id);
		return pre?.cantidad ? pre.cantidad : 0;
	};
	const onChangeValue = e => {
		setCombo(e.target.value);
		console.log(e.target.value);
	};
	return (
		<div>
			{data.nombre == 'Combo 4' || data.nombre == 'Combo 5' ? (
				<>
					<div className="p-4 flex gap-2 justify-start items-center">
						<input id="1" type="radio" value="1" name="combo" onChange={onChangeValue} checked={combo === '1'} />
						<div>
							<h3>{promotions && promotions[2].nombre}</h3>
							<h4 className="text-gray-400 font-normal">{promotions && promotions[2].descripcion}</h4>
						</div>
					</div>
					<div className="p-4 flex gap-2 justify-start items-center">
						<input id="2" type="radio" value="2" name="combo" onChange={onChangeValue} checked={combo === '2'} />
						<div>
							<h3>{promotions && promotions[3].nombre}</h3>
							<h4 className="text-gray-400 font-normal">{promotions && promotions[3].descripcion}</h4>
						</div>
					</div>
				</>
			) : (
				<></>
			)}

			{data.nombre == 'Combo 3' || data.nombre == 'Combo 2' || data.nombre == 'Combo 1' ? (
				<div className="flex justify-between py-2  my-2 ">
					<div className="w-1/2 font-medium">
						<h2>{data.nombre}</h2>
					</div>
					<div className="w-auto   px-3 text-end space-x-4 text-base">
						<button
							type="button"
							className="text-red-500 down"
							onClick={e => {
								decrementProductItems(data);
								setQuantityDemanded(quantityDemanded + 1);
							}}
						>
							-
						</button>
						<span className="font-normal">{quantity(data.id)}</span>
						<button
							type="button"
							className="text-green-500 up"
							onClick={e => {
								addProductItems(data);
								setQuantityDemanded(quantityDemanded - 1);
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
									<p className="text-white text-center">¡ Tu docena esta completa !</p>
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
													decrementItems({ id, nombre });
													setQuantityDemanded(quantityDemanded + 1);
												}}
											>
												-
											</button>
											<span className="font-normal">{productQuantity(id)}</span>
											<button
												type="button"
												className="text-green-500 up"
												onClick={e => {
													addItems({ id, nombre });
													setQuantityDemanded(quantityDemanded - 1);
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

			{/* {data.nombre !== 'Combo 1' && data.nombre !== 'Combo 2' && data.nombre !== 'Combo 3' && (
				<>
					{quantityDemanded < 1 ? (
						<div className="bg-green-500 w-auto p-2">
							<p className="text-white text-center">¡ Tu docena esta completa !</p>
						</div>
					) : (
						<div className="bg-red-500 w-auto p-2">
							<p className="text-white text-center">Selecciona {quantityDemanded} empanadas para completar la promo</p>
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
											decrementItems({ id, nombre });
											setQuantityDemanded(quantityDemanded + 1);
										}}
									>
										-
									</button>
									<span className="font-normal">{productQuantity(id)}</span>
									<button
										type="button"
										className="text-green-500 up"
										onClick={e => {
											addItems({ id, nombre });
											setQuantityDemanded(quantityDemanded - 1);
										}}
									>
										+
									</button>
								</div>
							</div>
						);
					})}
				</>
			)} */}
		</div>
	);
}
