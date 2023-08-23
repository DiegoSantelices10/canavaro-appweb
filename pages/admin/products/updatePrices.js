import Layout from 'components/admin/layout';
import React, { useEffect, useState } from 'react'
import * as XLSX from "xlsx";
import { useSelector } from 'react-redux';
import axios from 'axios';

const UpdatePrices = () => {
    const { products } = useSelector(state => state.product);
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState([]);


    useEffect(() => {
        if (data.length > 0) {
            const combinedArray = products.filter(item => item.categoria === "pizzas").map(pizza => {
                const pizzaPrecio = data.find(item => item.nombre === pizza.nombre);

                if (pizzaPrecio) {
                    return {
                        _id: pizza?._id,
                        nombre: pizza?.nombre,
                        precioPizza: {
                            gigante: pizzaPrecio?.gigante,
                            mediana: pizzaPrecio?.mediana,
                            chica: pizzaPrecio?.chica
                        }
                    };
                }

                return null; // Manejar casos donde no se encuentre el precio correspondiente
            });
            setUpdateData(combinedArray);
        }

    }, [data])


    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook?.SheetNames[1];
            const sheet = workbook?.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
        };
    }

    const handleUpdate = async () => {
        try {
            const response = await axios.put("/api/products/", updateData);
            console.log("Actualizado con exito", response.data);
        } catch (error) {
            console.log("Error al actualizar los datos")
        }
    }


    return (
        <Layout>
            <div className='w-full px-2 md:w-11/12 lg:w-11/12 mx-auto my-5 border-none outline-none sm:flex block'>
                <input
                    className=" file:cursor-pointer text-gray-500 text-sm w-full file:font-semibold file:bg-sky-800 file:text-white file:border-none file:p-2 file:rounded-md "
                    type="file"
                    title='Importar archivo'
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                />
                {updateData.length > 0 && (
                    <button
                        onClick={handleUpdate}
                        className='bg-sky-800 text-sm mt-2 sm:mt-0 p-2 whitespace-nowrap text-white font-semibold font-nunito px-3 rounded-md shadow-md hover:bg-sky-700'>Actualizar precios</button>
                )}

            </div>
            <div className="w-full px-2 pb-5 md:w-11/12 lg:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3  lg:grid lg:grid-cols-4 gap-3">
                {updateData.length !== 0 && (
                    updateData.map(({ _id, nombre, precioPizza }) => (
                        <div key={_id} className='flex font-nunito p-2 justify-between relative h-24 border border-gray-200 rounded-md '>
                            <h1 className='font-bold text-sm w-3/5'>{nombre}</h1>
                            <div className='absolute text-sm font-semibold bottom-2 right-4 justify-between w-auto'>
                                {precioPizza?.chica && (
                                    <h2 className='flex justify-between text-gray-500'>Chica: <span className='ml-2 font-medium text-black '>$ {precioPizza?.chica}</span></h2>

                                )}
                                {precioPizza?.mediana && (
                                    <h2 className='flex justify-between text-gray-500'>Mediana:  <span className='ml-2 font-medium text-black '>$ {precioPizza?.mediana}</span></h2>

                                )}
                                {precioPizza?.gigante && (
                                    <h2 className='flex justify-between text-gray-500'>Gigante: <span className='ml-2 font-medium text-black '>$ {precioPizza?.gigante}</span></h2>

                                )}
                            </div>


                        </div>
                    ))
                )}

            </div>
        </Layout>
    )
}

export default UpdatePrices;