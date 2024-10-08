/* eslint-disable react/prop-types */
import React from "react";

export default function ButtonDemora({ handlePutTime, data, selected }) {
  return (
    <div>
      <button
        onClick={() => {
          handlePutTime(data);
        }}
        className={
          selected.demora !== data.demora
            ? "p-2 w-auto bg-white text-sm text-gray-400 font-medium font-montserrat rounded-lg border border-gray-100"
            : "p-2 w-auto bg-red-600 text-white  text-sm font-medium font-montserrat rounded-lg"
        }
      >
        {data.demora}
      </button>
    </div>
  );
}
