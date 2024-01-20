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
            ? "p-2 w-auto bg-white text-sm text-gray-400 font-semibold font-poppins rounded-md border border-gray-100"
            : "p-2 w-auto bg-red-600 text-white  text-sm font-semibold font-poppins rounded-md border-2 border-white"
        }
      >
        {data.demora}
      </button>
    </div>
  );
}
