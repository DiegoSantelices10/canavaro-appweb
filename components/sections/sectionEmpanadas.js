/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";

export default function SectionEmpanadas({ products }) {
  const [docenaPrice, setDocenaPrice] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);


  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/promo");
      setDocenaPrice(res.data[0].precio)
    })();
    const filterCat = products.filter(item => item.categoria === "empanadas")
    const price = filterCat[0].precio
    setUnitPrice(price)
  }, []);


  return (
    <div className=" w-full  bg-zinc-900">
      <div className="relative p-2 h-full  
          rounded-lg w-full lg:w-4/5 mx-auto 
					gap-5 content-center pb-6">
        <h1 className="relative font-montserrat  w-full 
              text-center text-gray-200  text-2xl lg:text-3xl 
              font-semibold ">
          Empanadas & Canastitas
        </h1>
        <hr className="py-2" />
        <div className="h-full w-full mx-auto text-white overflow-y-auto">
          <div className="flex flex-col gap-y-5 mt-4">
            <div className="flex text-center  my-2 mb-4 py-4 justify-around items-center font-montserrat text-white font-semibold">
              <div>
                <p className="font-light font-montserrat text-2xl">${unitPrice}</p>
                <h1 className="text-sm font-normal">Precio x unidad</h1>
              </div>
              <div>
                <p className="font-light font-montserrat text-2xl">${docenaPrice}</p>
                <h1 className="text-sm font-normal">Precio x docena</h1>
              </div>
            </div>
            <hr className="py-2" />

            <div className=" h-full  mx-auto text-white grid grid-cols-2 gap-2 content-center box-content">
              <h1 className="font-semibold font-montserrat col-span-2 text-2xl text-center">Canastitas</h1>
              {products
                ?.filter(item => item.categoria === "empanadas" && item.available === true)
                ?.sort((a, b) => a.nombre.localeCompare(b.nombre))
                .map(producto => {
                  return (
                    producto.formato === "canastita" && (
                      <div key={producto._id}>
                        <p
                          className="text-base font-montserrat text-white text-center font-normal "
                        >
                          {producto.nombre}
                        </p>
                      </div>
                    )
                  );
                })}
              <hr className="py-2 col-span-2 mt-4" />

              <h1 className="col-span-2  font-semibold font-montserrat text-2xl text-center">Empanadas</h1>
              {products
                ?.filter(item => item.categoria === "empanadas")
                .map(producto => {
                  return (
                    producto.formato === "empanada" && (
                      <div key={producto._id}>
                        <p
                          className="text-base font-montserrat text-white text-center w-full "
                        >
                          {producto.nombre}
                        </p>
                      </div>
                    )
                  );
                })}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
