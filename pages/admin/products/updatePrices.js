import Layout from "components/admin/layout";
import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import axios from "axios";

const UpdatePrices = () => {
  const { products } = useSelector(state => state.product);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const priceRef = useRef();
  const priceDocenaRef = useRef();
  // const priceExtraRef = useRef();



  useEffect(() => {
    if (data.length > 0) {
      const combinedArray = products
        .filter(item => item.categoria === "pizzas")
        .map(pizza => {
          const pizzaPrecio = data.find(item => item.nombre === pizza.nombre);

          if (pizzaPrecio) {
            return {
              _id: pizza?._id,
              nombre: pizza?.nombre,
              precioPizza: {
                gigante: pizzaPrecio?.gigante,
                mediana: pizzaPrecio?.mediana,
                chica: pizzaPrecio?.chica,
              },
            };
          }

          return null; // Manejar casos donde no se encuentre el precio correspondiente
        });
      setUpdateData(combinedArray);
    }
  }, [data]);

  const handleFileUpload = e => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = e => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook?.SheetNames[0];
      const sheet = workbook?.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  const handleUpdatePizzas = async () => {
    try {
      const response = await axios.put("/api/products/", updateData);
      response.status === 200 && alert("Productos actualizados!");
    } catch (error) {
      alert("Error al actualizar los datos");
    }
  };

  const handleUpdateEmpanadas = async () => {
    const pricesUpdate = priceRef.current.value;
    try {
      const response = await axios.put("/api/products/", { precio: pricesUpdate });
      response.status === 200 && alert("Precio de empanadas actualizados!");
    } catch (error) {
      alert("Error al actualizar los datos");
    }
  };

  const handleUpdateEmpanadasPorDocena = async () => {
    const pricesUpdate = priceDocenaRef.current.value;
    try {
      const response = await axios.put("/api/promo/", {
        _id: "6571f5f6cf7c5cdd759d12e1",
        categoria: "docena",
        precio: pricesUpdate
      });
      response.status === 200 && alert("Precio por docena actualizado!");
    } catch (error) {
      alert("Error al actualizar los datos");
    }
  };

  // const handleUpdateExtra = async () => {
  //   const pricesUpdate = priceExtraRef.current.value;
  //   try {
  //     const response = await axios.put("/api/products/", { precio: pricesUpdate });
  //     response.status === 200 && alert("Precio extra actualizado!");
  //   } catch (error) {
  //     alert("Error al actualizar los datos");
  //   }
  // };

  return (
    <Layout>
      <div className="lg:flex w-full justify-between items-center h-auto p-2 gap-4">

        <div className="mx-auto p-2 h-auto  w-full  lg:w-1/2">
          <p className="text-center font-poppins font-semibold">Actualizá el precio de las empanadas</p>
          <div className=" md:flex lg:flex  justify-between w-full gap-2 mt-2">
            <div className="w-full flex items-end">
              <div className="w-full">
                <p className="font-poppins text-sm font-normal text-gray-900">Precio x unidad</p>
                <input
                  type="number"
                  ref={priceRef}
                  className="p-2 h-9 w-full text-sm leading-tight text-gray-700  border-gray-200 border
                            rounded-xl focus:border-gray-200"
                />
              </div>
              <button
                onClick={handleUpdateEmpanadas}
                className="bg-red-600 text-sm h-9 ml-2 p-2 whitespace-nowrap text-white font-medium font-poppins px-3 rounded-xl shadow-md hover:bg-red-500"
              >
                Actualizar
              </button>
            </div>
            <div className="w-full flex items-end mt-3">
              <div className="w-full">
                <p className="font-poppins text-sm font-normal text-gray-900 ">Precio x docena</p>
                <input
                  type="number"
                  ref={priceDocenaRef}
                  className="p-2 h-9 w-full  text-sm leading-tight text-gray-700  border-gray-200 border
                            rounded-xl focus:border-gray-200"
                />
              </div>
              <button
                onClick={handleUpdateEmpanadasPorDocena}
                className="bg-red-600 text-sm h-9 ml-2 p-2 whitespace-nowrap text-white font-medium font-poppins px-3 rounded-xl shadow-md hover:bg-red-500"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>

        <div className=" lg:w-1/3 w-full px-2 mt-3 lg:mt-0 flex flex-col items-center  p-2   mx-auto border-none outline-none shadow border border-gray-200 rounded-md">
          <p className="font-poppins font-semibold">Actualizá el precio de las pizzas</p>
          <input
            className=" file:cursor-pointer text-gray-500 text-xs w-5/5 mt-6 file:font-medium font-poppins file:bg-red-600 file:text-white file:border-none file:p-2 file:rounded file:text-xs "
            type="file"
            title="Importar archivo"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
          {updateData.length > 0 && (
            <button
              onClick={handleUpdatePizzas}
              className="bg-sky-800 text-sm mt-2 sm:mt-0 p-2 whitespace-nowrap text-white font-semibold font-poppins px-3 rounded-md shadow-md hover:bg-sky-700"
            >
              Actualizar pizzas
            </button>
          )}
        </div>

      </div>
      <hr />

      <div className="w-full px-2 pb-5 md:w-11/12 lg:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3  lg:grid lg:grid-cols-4 gap-3">
        {updateData.length !== 0 &&
          updateData.map(({ _id, nombre, precioPizza }) => (
            <div
              key={_id}
              className="flex font-poppins p-2 justify-between relative h-24 border border-gray-200 rounded-md "
            >
              <h1 className="font-bold text-sm w-3/5">{nombre}</h1>
              <div className="absolute text-sm font-semibold bottom-2 right-4 justify-between w-auto">
                {precioPizza?.chica && (
                  <h2 className="flex justify-between text-gray-500">
                    Chica: <span className="ml-2 font-medium text-black ">$ {precioPizza?.chica}</span>
                  </h2>
                )}
                {precioPizza?.mediana && (
                  <h2 className="flex justify-between text-gray-500">
                    Mediana: <span className="ml-2 font-medium text-black ">$ {precioPizza?.mediana}</span>
                  </h2>
                )}
                {precioPizza?.gigante && (
                  <h2 className="flex justify-between text-gray-500">
                    Gigante: <span className="ml-2 font-medium text-black ">$ {precioPizza?.gigante}</span>
                  </h2>
                )}
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default UpdatePrices;
