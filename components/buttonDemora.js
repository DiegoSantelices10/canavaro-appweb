/* eslint-disable react/prop-types */
import React from "react";

export default function Button({ handlePutTime, data, selected }) {
	return (
		<div>
			<button
				onClick={() => {
					handlePutTime(data);
				}}
				className={
					selected.demora !== data.demora
						? "p-1 py-3 w-auto bg-white text-sm text-gray-400 font-semibold font-nunito rounded-md shadow "
						: "p-1 py-3 w-auto bg-red-500 text-white text-sm font-semibold font-nunito rounded-md shadow "
				}
			>
				{data.demora}
			</button>
		</div>
	);
}
