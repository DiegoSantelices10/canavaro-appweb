import Layout from "components/Admin/Layout";
import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import axios from "axios";
import HeaderTitle from "components/HeaderTitle";
import Table from "components/Table";
import { createColumnHelper } from "@tanstack/react-table";

const UpdatePrices = () => {
  const { products } = useSelector(state => state.product);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const priceRef = useRef();
  const priceDocenaRef = useRef();
  // const priceExtraRef = useRef();

  const columnHelper = createColumnHelper()

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
          return false;
        });
      const newData = combinedArray.filter(Boolean);

      setUpdateData(newData);
    }
  }, [data]);

  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = e => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook?.SheetNames[0]; // Hoja 1 (índice 0)
      const sheet = workbook?.Sheets[sheetName];

      // Obtener datos sin headers específicos
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Procesar datos manualmente desde la fila 2 (índice 1)
      const parsedData = rawData.slice(1).map(row => ({
        nombre: row[0], // Columna A
        gigante: row[1], // Columna E
        mediana: row[2], // Columna F  
        chica: row[3]    // Columna G
      })).filter(item => item.nombre); // Filtrar filas vacías

      console.log("Datos parseados:", parsedData);
      setData(parsedData);
    };

    reader.onerror = (error) => {
      console.error('Error leyendo archivo:', error);
      alert('Error al leer el archivo');
    };
  };


  const handleUpdatePizzas = async () => {
    try {
      // Enviar los datos en el formato que espera el backend
      const response = await axios.put("/api/products/", {
        orderCurrent: updateData,
        orderSaved: false
      });
      response.status === 200 && alert("Productos actualizados!");
    } catch (error) {
      console.error("Error:", error);
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

  const columns = [
    columnHelper.accessor('nombre', {
      header: () => <h1 className="text-left pl-2">Nombre</h1>,
      cell: info => <h2 className="text-left font-medium text-sm md:text-sm">{info.getValue()}</h2>,
    }),
    columnHelper.accessor('precioPizza', {
      id: "gigante",
      header: () => 'Gigante',
      cell: info => `${info.getValue()?.gigante ? '$' + info.getValue()?.gigante : ''}`,
    }),
    columnHelper.accessor('precioPizza', {
      id: "mediana",
      header: () => 'Mediana',
      cell: info => `${info.getValue()?.mediana ? '$' + info.getValue()?.mediana : ''}`,
    }),
    columnHelper.accessor('precioPizza', {
      id: "chica",
      header: () => 'Chica',
      cell: info => `${info.getValue()?.chica ? '$' + info.getValue()?.chica : ''}`,
    }),
  ]


  return (
    <Layout>
      <HeaderTitle title="Actualizar Precios" isBack />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full pt-8">
        <div className="border p-3 rounded-lg">
          <p className="text-sm font-montserrat text-center font-bold">Precio x docena</p>
          <div className="grid w-full gap-4 mt-6">
            <div className="">
              <label className="text-xs px-1 font-montserrat text-gray-400">Precio x docena</label>
              <input
                className="border border-gray-200 p-2 w-full rounded-lg focus:outline-none focus:ring-0"
                type="number"
                name='unidad'
                ref={priceDocenaRef}
              />
            </div>
            <button
              onClick={handleUpdateEmpanadasPorDocena}
              className="bg-red-600 hover:bg-red-500 text-white font-normal py-2 px-4 rounded-lg font-montserrat"
            >
              Actualizar
            </button>
          </div>
        </div>

        <div className="border p-3 rounded-lg">
          <p className="text-sm font-montserrat text-center font-bold">Precio x unidad</p>
          <div className="grid w-full gap-4 mt-6">
            <div>
              <label className="text-xs px-1 font-montserrat text-gray-400">Precio x unidad</label>
              <input
                className="border border-gray-200 p-2 w-full rounded-lg focus:outline-none focus:ring-0"
                type="number"
                name='docena'
                ref={priceRef}
              />
            </div>
            <button
              onClick={handleUpdateEmpanadas}
              className="bg-red-600 hover:bg-red-500 text-white font-normal py-2 px-4 rounded-lg font-montserrat"
            >
              Actualizar
            </button>
          </div>
        </div>
        <div className="border p-3 rounded-lg h-full flex flex-col justify-between items-center space-y-4 sm:space-y-0">
          <div>
            <p className="text-sm font-montserrat text-center font-bold">Precio pizzas</p>
            <p className="font-montserrat text-gray-500 text-xs text-center">Actualizá el precio de las pizzas</p>
          </div>
          <div>
            <label
              htmlFor="file"
              className="cursor-pointer text-xs w-5/5 mt-6 font-medium font-montserrat bg-red-600 hover:bg-red-500 text-white border-none p-2 rounded"
            >
              <input
                id="file"
                className="hidden"
                type="file"
                title="Importar archivo"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
              Selecciona un archivo
            </label>
          </div>

          <button
            onClick={handleUpdatePizzas}
            className="bg-red-600 cursor-pointer hover:bg-red-500 text-white font-normal py-2 px-4 rounded-lg w-full font-montserrat"
          >
            Actualizar pizzas
          </button>
        </div>

      </div>

      <div className="w-full py-5">

        {updateData.length !== 0 &&
          <Table
            data={updateData}
            columns={columns}

          />
          // updateData.map((producto) => {
          //   if (producto !== false) {
          //     return (
          //       <div
          //         key={producto?._id}
          //         className="flex font-montserrat p-2 justify-between relative h-24 border border-gray-200 rounded-md "
          //       >
          //         <h1 className="font-bold text-sm w-3/5">{producto?.nombre}</h1>
          //         <div className="absolute text-sm font-semibold bottom-2 right-4 justify-between w-auto">
          //           {producto?.precioPizza?.chica && (
          //             <h2 className="flex justify-between text-gray-500">
          //               Chica: <span className="ml-2 font-medium text-black ">$ {producto?.precioPizza?.chica}</span>
          //             </h2>
          //           )}
          //           {producto?.precioPizza?.mediana && (
          //             <h2 className="flex justify-between text-gray-500">
          //               Mediana: <span className="ml-2 font-medium text-black ">$ {producto?.precioPizza?.mediana}</span>
          //             </h2>
          //           )}
          //           {producto?.precioPizza?.gigante && (
          //             <h2 className="flex justify-between text-gray-500">
          //               Gigante: <span className="ml-2 font-medium text-black ">$ {producto?.precioPizza?.gigante}</span>
          //             </h2>
          //           )}
          //         </div>
          //       </div>
          //     )
          //   }
          //   return null

          // })
        }
      </div>
    </Layout>
  );
};

export default UpdatePrices;
