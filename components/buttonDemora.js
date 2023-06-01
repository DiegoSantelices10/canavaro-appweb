/* eslint-disable react/prop-types */
import React from "react";

export default function Button({ demora, setDemora, time }) {
	return (
		<div>
			<button
				onClick={() => {
					setDemora(time);
				}}
				className={
					demora !== time
						? "p-1 py-3 w-auto bg-white text-sm text-gray-400 font-semibold font-nunito rounded-md shadow "
						: "p-1 py-3 w-auto bg-red-500 text-white text-sm font-semibold font-nunito rounded-md shadow "
				}
			>
				{time}
			</button>
		</div>
	);
}
