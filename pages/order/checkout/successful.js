import React from "react";
import { useSelector } from "react-redux";

export default function successful() {
	const { checkout } = useSelector(state => state.order);

	checkout.map(item => console.log(item));
	return (
		<section>
			<div className="fixed inset-x-0 bottom-0 flex justify-center items-center">
				<div className="bg-gray-300 p-4 rounded-lg shadow-lg animate-slide-in-left">exito</div>
			</div>
		</section>
	);
}
