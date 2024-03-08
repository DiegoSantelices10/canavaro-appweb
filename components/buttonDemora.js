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
            ? "p-2 w-auto bg-white text-sm text-gray-400 font-medium font-poppins rounded-xl border border-gray-100"
            : "p-2 w-auto bg-red-600 text-white  text-sm font-medium font-poppins rounded-xl"
        }
      >
        {data.demora}
      </button>
    </div>
  );
}
