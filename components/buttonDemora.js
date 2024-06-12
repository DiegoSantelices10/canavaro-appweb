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
            ? "p-2 w-auto bg-white text-sm text-gray-400 font-medium font-poppins rounded-lg border border-gray-100"
            : "p-2 w-auto bg-red-500 text-white  text-sm font-medium font-poppins rounded-lg"
        }
      >
        {data.demora}
      </button>
    </div>
  );
}
