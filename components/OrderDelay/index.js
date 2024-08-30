import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrderDelay = () => {

    const [selectedDomicilio, setSelectedDomicilio] = useState({});
    const [selectedLocal, setSelectedLocal] = useState({});
    const [data, setData] = useState(null);

    useEffect(() => {
        getDelay();
    }, []);

    const getDelay = async () => {
        try {
            const res = await axios.get("/api/delay");
            const local = res.data.find(item => item.tipo === "localActual");
            setSelectedLocal({ ...local, demora: local.demoraActual });
            const domicilio = res.data.find(item => item.tipo === "domicilioActual");
            setSelectedDomicilio({ ...domicilio, demora: domicilio.demoraActual });
            setData(res.data);
        } catch (error) {
            alert("Error al obtener los datos")
        }
    }

    const handlePutTime = async value => {
        if (value.tipoEnvio === "local") {
            const local = data.find(item => item.tipo === "localActual");
            setSelectedLocal(value);
            try {
                await axios.put(`/api/delay/${local._id}`, { demoraActual: value.demora });
            } catch (error) {
                alert("Error al actualizar los datos")
            }
        } else {
            const domicilio = data.find(item => item.tipo === "domicilioActual");
            setSelectedDomicilio(value);
            try {
                await axios.put(`/api/delay/${domicilio._id}`, { demoraActual: value.demora });
            } catch (error) {
                alert("Error al actualizar los datos")
            }
        }
    };

    return (
        <div className="w-full flex-col flex lg:flex-row gap-4 gap-y-4 rounded-md h-auto py-2">
            {data?.length > 0 && (
                <div className="w-full text-left">
                    <h1 className="font-medium font-montserrat pb-1">Demora domicilio</h1>
                    <ul className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1">
                        {data?.filter(item => item.tipoEnvio === "domicilio").map((item) => (
                            <li key={item._id}
                                className='cursor-pointer'
                            >
                                <a
                                    onClick={() => handlePutTime(item)}
                                    className={`flex justify-center py-2 text-sm font-montserrat sm:text-base ${selectedDomicilio.demora === item.demora ? 'bg-white font-medium  rounded-lg shadow-sm text-red-500' : ''
                                        }`}
                                >
                                    {item.demora}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}


            {data?.length > 0 && (
                <div className="w-full text-left">
                    <h1 className="font-medium font-montserrat pb-1">Demora local</h1>
                    <ul className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1">
                        {data?.filter(item => item.tipoEnvio === "local").map((item) => (
                            <li key={item._id}
                                className='cursor-pointer'
                            >
                                <a
                                    onClick={() => handlePutTime(item)}
                                    className={`flex justify-center py-2 text-sm font-montserrat sm:text-base ${selectedLocal.demora === item.demora ? 'bg-white font-medium  rounded-lg shadow-sm text-red-500' : ''
                                        }`}
                                >
                                    {item.demora}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default OrderDelay;
