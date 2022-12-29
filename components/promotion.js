/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export default function Promotion({
	products,
	incrementCart,
	decrementCart,
	quantity,
	cantMax,
	name,
}) {
	const [quantityDemanded, setQuantityDemanded] = useState(cantMax);
	return (
		<div>
			{name !== 'Combo 1' && name !== 'Combo 2' && (
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

					{products.empanadas?.map(item => {
						return (
							<div key={item.id} className="flex justify-between py-2  my-2 ">
								<div className="w-1/2 font-medium">
									<h2>{item.nombre}</h2>
								</div>
								<div className="w-auto   px-3 text-end space-x-4 text-base">
									<button
										type="button"
										className="text-red-500"
										onClick={() => {
											decrementCart(item);
											setQuantityDemanded(quantityDemanded + 1);
										}}
									>
										-
									</button>
									<span className="font-normal">{quantity(item.id)}</span>
									<button
										type="button"
										className="text-green-500"
										onClick={() => {
											incrementCart(item);
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
			)}
		</div>
	);
}
