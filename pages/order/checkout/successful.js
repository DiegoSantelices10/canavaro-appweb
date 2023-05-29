import React from "react";
import { useSelector } from "react-redux";
import CircleAnimation from "framer/circleAnimation";
export default function successful() {
	const { checkout } = useSelector(state => state.order);

	console.log(checkout);
	return (
		<section>
			<div className="fixed inset-x-0 bottom-0 flex justify-center items-center">
				<CircleAnimation />
			</div>
		</section>
	);
}
