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
            ? "p-1 px-2 sm:p-2 md:p-2 lg:p-2   w-auto bg-white text-sm text-gray-400 font-semibold font-nunito rounded-md shadow "
            : "p-1 px-2 sm:p-2 md:p-2 lg:p-2   w-auto bg-sky-700 text-white text-sm font-semibold font-nunito rounded-md shadow "
        }
      >
        {data.demora}
      </button>
    </div>
  );
}
