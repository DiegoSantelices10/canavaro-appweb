import Layout from "components/Admin/Layout";
import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { useSelector } from "react-redux";
import axios from "axios";
import HeaderTitle from "components/HeaderTitle";
import Table from "components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { FiUpload, FiCheck, FiInfo } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const UpdatePrices = () => {
  const { products } = useSelector(state => state.product);
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const priceRef = useRef();
  const priceDocenaRef = useRef();

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
  }, [data, products]);

  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = e => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook?.SheetNames[0];
      const sheet = workbook?.Sheets[sheetName];
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const parsedData = rawData.slice(1).map(row => ({
        nombre: row[0],
        gigante: row[1],
        mediana: row[2],
        chica: row[3]
      })).filter(item => item.nombre);

      setData(parsedData);
    };

    reader.onerror = (error) => {
      console.error('Error leyendo archivo:', error);
      alert('Error al leer el archivo');
    };
  };

  const handleUpdatePizzas = async () => {
    try {
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
      header: () => <div className="text-left pl-2">Nombre</div>,
      cell: info => <h2 className="text-left font-semibold text-slate-800 text-sm">{info.getValue()}</h2>,
    }),
    columnHelper.accessor('precioPizza', {
      id: "gigante",
      header: () => <div className="text-center">Gigante</div>,
      cell: info => (
        <div className="text-center">
          {info.getValue()?.gigante ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
              ${info.getValue()?.gigante}
            </span>
          ) : '-'}
        </div>
      ),
    }),
    columnHelper.accessor('precioPizza', {
      id: "mediana",
      header: () => <div className="text-center">Mediana</div>,
      cell: info => (
        <div className="text-center">
          {info.getValue()?.mediana ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
              ${info.getValue()?.mediana}
            </span>
          ) : '-'}
        </div>
      ),
    }),
    columnHelper.accessor('precioPizza', {
      id: "chica",
      header: () => <div className="text-center">Chica</div>,
      cell: info => (
        <div className="text-center">
          {info.getValue()?.chica ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100">
              ${info.getValue()?.chica}
            </span>
          ) : '-'}
        </div>
      ),
    }),
  ]

  return (
    <Layout>
      <div className="mb-10 lg:mb-14">
        <HeaderTitle title="Actualización de Precios" isBack />
        <p className="text-slate-500">Gestiona el valor de tus productos de forma masiva o individual.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {/* Precio Docena */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110 duration-500 pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
              <RiMoneyDollarCircleLine size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global</p>
              <h3 className="text-sm font-black text-slate-800">Precio x Docena</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:border-red-500/10 focus:ring-4 focus:ring-red-500/5 transition-all outline-none"
                type="number"
                placeholder="0.00"
                ref={priceDocenaRef}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            </div>
            <button
              onClick={handleUpdateEmpanadasPorDocena}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-[11px] font-black py-4 px-6 rounded-2xl hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
            >
              <FiCheck />
              ACTUALIZAR DOCENA
            </button>
          </div>
        </div>

        {/* Precio Unidad */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110 duration-500 pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
              <RiMoneyDollarCircleLine size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global</p>
              <h3 className="text-sm font-black text-slate-800">Precio x Unidad</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:border-red-500/10 focus:ring-4 focus:ring-red-500/5 transition-all outline-none"
                type="number"
                placeholder="0.00"
                ref={priceRef}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            </div>
            <button
              onClick={handleUpdateEmpanadas}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white text-[11px] font-black py-4 px-6 rounded-2xl hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
            >
              <FiCheck />
              ACTUALIZAR UNIDAD
            </button>
          </div>
        </div>

        {/* Importar Pizzas */}
        <div className="bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-white/10 text-white rounded-2xl">
              <FiUpload size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Excel Sync</p>
              <h3 className="text-sm font-black text-white">Importar Pizzas</h3>
            </div>
          </div>

          <div className="space-y-4">
            <label
              htmlFor="file"
              className="flex items-center justify-center gap-3 w-full bg-white/10 border-2 border-dashed border-white/20 p-6 rounded-[1.5rem] cursor-pointer hover:bg-white/15 hover:border-white/30 transition-all group"
            >
              <input
                id="file"
                className="hidden"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
              />
              <div className="text-center">
                <p className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Subir Hoja</p>
                <p className="text-[10px] text-white/50">Formato Excel (.xlsx)</p>
              </div>
            </label>

            <button
              disabled={updateData.length === 0}
              onClick={handleUpdatePizzas}
              className={`w-full flex items-center justify-center gap-2 text-[11px] font-black py-4 px-6 rounded-2xl transition-all active:scale-95
                ${updateData.length === 0
                  ? "bg-white/5 text-white/20 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-500 shadow-xl shadow-red-600/20"}
              `}
            >
              <FiCheck />
              SINCRONIZAR PRECIOS
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 lg:mt-16">
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2">
            <FiInfo className="text-slate-400" />
            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Vista previa de cambios</h4>
          </div>
          {updateData.length !== 0 && (
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest">
              {updateData.length} productos detectados
            </span>
          )}
        </div>

        <div className="w-full py-5">
          {updateData.length !== 0 && (
            <Table
              data={updateData}
              columns={columns}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePrices;
