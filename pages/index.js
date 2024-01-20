/* eslint-disable react/no-unknown-property */
import React from "react";
import HomeFront from "components/sections/homeFront";



export default function index() {
  return (
    <div className=" flex flex-col min-h-screen overflow-hidden ">
      <main className="w-full mx-auto">
        <HomeFront imagefront={"/images/fondonuevo.webp"} />
      </main>
    </div>
  );
}


