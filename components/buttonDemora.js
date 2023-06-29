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
            ? "px-2 py-3 w-auto bg-white text-sm text-gray-400 font-semibold font-nunito rounded-md shadow "
            : "px-2 py-3 w-auto bg-sky-800 text-white text-sm font-semibold font-nunito rounded-md shadow "
        }
      >
        {data.demora}
      </button>
    </div>
  );
}
