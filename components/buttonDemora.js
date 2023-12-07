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
            ? "p-2 w-auto bg-white text-sm text-gray-400 font-semibold font-nunito rounded-lg border-2 border-white"
            : "p-2 w-auto bg-sky-800 text-white  text-sm font-semibold font-nunito rounded-lg border-2 border-white"
        }
      >
        {data.demora}
      </button>
    </div>
  );
}
